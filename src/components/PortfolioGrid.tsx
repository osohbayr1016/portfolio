import React, { useState } from 'react';
import type { Project } from '../data/projects';
import { store } from '../data/store';
import { ArrowRight, Globe2 } from 'lucide-react';
import { EditableText } from './EditableText';
import { useMobile } from '../hooks/useMobile';

interface PortfolioGridProps {
  isEditMode?: boolean;
  onStateUpdate?: () => void;
  isMobile?: boolean;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ isEditMode, onStateUpdate, isMobile: isMobileProp }) => {
  const isMobileHook = useMobile();
  const isMobile = isMobileProp !== undefined ? isMobileProp : isMobileHook;
  const projectsList = store.getProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" style={{ padding: isMobile ? '56px 0' : '80px 0', borderBottom: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '32px' : '56px' }}>
          <EditableText
            storeKey="projects.title"
            defaultValue="Хииж Гүицэтгэсэн Захиалгат Төслүүд"
            isEditMode={!!isEditMode}
            onStateUpdate={onStateUpdate}
            tagName="h2"
            style={{ fontSize: isMobile ? '26px' : '32px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}
          />
          <EditableText
            storeKey="projects.description"
            defaultValue="Бизнесүүдэд зориулан эхнээс нь кодчилж, амжилттай хүлээлгэж өгсөн тусгай вэб системүүдийн түүвэр."
            isEditMode={!!isEditMode}
            onStateUpdate={onStateUpdate}
            tagName="p"
            style={{ fontSize: isMobile ? '14.5px' : '16px', color: '#475569', maxWidth: '600px', margin: '0 auto' }}
          />
        </div>

        {/* Project Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: isMobile ? '20px' : '32px'
          }}
        >
          {projectsList.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '24px',
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(15, 23, 42, 0.04)';
                e.currentTarget.style.borderColor = '#cbd5e1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.02)';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              <div>
                {/* Visual Cover (Mock) */}
                <div
                  style={{
                    width: '100%',
                    height: '180px',
                    borderRadius: '8px',
                    background: project.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Subtle Gridlines in Cover */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1.2px, transparent 1.2px)',
                      backgroundSize: '16px 16px'
                    }}
                  />
                  <Globe2 size={40} style={{ color: 'rgba(255, 255, 255, 0.9)', zIndex: 1 }} />
                </div>

                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: '#2563eb',
                    letterSpacing: '1px',
                    marginBottom: '8px',
                    display: 'block'
                  }}
                >
                  {project.category}
                </span>

                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                  {project.title}
                </h3>

                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5, marginBottom: '20px' }}>
                  {project.description}
                </p>
              </div>

              {/* Stats Highlights & Tags */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    marginBottom: '20px'
                  }}
                >
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        backgroundColor: '#f1f5f9',
                        color: '#475569',
                        padding: '3px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#2563eb', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    Дэлгэрэнгүй үзэх <ArrowRight size={14} />
                  </span>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>Захиалагч: {project.client}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Case Study overlay */}
        {selectedProject && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(15, 23, 42, 0.4)',
              backdropFilter: 'blur(4px)',
              zIndex: 100,
              display: 'flex',
              alignItems: isMobile ? 'flex-start' : 'center',
              justifyContent: 'center',
              padding: isMobile ? '12px' : '16px',
              overflowY: 'auto'
            }}
            onClick={() => setSelectedProject(null)}
          >
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '680px',
                maxHeight: isMobile ? 'calc(100vh - 24px)' : 'none',
                overflowY: 'auto',
                border: '1px solid #e2e8f0',
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
                animation: 'fadeIn 0.3s ease-out',
                margin: isMobile ? '12px 0' : '0'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header block */}
              <div
                style={{
                  padding: isMobile ? '24px 20px 20px 20px' : '32px 32px 24px 32px',
                  background: selectedProject.gradient,
                  color: '#ffffff',
                  position: 'relative'
                }}
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  style={{
                    position: 'absolute',
                    top: isMobile ? '16px' : '20px',
                    right: isMobile ? '16px' : '20px',
                    background: 'rgba(0, 0, 0, 0.2)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    color: '#ffffff',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ×
                </button>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
                  {selectedProject.category}
                </span>
                <h2 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 800, color: '#ffffff', paddingRight: '28px' }}>
                  {selectedProject.title}
                </h2>
              </div>

              {/* Main Content */}
              <div style={{ padding: isMobile ? '20px' : '32px' }}>
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', marginBottom: '8px', letterSpacing: '0.5px' }}>
                    Төслийн Ерөнхий Тойм
                  </h4>
                  <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.6 }}>
                    {selectedProject.longDescription}
                  </p>
                </div>

                {/* Key statistics row */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                    gap: isMobile ? '12px' : '16px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    padding: '16px',
                    border: '1px solid #e2e8f0',
                    marginBottom: '24px'
                  }}
                >
                  {selectedProject.stats.map((stat) => (
                    <div key={stat.label} style={{ textAlign: isMobile ? 'left' : 'center', display: isMobile ? 'flex' : 'block', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: isMobile ? '0' : '4px' }}>{stat.label}</div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#2563eb' }}>{stat.value}</div>
                    </div>
                  ))}
                </div>

                {/* Meta details */}
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', gap: '16px' }}>
                  <div>
                    <h5 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', marginBottom: '6px' }}>Ашигласан Технологиуд</h5>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {selectedProject.tags.map((tag) => (
                        <span key={tag} style={{ fontSize: '11px', fontWeight: 600, backgroundColor: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: '4px' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ textAlign: isMobile ? 'left' : 'right' }}>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>Захиалагч & Хүлээлгэж Өгсөн Он</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{selectedProject.client} ({selectedProject.year})</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
};
