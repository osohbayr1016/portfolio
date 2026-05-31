import React from 'react';
import type { TemplateTheme } from '../data/templates';
import { store } from '../data/store';
import { Eye, ShoppingBag, Clock } from 'lucide-react';
import { EditableText } from './EditableText';
import { useMobile } from '../hooks/useMobile';

interface TemplateCatalogProps {
  onSelectDemo: (demoUrl: string, themeName: string) => void;
  onOrderTheme: (themeName: string) => void;
  isEditMode?: boolean;
  onStateUpdate?: () => void;
}

export const TemplateCatalog: React.FC<TemplateCatalogProps> = ({
  onSelectDemo,
  onOrderTheme,
  isEditMode,
  onStateUpdate
}) => {
  const templatesList = store.getTemplates();
  const isMobile = useMobile();

  return (
    <section id="themes" style={{ padding: isMobile ? '48px 0' : '80px 0', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '32px' : '56px' }}>
          <EditableText
            storeKey="themes.badge"
            defaultValue="Шуурхай Шийдэлүүд"
            isEditMode={!!isEditMode}
            onStateUpdate={onStateUpdate}
            tagName="span"
            style={{
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#2563eb',
              letterSpacing: '2px',
              display: 'block',
              marginBottom: '12px'
            }}
          />
          <EditableText
            storeKey="themes.title"
            defaultValue="Бизнестээ Тохируулан Ашиглах Бэлэн Загварууд"
            isEditMode={!!isEditMode}
            onStateUpdate={onStateUpdate}
            tagName="h2"
            style={{ fontSize: isMobile ? '26px' : '32px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}
          />
          <EditableText
            storeKey="themes.description"
            defaultValue='Амжилттай туршигдсан бэлэн загваруудаас сонгоно уу. "Демо үзэх" дээр дарж дэлгэцийн харагдацыг шалгах боломжтой. Би таны брэнд өнгө төрх, текстэд тохируулан хэдхэн хоногт бэлэн болгож өгнө.'
            isEditMode={!!isEditMode}
            onStateUpdate={onStateUpdate}
            tagName="p"
            style={{ fontSize: isMobile ? '14px' : '16px', color: '#475569', maxWidth: '650px', margin: '0 auto', lineHeight: 1.5 }}
          />
        </div>

        {/* Catalog Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: isMobile ? '20px' : '32px'
          }}
        >
          {templatesList.map((theme: TemplateTheme) => (
            <div
              key={theme.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'var(--transition-smooth)'
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-premium)';
                  e.currentTarget.style.borderColor = '#cbd5e1';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }
              }}
            >
              {/* Card visual banner */}
              <div
                style={{
                  height: '140px',
                  background: theme.gradient,
                  padding: '24px',
                  color: theme.textColorClass === 'text-white' ? '#ffffff' : '#0f172a',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative'
                }}
              >
                {/* Dot background in banner */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)',
                    backgroundSize: '12px 12px',
                    pointerEvents: 'none'
                  }}
                />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', backgroundColor: 'rgba(255, 255, 255, 0.15)', padding: '4px 10px', borderRadius: '4px', backdropFilter: 'blur(4px)' }}>
                    {theme.category}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} /> {theme.deliveryTime}
                  </span>
                </div>
                
                <h3 style={{ fontSize: '20px', fontWeight: 800, zIndex: 1 }}>{theme.name.split(' — ')[0]}</h3>
              </div>

              {/* Card Body */}
              <div style={{ padding: isMobile ? '20px' : '28px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5, marginBottom: '20px' }}>
                    {theme.description}
                  </p>

                  <h5 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', marginBottom: '10px', letterSpacing: '0.5px' }}>
                    Загварт багтсан давуу талууд
                  </h5>
                  
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0' }}>
                    {theme.features.map((feature, i) => (
                      <li key={i} style={{ fontSize: '13px', color: '#475569', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer price & links */}
                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: isMobile ? '16px' : '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isMobile ? '16px' : '20px' }}>
                      <div>
                        <span style={{ fontSize: '12px', color: '#94a3b8', display: 'block' }}>Үндсэн үнэ (Захиалгаар)</span>
                        <span style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>{theme.basePrice}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '12px', color: '#94a3b8', display: 'block' }}>Вэб байршуулалт</span>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#475569' }}>Бүрэн бэлэн</span>
                      </div>
                    </div>
  
                    {/* Actions buttons */}
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: isMobile ? '8px' : '12px' }}>
                      <button
                        onClick={() => onSelectDemo(theme.demoUrl, theme.name)}
                        className="btn btn-secondary"
                        style={{
                          padding: '10px 14px',
                          fontSize: '13px',
                          fontWeight: 600,
                          border: '1px solid #cbd5e1',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <Eye size={14} /> Демо үзэх
                      </button>
                      <button
                        onClick={() => onOrderTheme(theme.name)}
                        className="btn btn-primary"
                        style={{
                          padding: '10px 14px',
                          fontSize: '13px',
                          fontWeight: 600,
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
                          color: '#fff',
                          border: 'none'
                        }}
                      >
                        <ShoppingBag size={14} /> Загвар Захиалах
                      </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
