# DOCUMENTO 10: RUNBOOK DE DESPLIEGUE SOBERANO, DEVOPS Y CONTINGENCIA
## EL ALTO DIGITAL EASYSTEM (EASystem)
**Gobierno Autónomo Municipal de El Alto — Dirección de Comunicación**

---

### METADATOS DEL DOCUMENTO
- **Código**: `DOC-SDD-010`
- **Versión**: `1.0.0`
- **Fecha**: `2026-09-29`
- **Estado**: `Aprobado por el Equipo Multidisciplinario`
- **Autores**: Ingeniero DevOps & Arquitecto de Software Senior

---

## 1. REQUERIMIENTOS DE INFRAESTRUCTURA MUNICIPAL

### 1.1. Servidor Dedicado On-Premise / Servidor Soberano
- **Sistema Operativo**: Ubuntu Server 22.04 LTS o 24.04 LTS (x86_64) con kernel endurecido (Hardened Linux).
- **Procesador (CPU)**: 8 núcleos dedicados (mínimo) / 16 núcleos (recomendado para renderizado concurrente Sharp/PDF).
- **Memoria RAM**: 16 GB (mínimo) / 32 GB (recomendado con asignación para buffers de base de datos y colas Redis).
- **Almacenamiento**: 500 GB SSD NVMe en arreglo RAID-1 para base de datos y logs; 2 TB HDD/SSD para almacenamiento MinIO de piezas gráficas y assets.
- **Conectividad de Red**: IP Pública estática con enlace simétrico municipal (Fibra óptica redundante).

---

## 2. CONFIGURACIÓN DOCKER COMPOSE DE PRODUCCIÓN (`docker-compose.prod.yml`)

```yaml
version: '3.8'

services:
  easystem-gateway:
    image: nginx:alpine-slim
    container_name: easystem-gateway
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./infra/nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./infra/certs:/etc/ssl/certs:ro
    depends_on:
      - easystem-web
      - easystem-api

  easystem-web:
    build:
      context: .
      dockerfile: apps/web/Dockerfile
    container_name: easystem-web
    restart: always
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=https://easystem.elalto.gob.bo/api/v1
    depends_on:
      - easystem-api

  easystem-api:
    build:
      context: .
      dockerfile: apps/api/Dockerfile
    container_name: easystem-api
    restart: always
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://easystem_admin:${DB_PASSWORD}@easystem-db:5432/easystem_prod
      - REDIS_URL=redis://:${REDIS_PASSWORD}@easystem-redis:6379
      - S3_ENDPOINT=easystem-minio
      - S3_PORT=9000
      - S3_ACCESS_KEY=${MINIO_ROOT_USER}
      - S3_SECRET_KEY=${MINIO_ROOT_PASSWORD}
    depends_on:
      - easystem-db
      - easystem-redis
      - easystem-minio

  easystem-db:
    image: postgres:16-alpine
    container_name: easystem-db
    restart: always
    environment:
      POSTGRES_DB: easystem_prod
      POSTGRES_USER: easystem_admin
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - pgdata_prod:/var/lib/postgresql/data
      - ./infra/postgres/init-extensions.sql:/docker-entrypoint-initdb.d/init.sql

  easystem-redis:
    image: redis:7-alpine
    container_name: easystem-redis
    restart: always
    command: redis-server --requirepass ${REDIS_PASSWORD}
    volumes:
      - redisdata_prod:/data

  easystem-minio:
    image: minio/minio:latest
    container_name: easystem-minio
    restart: always
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: ${MINIO_ROOT_USER}
      MINIO_ROOT_PASSWORD: ${MINIO_ROOT_PASSWORD}
    volumes:
      - miniodata_prod:/data

volumes:
  pgdata_prod:
  redisdata_prod:
  miniodata_prod:
```

---

## 3. PROCEDIMIENTO DE DESPLIEGUE PASO A PASO (RUNBOOK)

1. **Clonación Segura del Repositorio**:
   ```bash
   git clone https://github.com/GAMEA-ElAlto/EASystem.git /opt/easystem
   cd /opt/easystem
   ```
2. **Configuración de Secretos en `.env`**:
   Copiar `.env.example` a `.env` y configurar contraseñas criptográficas seguras (sin exponerlas en el control de versiones).
3. **Ejecución de Pre-Deployment (Migraciones)**:
   ```bash
   docker compose run --rm easystem-api npm run db:migrate
   ```
4. **Levantamiento de Servicios**:
   ```bash
   docker compose -f docker-compose.prod.yml up -d
   ```
5. **Verificación de Salud (Healthcheck)**:
   ```bash
   curl -f https://easystem.elalto.gob.bo/api/v1/health || echo "ERROR EN SALUD DEL SISTEMA"
   ```

---

## 4. PLAN DE RESPALDO Y RECUPERACIÓN ANTE DESASTRES (DRP)
- **Backup Diario de Base de Datos**: Tarea cron a las 02:00 AM ejecutando `pg_dump` con compresión gzip y cifrado GPG hacia un volumen de almacenamiento secundario fuera del servidor principal.
- **RPO (Punto Objetivo de Recuperación)**: Máximo 24 horas para historial de renders; 0 horas (replicación de WALs) para la tabla de auditoría inmutable.
- **RTO (Tiempo Objetivo de Recuperación)**: Restauración completa de servicios en menos de 20 minutos mediante imágenes Docker pre-construidas.
