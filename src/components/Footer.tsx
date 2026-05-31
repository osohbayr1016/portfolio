import React from 'react';
import { ArrowUp } from 'lucide-react';
import { EditableText } from './EditableText';
import { useMobile } from '../hooks/useMobile';

interface FooterProps {
  onAdminClick?: () => void;
  isEditMode?: boolean;
  onStateUpdate?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onAdminClick, isEditMode, onStateUpdate }) => {
  const isMobile = useMobile();
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
        padding: isMobile ? '48px 0 100px 0' : '48px 0',
        color: '#64748b'
      }}
    >
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          {/* Logo brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              T
            </span>
            <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '15px' }}>
              <EditableText
                storeKey="footer.brand"
                defaultValue="TSOLMON"
                isEditMode={!!isEditMode}
                onStateUpdate={onStateUpdate}
              />
            </span>
            
            {onAdminClick && (
              <button
                onClick={onAdminClick}
                style={{
                  marginLeft: '12px',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#64748b',
                  backgroundColor: 'transparent',
                  border: '1px solid #cbd5e1',
                  borderRadius: '4px',
                  padding: '2px 8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#2563eb';
                  e.currentTarget.style.borderColor = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#64748b';
                  e.currentTarget.style.borderColor = '#cbd5e1';
                }}
              >
                Админ нэвтрэх
              </button>
            )}
          </div>

          {/* Copyright handles */}
          <div style={{ fontSize: '13px' }}>
            &copy; {new Date().getFullYear()} <EditableText
              storeKey="footer.copyright"
              defaultValue="Цолмон Дев. Бүх эрх хуулиар хамгаалагдсан. React & TypeScript ашиглан гараар кодлов."
              isEditMode={!!isEditMode}
              onStateUpdate={onStateUpdate}
            />
          </div>

          {/* Quick back to top */}
          <div>
            <a
              href="#"
              onClick={scrollToTop}
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#2563eb',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              Дээшээ очих <ArrowUp size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
