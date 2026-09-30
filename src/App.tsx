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
  Sparkles
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
import { Palette } from 'lucide-react';

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
        <LoginPage 
          onLoginSuccess={handleLoginSuccess}
          onBackToLanding={() => setShowLogin(false)}
        />
      );
    }
    return <LandingPage onEnterBrandManager={handleEnterManager} />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="ea-mesh-bg" />
      <div className="ea-aguayo-bar" />

      {/* Top Header App */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 36px',
        borderBottom: '1px solid var(--ea-border)',
        background: 'rgba(9, 3, 20, 0.9)',
        backdropFilter: 'blur(20px)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <BrandLogo size={36} subbrand="Brand Manager" />
          <span className="ea-badge ea-badge-purple" style={{ fontSize: '0.7rem' }}>
            {currentUser.secretaria}
          </span>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {[
            { id: 'DASHBOARD', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'LINEA_GRAFICA', label: 'Línea Gráfica & Materiales', icon: Palette, badge: 'Postgres' },
            { id: 'BRAND_BOOK', label: 'Digital Brand Book', icon: BookOpen },
            { id: 'ARCHITECTURE', label: 'Brand Architecture', icon: Layers },
            { id: 'GENERATOR', label: 'Generador Gráfico', icon: Sliders },
            { id: 'VALIDATOR', label: 'Brand Validator', icon: Scan },
            { id: 'BAM', label: 'Biblioteca BAM', icon: Folder },
            { id: 'ALTO_IA', label: 'Alto IA Assistant', icon: Bot },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id as TabType)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: '8px',
                border: currentTab === tab.id ? '1px solid var(--ea-secondary)' : '1px solid transparent',
                background: currentTab === tab.id ? 'rgba(245, 0, 123, 0.2)' : 'transparent',
                color: currentTab === tab.id ? '#FFFFFF' : 'var(--ea-text-muted)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
              {(tab as any).badge && (
                <span style={{
                  fontSize: '0.6rem',
                  padding: '1px 5px',
                  borderRadius: '4px',
                  background: 'var(--ea-teal)',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  marginLeft: '2px'
                }}>
                  {(tab as any).badge}
                </span>
              )}
            </button>
          ))}
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
        {currentTab === 'DASHBOARD' && <Dashboard user={currentUser} />}
        {currentTab === 'LINEA_GRAFICA' && <LineaGraficaManager userRole={currentUser.role} />}
        {currentTab === 'BRAND_BOOK' && <DigitalBrandBook />}
        {currentTab === 'ARCHITECTURE' && <BrandArchitecture />}
        {currentTab === 'GENERATOR' && <GraphicGenerator />}
        {currentTab === 'VALIDATOR' && <BrandValidator />}
        {currentTab === 'BAM' && <BrandAssetManager />}
        {currentTab === 'ALTO_IA' && <AltoIAAssistant />}
      </main>
    </div>
  );
};
