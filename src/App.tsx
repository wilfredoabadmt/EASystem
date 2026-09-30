import React, { useState } from 'react';
import { 
  Layers, 
  BookOpen, 
  Sliders, 
  Scan, 
  Folder, 
  Bot, 
  LogOut, 
  LayoutDashboard, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles,
  Palette,
  Boxes,
  Newspaper,
  FolderOpen
} from 'lucide-react';
import { BrandLogo } from './components/BrandLogo';
import { LandingPage } from './components/LandingPage';
import { LoginPage, UserProfile, PRESET_USERS } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { DigitalBrandBook } from './components/DigitalBrandBook';
import { BrandArchitecture } from './components/BrandArchitecture';
import { GraphicGenerator } from './components/GraphicGenerator';
import { BrandValidator } from './components/BrandValidator';
import { BrandAssetManager } from './components/BrandAssetManager';
import { AltoIAAssistant } from './components/AltoIAAssistant';
import { LineaGraficaManager } from './components/LineaGraficaManager';
import { OfficialGovBanner } from './components/OfficialGovBanner';

type TabType = 'DASHBOARD' | 'LINEA_GRAFICA' | 'BRAND_BOOK' | 'ARCHITECTURE' | 'GENERATOR' | 'VALIDATOR' | 'BAM' | 'ALTO_IA';

export const App: React.FC = () => {
  const [inApp, setInApp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile>(PRESET_USERS.DIRECTOR_COMUNICACION);
  const [currentTab, setCurrentTab] = useState<TabType>('DASHBOARD');

  const handleEnterManager = () => {
    setShowLogin(true);
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setShowLogin(false);
    setInApp(true);
  };

  const handleLogout = () => {
    setInApp(false);
  };

  if (!inApp) {
    if (showLogin) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <OfficialGovBanner />
          <LoginPage 
            onLoginSuccess={handleLoginSuccess}
            onBackToLanding={() => setShowLogin(false)}
          />
        </div>
      );
    }
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <OfficialGovBanner />
        <LandingPage onEnterBrandManager={handleEnterManager} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <OfficialGovBanner />
      <div className="ea-mesh-bg" />
      <div className="ea-aguayo-bar" />

      {/* Top Header App */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        borderBottom: '1px solid var(--ea-border)',
        background: 'rgba(9, 3, 20, 0.9)',
        backdropFilter: 'blur(20px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
          <BrandLogo size={36} subbrand="Gestión de Marca" allowUpload={true} />
          <span className="ea-badge ea-badge-purple" style={{ fontSize: '0.7rem' }}>
            {currentUser.secretaria}
          </span>
        </div>

        {/* Navigation Tabs - Alineación en una Sola Fila */}
        <div style={{ 
          display: 'flex', 
          gap: '6px', 
          flexWrap: 'nowrap', 
          alignItems: 'center',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          {[
            { id: 'DASHBOARD', label: 'Inicio', title: 'Panel Principal de Control', icon: LayoutDashboard, color: '#A78BFA' },
            { id: 'LINEA_GRAFICA', label: 'Línea Gráfica', title: 'Línea Gráfica & Materiales Oficiales', icon: Palette, badge: 'Oficial', color: '#F43F5E' },
            { id: 'BRAND_BOOK', label: 'Brand Book', title: 'Manual de Marca Digital', icon: BookOpen, color: '#38BDF8' },
            { id: 'ARCHITECTURE', label: 'Jerarquía', title: 'Jerarquía y Estructura Organizacional', icon: Boxes, color: '#C084FC' },
            { id: 'GENERATOR', label: 'Generador', title: 'Generador de Comunicados y Prensa', icon: Newspaper, color: '#34D399' },
            { id: 'VALIDATOR', label: 'Validador', title: 'Validador de Diseños Oficiales', icon: ShieldCheck, color: '#FBBF24' },
            { id: 'BAM', label: 'Biblioteca', title: 'Biblioteca de Archivos y Recursos', icon: FolderOpen, color: '#FB923C' },
            { id: 'ALTO_IA', label: 'Alto IA', title: 'Asistente Inteligente Alto IA', icon: Sparkles, color: '#EC4899' },
          ].map(tab => {
            const isActive = currentTab === tab.id;
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                title={tab.title}
                onClick={() => setCurrentTab(tab.id as TabType)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 10px',
                  borderRadius: '9px',
                  border: isActive ? `1.5px solid ${tab.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                  background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  flexShrink: 0,
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                }}
              >
                {/* Contenedor de Ícono */}
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '7px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isActive ? tab.color : 'rgba(255, 255, 255, 0.08)',
                  color: isActive ? '#FFFFFF' : tab.color,
                  boxShadow: isActive ? `0 0 12px ${tab.color}99` : 'none',
                  transition: 'all 0.15s ease',
                  flexShrink: 0
                }}>
                  <TabIcon size={18} strokeWidth={2.3} />
                </div>

                {/* Texto del Tab */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{
                    color: isActive ? '#FFFFFF' : '#E5E7EB',
                    fontWeight: isActive ? 800 : 600,
                    fontSize: '0.8rem',
                    letterSpacing: '-0.01em'
                  }}>
                    {tab.label}
                  </span>
                  {(tab as any).badge && (
                    <span style={{
                      fontSize: '0.58rem',
                      padding: '1px 5px',
                      borderRadius: '4px',
                      background: 'var(--ea-teal)',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      boxShadow: '0 0 6px rgba(0, 143, 137, 0.6)'
                    }}>
                      {(tab as any).badge}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* User Profile & Exit */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{currentUser.name}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--ea-secondary)' }}>{currentUser.role}</div>
          </div>

          <button 
            onClick={handleLogout}
            title="Cerrar sesión"
            className="ea-btn ea-btn-secondary"
            style={{ padding: '8px 12px' }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main style={{ flex: 1, padding: '36px', maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
        {currentTab === 'DASHBOARD' && <Dashboard user={currentUser} onNavigate={setCurrentTab} />}
        {currentTab === 'LINEA_GRAFICA' && <LineaGraficaManager userRole={currentUser.role} />}
        {currentTab === 'BRAND_BOOK' && <DigitalBrandBook onNavigateTab={(t) => setCurrentTab(t as any)} />}
        {currentTab === 'ARCHITECTURE' && <DigitalBrandBook onNavigateTab={(t) => setCurrentTab(t as any)} initialModuleId={13} />}
        {currentTab === 'GENERATOR' && <GraphicGenerator />}
        {currentTab === 'VALIDATOR' && <BrandValidator />}
        {currentTab === 'BAM' && <BrandAssetManager />}
        {currentTab === 'ALTO_IA' && <AltoIAAssistant />}
      </main>
    </div>
  );
};
