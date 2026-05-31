import React, { useState } from 'react';
import { Monitor, Tablet, Smartphone, X, ShoppingBag } from 'lucide-react';

interface DemoViewerProps {
  demoUrl: string;
  themeName: string;
  onClose: () => void;
  onOrder: (themeName: string) => void;
}

type DeviceMode = 'desktop' | 'tablet' | 'mobile';

export const DemoViewer: React.FC<DemoViewerProps> = ({ demoUrl, themeName, onClose, onOrder }) => {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');

  const getWidth = () => {
    switch (deviceMode) {
      case 'mobile':
        return '375px';
      case 'tablet':
        return '768px';
      case 'desktop':
      default:
        return '100%';
    }
  };

  const getHeight = () => {
    switch (deviceMode) {
      case 'mobile':
        return '760px';
      case 'tablet':
        return '900px';
      case 'desktop':
      default:
        return '100%';
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0f172a',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Immersive Toolbar Header */}
      <div
        style={{
          height: '64px',
          backgroundColor: '#1e293b',
          borderBottom: '1px solid #334155',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#ffffff',
          flexShrink: 0
        }}
      >
        {/* Left Side: Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', backgroundColor: '#334155', padding: '4px 8px', borderRadius: '4px', color: '#94a3b8' }}>
            Шууд үзэх
          </span>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>
            {themeName.split(' — ')[0]}
          </h2>
        </div>

        {/* Center: Device Switcher */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#0f172a',
            padding: '4px',
            borderRadius: '8px',
            border: '1px solid #334155'
          }}
        >
          <button
            onClick={() => setDeviceMode('desktop')}
            style={{
              padding: '6px 12px',
              border: 'none',
              borderRadius: '6px',
              background: deviceMode === 'desktop' ? '#334155' : 'transparent',
              color: deviceMode === 'desktop' ? '#ffffff' : '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 600,
              transition: 'all 0.2s'
            }}
          >
            <Monitor size={14} /> Компьютер
          </button>
          <button
            onClick={() => setDeviceMode('tablet')}
            style={{
              padding: '6px 12px',
              border: 'none',
              borderRadius: '6px',
              background: deviceMode === 'tablet' ? '#334155' : 'transparent',
              color: deviceMode === 'tablet' ? '#ffffff' : '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 600,
              transition: 'all 0.2s'
            }}
          >
            <Tablet size={14} /> Таблет
          </button>
          <button
            onClick={() => setDeviceMode('mobile')}
            style={{
              padding: '6px 12px',
              border: 'none',
              borderRadius: '6px',
              background: deviceMode === 'mobile' ? '#334155' : 'transparent',
              color: deviceMode === 'mobile' ? '#ffffff' : '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 600,
              transition: 'all 0.2s'
            }}
          >
            <Smartphone size={14} /> Гар утас
          </button>
        </div>

        {/* Right Side: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => onOrder(themeName)}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ShoppingBag size={14} /> Энэ загварыг захиалах
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '8px',
              borderRadius: '6px',
              background: '#334155',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main Preview Container */}
      <div
        style={{
          flexGrow: 1,
          backgroundColor: '#0f172a',
          padding: deviceMode === 'desktop' ? '0' : '32px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflowY: 'auto',
          position: 'relative'
        }}
      >
        {/* Isolated Sub-frame representation */}
        <div
          style={{
            width: getWidth(),
            height: getHeight(),
            maxWidth: '100%',
            maxHeight: '100%',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: deviceMode === 'desktop' ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            border: deviceMode === 'desktop' ? 'none' : '12px solid #1e293b',
            borderRadius: deviceMode === 'desktop' ? '0' : '24px',
            overflow: 'hidden',
            backgroundColor: '#ffffff',
            position: 'relative'
          }}
        >
          {/* Iframe */}
          <iframe
            src={demoUrl}
            title={themeName}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              backgroundColor: '#ffffff'
            }}
          />
        </div>
      </div>
    </div>
  );
};
