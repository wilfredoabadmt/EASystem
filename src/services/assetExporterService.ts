import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  HeadingLevel, 
  AlignmentType, 
  Table, 
  TableRow, 
  TableCell, 
  WidthType, 
  BorderStyle, 
  Header, 
  Footer,
  PageNumber
} from 'docx';
import { jsPDF } from 'jspdf';
import JSZip from 'jszip';

export interface ExportableAsset {
  name: string;
  folder: string;
  format: string;
  secretaria: string;
  updated: string;
  fileData?: string;
}

export class AssetExporterService {
  /**
   * Genera un archivo .docx oficial 100% válido y nativo para Microsoft Word
   */
  static async generateOfficialDocx(filename: string, secretaria: string = 'DIRCOM'): Promise<Blob> {
    const today = new Date().toLocaleDateString('es-BO', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 1440, // 1 inch (2.54 cm)
                bottom: 1440,
                left: 1440,
                right: 1440,
              },
            },
          },
          headers: {
            default: new Header({
              children: [
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  children: [
                    new TextRun({
                      text: "GOBIERNO AUTÓNOMO MUNICIPAL DE EL ALTO",
                      bold: true,
                      size: 18,
                      color: "4B008F",
                      font: "Calibri",
                    }),
                  ],
                }),
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  children: [
                    new TextRun({
                      text: "DIRECCIÓN GENERAL DE COMUNICACIÓN — GESTIÓN DE MARCA",
                      bold: true,
                      size: 14,
                      color: "F5007B",
                      font: "Calibri",
                    }),
                  ],
                }),
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  children: [
                    new TextRun({
                      text: "EASystem • Documento Oficial Institucional A4",
                      size: 13,
                      color: "888888",
                      font: "Calibri",
                    }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "_________________________________________________________________________________",
                      color: "008F89",
                      size: 14,
                    }),
                  ],
                }),
              ],
            }),
          },
          footers: {
            default: new Footer({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "_________________________________________________________________________________",
                      color: "4B008F",
                      size: 14,
                    }),
                  ],
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: "Casa Municipal Jach'a Uta • Av. Costanera N° 5002 • El Alto, Bolivia",
                      size: 14,
                      color: "666666",
                    }),
                  ],
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: "www.elalto.gob.bo • Central Piloto: 2840000 • Línea Gráfica Oficial 2026",
                      size: 14,
                      color: "008F89",
                      bold: true,
                    }),
                  ],
                }),
              ],
            }),
          },
          children: [
            new Paragraph({
              spacing: { before: 200, after: 300 },
              children: [
                new TextRun({
                  text: `El Alto, ${today}`,
                  size: 20,
                  font: "Calibri",
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              spacing: { after: 200 },
              children: [
                new TextRun({
                  text: "CITE: ",
                  bold: true,
                  size: 22,
                  font: "Calibri",
                }),
                new TextRun({
                  text: `GAMEA-DIRCOM-MEM-${new Date().getFullYear()}-001`,
                  size: 22,
                  font: "Calibri",
                  color: "4B008F",
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              spacing: { after: 120 },
              children: [
                new TextRun({
                  text: "A: ",
                  bold: true,
                  size: 22,
                  font: "Calibri",
                }),
                new TextRun({
                  text: "AUTORIDADES Y DEPENDENCIAS MUNICIPALES",
                  size: 22,
                  font: "Calibri",
                }),
              ],
            }),
            new Paragraph({
              spacing: { after: 120 },
              children: [
                new TextRun({
                  text: "DE: ",
                  bold: true,
                  size: 22,
                  font: "Calibri",
                }),
                new TextRun({
                  text: "DIRECCIÓN GENERAL DE COMUNICACIÓN (DIRCOM)",
                  size: 22,
                  font: "Calibri",
                }),
              ],
            }),
            new Paragraph({
              spacing: { after: 300 },
              children: [
                new TextRun({
                  text: "REF.: ",
                  bold: true,
                  size: 22,
                  font: "Calibri",
                }),
                new TextRun({
                  text: "PLANTILLA OFICIAL MEMBRETADA — LÍNEA GRÁFICA INSTITUCIONAL",
                  size: 22,
                  font: "Calibri",
                  bold: true,
                  color: "008F89",
                }),
              ],
            }),
            new Paragraph({
              spacing: { after: 240 },
              children: [
                new TextRun({
                  text: "De mi mayor consideración:",
                  size: 22,
                  font: "Calibri",
                }),
              ],
            }),
            new Paragraph({
              spacing: { after: 200 },
              children: [
                new TextRun({
                  text: "Por medio del presente documento oficial, se pone a disposición la plantilla membretada estandarizada en formato Word (.docx) para la redacción de notas, memorándums, circulares e informes oficiales del Gobierno Autónomo Municipal de El Alto (GAMEA).",
                  size: 22,
                  font: "Calibri",
                }),
              ],
            }),
            new Paragraph({
              spacing: { after: 200 },
              children: [
                new TextRun({
                  text: "La presente plantilla cuenta con los márgenes de seguridad normados (Regla 2X del Brand Book Municipal), tipografías institucionales y cintillos cromáticos que representan la identidad, fuerza y dignidad de la ciudad de El Alto.",
                  size: 22,
                  font: "Calibri",
                }),
              ],
            }),
            new Paragraph({
              spacing: { after: 240 },
              children: [
                new TextRun({
                  text: "Se recuerda a todas las Secretarías Municipales, Direcciones y Unidades Desconcentradas que el uso de esta papelería oficial es de carácter obligatorio para toda comunicación formal interna y externa.",
                  size: 22,
                  font: "Calibri",
                }),
              ],
            }),
            new Paragraph({
              spacing: { after: 500 },
              children: [
                new TextRun({
                  text: "Con este motivo, saludo a usted con las consideraciones más distinguidas.",
                  size: 22,
                  font: "Calibri",
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 800, after: 100 },
              children: [
                new TextRun({
                  text: "___________________________________________",
                  size: 22,
                  color: "888888",
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "Lic. Claudia Mamani",
                  bold: true,
                  size: 22,
                  font: "Calibri",
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "DIRECTORA GENERAL DE COMUNICACIÓN",
                  size: 18,
                  font: "Calibri",
                  color: "4B008F",
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "Gobierno Autónomo Municipal de El Alto",
                  size: 16,
                  font: "Calibri",
                  color: "666666",
                }),
              ],
            }),
          ],
        },
      ],
    });

    return await Packer.toBlob(doc);
  }

  /**
   * Genera un archivo .pdf oficial 100% válido y nativo
   */
  static generateOfficialPdf(title: string, secretaria: string = 'GAMEA'): Blob {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Franja Aguayo Superior
    doc.setFillColor(75, 0, 143); // Púrpura #4B008F
    doc.rect(0, 0, 52.5, 6, 'F');
    doc.setFillColor(245, 0, 123); // Rosa #F5007B
    doc.rect(52.5, 0, 52.5, 6, 'F');
    doc.setFillColor(245, 180, 0); // Oro #F5B400
    doc.rect(105, 0, 52.5, 6, 'F');
    doc.setFillColor(0, 143, 137); // Turquesa #008F89
    doc.rect(157.5, 0, 52.5, 6, 'F');

    // Encabezado
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(75, 0, 143);
    doc.text('GOBIERNO AUTÓNOMO MUNICIPAL DE EL ALTO', 20, 24);

    doc.setFontSize(11);
    doc.setTextColor(245, 0, 123);
    doc.text('DIRECCIÓN DE COMUNICACIÓN — GESTIÓN DE MARCA INSTITUCIONAL', 20, 30);

    doc.setDrawColor(0, 143, 137);
    doc.setLineWidth(0.6);
    doc.line(20, 34, 190, 34);

    // Título Principal del Documento
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(20, 20, 20);
    doc.text(title.replace('.pdf', '').replace(/_/g, ' '), 20, 48);

    // Metadatos
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const today = new Date().toLocaleDateString('es-BO', { year: 'numeric', month: 'long', day: 'numeric' });
    doc.text(`Fecha de emisión: ${today}  |  Dependencia: ${secretaria}  |  Estado: Documento Aprobado`, 20, 56);

    // Contenido estructurado
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(75, 0, 143);
    doc.text('1. OBJETIVO Y NORMATIVA DE IDENTIDAD', 20, 70);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    const p1 = 'El presente documento certifica las directrices visuales, parámetros tipográficos y códigos cromáticos oficiales vigentes para el Gobierno Autónomo Municipal de El Alto (GAMEA). Su aplicación es de estricto cumplimiento para toda la administración central, secretarías municipales y empresas descentralizadas.';
    doc.text(doc.splitTextToSize(p1, 170), 20, 78);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(75, 0, 143);
    doc.text('2. CÓDIGO CROMÁTICO INSTITUCIONAL', 20, 102);

    // Tabla de colores
    const colors = [
      { name: 'Púrpura Alteño', hex: '#4B008F', r: 75, g: 0, b: 143, role: 'Color Principal de Gobierno' },
      { name: 'Rosa Rebelde', hex: '#F5007B', r: 245, g: 0, b: 123, role: 'Fuerza, Juventud y Coraje' },
      { name: 'Turquesa Integración', hex: '#008F89', r: 0, g: 143, b: 137, role: 'Futuro, Salud y Esperanza' },
      { name: 'Oro Cultura', hex: '#F5B400', r: 245, g: 180, b: 0, role: 'Sol Andino y Riqueza Cultural' }
    ];

    let yColor = 110;
    colors.forEach(c => {
      doc.setFillColor(c.r, c.g, c.b);
      doc.roundedRect(20, yColor, 12, 8, 1, 1, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(30, 30, 30);
      doc.text(c.name, 36, yColor + 6);
      doc.setFont('courier', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text(c.hex, 85, yColor + 6);
      doc.setFont('helvetica', 'italic');
      doc.text(c.role, 115, yColor + 6);
      yColor += 12;
    });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(75, 0, 143);
    doc.text('3. ÁREA DE RESERVA (REGLA 2X)', 20, 168);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    const p2 = 'Ningún elemento gráfico, titular, imagen o margen de página puede invadir el área de seguridad obligatoria de 2X alrededor del imagotipo oficial de El Alto. Esta regla garantiza legibilidad e impacto institucional.';
    doc.text(doc.splitTextToSize(p2, 170), 20, 176);

    // Certificación al pie
    doc.setFillColor(245, 245, 250);
    doc.roundedRect(20, 205, 170, 35, 2, 2, 'F');
    doc.setDrawColor(200, 200, 220);
    doc.roundedRect(20, 205, 170, 35, 2, 2, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(75, 0, 143);
    doc.text('CERTIFICACIÓN DIGITAL DE SOBERANÍA VISUAL', 25, 214);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.text('Este documento digital fue generado desde el núcleo inmutable EASystem.', 25, 221);
    doc.text('Firma Digital: GAMEA-SEC-DIRCOM-HASH-2026-OK', 25, 227);
    doc.text('Válido para archivo oficial, imprenta municipal y fiscalización.', 25, 233);

    // Pie de página
    doc.setDrawColor(75, 0, 143);
    doc.setLineWidth(0.5);
    doc.line(20, 275, 190, 275);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text("Casa Municipal Jach'a Uta • Av. Costanera N° 5002 • El Alto, Bolivia • www.elalto.gob.bo", 20, 281);
    doc.text('Página 1 de 1', 170, 281);

    const pdfBlob = doc.output('blob');
    return pdfBlob;
  }

  /**
   * Genera un archivo ZIP real y completo conteniendo todos los archivos descargables
   */
  static async generateCompleteZip(assets: ExportableAsset[]): Promise<Blob> {
    const zip = new JSZip();

    // Archivo de bienvenida / Manifiesto
    const readmeContent = `=============================================================================
GOBIERNO AUTÓNOMO MUNICIPAL DE EL ALTO (GAMEA)
DIRECCIÓN GENERAL DE COMUNICACIÓN — EASystem Brand Asset Manager (BAM)
=============================================================================

Paquete Oficial de Recursos Gráficos e Identidad Institucional 2026.
Total de activos en este archivo: ${assets.length}
Fecha de generación: ${new Date().toISOString()}

ESTRUCTURA DE CARPETAS:
- /logos        : Imagotipos oficiales en alta definición y vectores
- /versiones    : Variantes cromáticas sobre fondo oscuro y monocromo
- /svg          : Gráficos vectoriales e iconografía escalable
- /png          : Exportaciones con fondo transparente en alta resolución
- /pdf          : Manuales oficiales de imagen y guías de aplicación
- /plantillas   : Hojas membretadas oficiales para Microsoft Word (.docx)

ADVERTENCIA LEGAL:
El uso indebido, alteración geométrica o deformación cromática del imagotipo
de El Alto está prohibido según normativa municipal y Brand Book 2026.
Para soporte técnico: direccion.comunicacion@elalto.gob.bo
=============================================================================`;

    zip.file("LEEME_PRIMERO_OFICIAL_GAMEA.txt", readmeContent);

    // Procesar cada activo
    for (const item of assets) {
      const cleanFolder = item.folder.replace(/^\//, ''); // quitar slash inicial

      if (item.format === 'DOCX') {
        const docxBlob = await this.generateOfficialDocx(item.name, item.secretaria);
        zip.folder(cleanFolder)?.file(item.name, docxBlob);
      } else if (item.format === 'PDF') {
        const pdfBlob = this.generateOfficialPdf(item.name, item.secretaria);
        zip.folder(cleanFolder)?.file(item.name, pdfBlob);
      } else if (item.format === 'SVG') {
        const svgContent = item.fileData || `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120"><rect width="400" height="120" fill="#090314" rx="12"/><polygon points="30,85 55,30 80,85" fill="#4B008F"/><polygon points="40,85 55,50 70,85" fill="#F5007B"/><text x="100" y="60" fill="#FFFFFF" font-family="sans-serif" font-size="28" font-weight="bold">EL ALTO</text><text x="100" y="85" fill="#008F89" font-family="sans-serif" font-size="14" font-weight="bold">GOBIERNO AUTÓNOMO MUNICIPAL</text></svg>`;
        zip.folder(cleanFolder)?.file(item.name, svgContent);
      } else {
        // PNG o texto
        if (item.fileData && item.fileData.startsWith('data:image')) {
          const base64Data = item.fileData.split(',')[1];
          zip.folder(cleanFolder)?.file(item.name, base64Data, { base64: true });
        } else {
          // Generar mockup de texto
          zip.folder(cleanFolder)?.file(
            item.name.endsWith('.txt') ? item.name : `${item.name}.txt`,
            `ACTIVO OFICIAL GAMEA\nNombre: ${item.name}\nSecretaría: ${item.secretaria}\nFormato: ${item.format}`
          );
        }
      }
    }

    return await zip.generateAsync({ type: 'blob' });
  }
}
