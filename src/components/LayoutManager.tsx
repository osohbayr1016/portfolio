import React, { useState } from 'react';
import { GripVertical, RotateCcw, AlertCircle } from 'lucide-react';
import { store } from '../data/store';

interface LayoutManagerProps {
  layout: string[];
  onLayoutChange: (newLayout: string[]) => void;
}

const SECTION_NAMES: { [key: string]: string } = {
  hero: 'Толгой танилцуулга хэсэг (Hero Section)',
  target: 'Хэнд зориулагдсан бэ хэсэг (Target Audience Section)',
  projects: 'Хийж гүйцэтгэсэн ажлууд (Completed Case Studies)',
  themes: 'Бэлэн вэб загваруудын каталог (Pre-made Themes Grid)',
  services: 'Үйлчилгээ болон үнийн санал (Pricing & Services Table)',
  contact: 'Холбоо барих маягт (Contact & Booking Form)'
};

export const LayoutManager: React.FC<LayoutManagerProps> = ({ layout, onLayoutChange }) => {
  const [sections, setSections] = useState<string[]>(layout);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null) return;
    
    const updatedSections = [...sections];
    const draggedItem = updatedSections[draggedIndex];
    
    // Remove dragged item
    updatedSections.splice(draggedIndex, 1);
    // Insert into new position
    updatedSections.splice(index, 0, draggedItem);
    
    setSections(updatedSections);
    store.saveHomeLayout(updatedSections);
    onLayoutChange(updatedSections);
    
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleReset = () => {
    const defaultLayout = store.resetHomeLayout();
    setSections(defaultLayout);
    onLayoutChange(defaultLayout);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
            Вэбсайтын бүтэц зохион байгуулалт
          </h3>
          <p style={{ fontSize: '14px', color: '#64748b' }}>
            Вэбсайтынхаа хэсгүүдийн дарааллыг чирч (Drag and Drop) хүссэнээрээ өөрчилнө үү.
          </p>
        </div>
        <button
          onClick={handleReset}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            fontWeight: 600,
            padding: '10px 16px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            backgroundColor: '#ffffff',
            color: '#ef4444',
            cursor: 'pointer',
            transition: 'var(--transition-smooth)'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fef2f2'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; }}
        >
          <RotateCcw size={14} /> Анхны байдалд оруулах
        </button>
      </div>

      {/* Info notice */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          backgroundColor: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '8px',
          padding: '16px',
          alignItems: 'flex-start'
        }}
      >
        <AlertCircle size={20} style={{ color: '#2563eb', flexShrink: 0 }} />
        <p style={{ fontSize: '13.5px', color: '#1e3a8a', lineHeight: 1.5 }}>
          <strong>Заавар:</strong> Хэсгүүдийн баруун талд байрлах зургаан цэгтэй бариулаас барин дээш доош чирч байрлалыг солино. Таны хийсэн өөрчлөлт шууд вэбсайтын нүүр хуудас дээр бодит цагт биелэгдэх болно.
        </p>
      </div>

      {/* Drag & Drop Stack Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '4px' }}>
        {sections.map((sectionId, index) => {
          const isDragging = draggedIndex === index;
          const isOver = dragOverIndex === index;

          return (
            <div
              key={sectionId}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              onDrop={() => handleDrop(index)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                backgroundColor: isDragging ? '#f1f5f9' : '#ffffff',
                border: isOver ? '2px dashed #2563eb' : '1px solid #e2e8f0',
                borderRadius: '10px',
                boxShadow: isDragging ? 'none' : '0 2px 4px rgba(15,23,42,0.02)',
                cursor: 'grab',
                opacity: isDragging ? 0.6 : 1,
                transform: isOver ? 'scale(1.01)' : 'scale(1)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                if (!isDragging) {
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(15,23,42,0.03)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isDragging) {
                  e.currentTarget.style.borderColor = isOver ? '#2563eb' : '#e2e8f0';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(15,23,42,0.02)';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#94a3b8',
                    backgroundColor: '#f1f5f9',
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {index + 1}
                </span>
                <span style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a' }}>
                  {SECTION_NAMES[sectionId] || sectionId}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#2563eb',
                    backgroundColor: '#eff6ff',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    textTransform: 'uppercase'
                  }}
                >
                  {sectionId}
                </span>
                <GripVertical size={18} style={{ color: '#94a3b8', cursor: 'grab' }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
