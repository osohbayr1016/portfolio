import React, { useState } from 'react';
import { GripVertical, Plus, Trash2, Edit3, X, Save, AlertCircle } from 'lucide-react';
import type { Project } from '../data/projects';
import { store } from '../data/store';

interface ProjectManagerProps {
  onProjectsChange: () => void;
}

export const ProjectManager: React.FC<ProjectManagerProps> = ({ onProjectsChange }) => {
  const [projectsList, setProjectsList] = useState<Project[]>(store.getProjects());
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  
  // Drag & drop sorting states
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formLongDesc, setFormLongDesc] = useState('');
  const [formClient, setFormClient] = useState('');
  const [formYear, setFormYear] = useState('');
  const [formTags, setFormTags] = useState('');
  const [formGradient, setFormGradient] = useState('linear-gradient(135deg, #1e3a8a 0%, #0d9488 100%)');
  
  // Stats states
  const [stat1Label, setStat1Label] = useState('');
  const [stat1Value, setStat1Value] = useState('');
  const [stat2Label, setStat2Label] = useState('');
  const [stat2Value, setStat2Value] = useState('');
  const [stat3Label, setStat3Label] = useState('');
  const [stat3Value, setStat3Value] = useState('');

  const [formErrors, setFormErrors] = useState<string>('');

  // Drag Re-ordering logic
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null) return;
    const updated = [...projectsList];
    const draggedItem = updated[draggedIndex];
    updated.splice(draggedIndex, 1);
    updated.splice(index, 0, draggedItem);
    
    setProjectsList(updated);
    store.saveProjects(updated);
    onProjectsChange();
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Open editor drawer
  const openAddEditor = () => {
    setEditingProject(null);
    setFormTitle('');
    setFormCategory('');
    setFormDescription('');
    setFormLongDesc('');
    setFormClient('');
    setFormYear(new Date().getFullYear().toString());
    setFormTags('React, TypeScript, TailwindCSS');
    setFormGradient('linear-gradient(135deg, #1e3a8a 0%, #0d9488 100%)');
    
    setStat1Label('Ачаалах хурд'); setStat1Value('0.8сек');
    setStat2Label('Борлуулалт өсөлт'); setStat2Value('+24%');
    setStat3Label('Хөрвүүлэлт'); setStat3Value('99.9%');
    
    setFormErrors('');
    setIsEditorOpen(true);
  };

  const openEditEditor = (project: Project) => {
    setEditingProject(project);
    setFormTitle(project.title);
    setFormCategory(project.category);
    setFormDescription(project.description);
    setFormLongDesc(project.longDescription);
    setFormClient(project.client);
    setFormYear(project.year);
    setFormTags(project.tags.join(', '));
    setFormGradient(project.gradient);
    
    // Stats mapping
    setStat1Label(project.stats[0]?.label || ''); setStat1Value(project.stats[0]?.value || '');
    setStat2Label(project.stats[1]?.label || ''); setStat2Value(project.stats[1]?.value || '');
    setStat3Label(project.stats[2]?.label || ''); setStat3Value(project.stats[2]?.value || '');
    
    setFormErrors('');
    setIsEditorOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Энэ төслийг устгахдаа итгэлтэй байна уу?')) {
      const updated = projectsList.filter(p => p.id !== id);
      setProjectsList(updated);
      store.saveProjects(updated);
      onProjectsChange();
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formCategory.trim() || !formDescription.trim()) {
      setFormErrors('Нэр, ангилал болон богино тайлбар шаардлагатай!');
      return;
    }

    const tagsArray = formTags.split(',').map(t => t.trim()).filter(t => t.length > 0);
    const statsArray = [
      { label: stat1Label || 'Хурд', value: stat1Value || 'Түргэн' },
      { label: stat2Label || 'Үр дүн', value: stat2Value || '+20%' },
      { label: stat3Label || 'Чанар', value: stat3Value || '100%' }
    ];

    const projectData: Project = {
      id: editingProject ? editingProject.id : `project-${Date.now()}`,
      title: formTitle,
      category: formCategory,
      description: formDescription,
      longDescription: formLongDesc || formDescription,
      tags: tagsArray,
      client: formClient || 'Хувийн захиалга',
      year: formYear || new Date().getFullYear().toString(),
      stats: statsArray,
      gradient: formGradient
    };

    let updatedList = [...projectsList];
    if (editingProject) {
      // Modify
      updatedList = updatedList.map(p => p.id === editingProject.id ? projectData : p);
    } else {
      // Create new
      updatedList.push(projectData);
    }

    setProjectsList(updatedList);
    store.saveProjects(updatedList);
    onProjectsChange();
    setIsEditorOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
            Хийж гүйцэтгэсэн ажлын менежер
          </h3>
          <p style={{ fontSize: '14px', color: '#64748b' }}>
            Төслүүд нэмэх, засах, устгах, мөн чирж дарааллыг нь өөрчлөх боломжтой.
          </p>
        </div>
        <button
          onClick={openAddEditor}
          className="btn btn-primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '10px 16px', borderRadius: '8px', border: 'none' }}
        >
          <Plus size={16} /> Шинэ Төсөл Нэмэх
        </button>
      </div>

      {/* Grid Table of items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {projectsList.map((project, index) => {
          const isDragging = draggedIndex === index;
          const isOver = dragOverIndex === index;

          return (
            <div
              key={project.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={() => { setDraggedIndex(null); setDragOverIndex(null); }}
              onDrop={() => handleDrop(index)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                backgroundColor: '#ffffff',
                border: isOver ? '2px dashed #2563eb' : '1px solid #e2e8f0',
                borderRadius: '12px',
                opacity: isDragging ? 0.5 : 1,
                transform: isOver ? 'scale(1.005)' : 'scale(1)',
                boxShadow: '0 2px 4px rgba(15,23,42,0.02)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Left Side detail */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexGrow: 1, overflow: 'hidden' }}>
                <div style={{ cursor: 'grab', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <GripVertical size={16} style={{ color: '#94a3b8' }} />
                </div>
                
                {/* Micro Cover color */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '8px',
                    background: project.gradient,
                    flexShrink: 0
                  }}
                />

                <div style={{ overflow: 'hidden' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                    {project.category}
                  </span>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    {project.title}
                  </h4>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>Захиалагч: {project.client} ({project.year})</span>
                </div>
              </div>

              {/* Actions right side */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '16px' }}>
                <button
                  onClick={() => openEditEditor(project)}
                  style={{
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                    backgroundColor: '#ffffff',
                    color: '#475569',
                    cursor: 'pointer'
                  }}
                >
                  <Edit3 size={14} />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  style={{
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1px solid #fecaca',
                    backgroundColor: '#ffffff',
                    color: '#ef4444',
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide Drawer/Modal Editor */}
      {isEditorOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(15,23,42,0.4)',
            backdropFilter: 'blur(4px)',
            zIndex: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '620px',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: 'var(--shadow-premium)',
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Drawer Header */}
            <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
                {editingProject ? 'Төслийн мэдээлэл засах' : 'Шинэ төсөл нэмэх'}
              </h3>
              <button
                onClick={() => setIsEditorOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSave} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {formErrors && (
                <div style={{ display: 'flex', gap: '8px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '12px', borderRadius: '8px', color: '#ef4444', fontSize: '13px' }}>
                  <AlertCircle size={16} /> {formErrors}
                </div>
              )}

              {/* Title */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', display: 'block', marginBottom: '6px' }}>Төслийн нэр</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Жишээ нь: ApexFlow Analytics Platform"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                />
              </div>

              {/* Category */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', display: 'block', marginBottom: '6px' }}>Төслийн ангилал</label>
                <input
                  type="text"
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  placeholder="Жишээ нь: Финтек Вэб Апп"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                />
              </div>

              {/* Client & Year */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', display: 'block', marginBottom: '6px' }}>Захиалагч</label>
                  <input
                    type="text"
                    value={formClient}
                    onChange={(e) => setFormClient(e.target.value)}
                    placeholder="Жишээ нь: Nexus Ltd."
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', display: 'block', marginBottom: '6px' }}>Ажилласан он</label>
                  <input
                    type="text"
                    value={formYear}
                    onChange={(e) => setFormYear(e.target.value)}
                    placeholder="Жишээ нь: 2025"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', display: 'block', marginBottom: '6px' }}>Богино тайлбар (Карт дээр харагдах)</label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  rows={2}
                  placeholder="Төслийн гол давуу талыг харуулсан 1-2 өгүүлбэр тайлбар..."
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', display: 'block', marginBottom: '6px' }}>Урт тайлбар (Дэлгэрэнгүй хуудсанд харагдах)</label>
                <textarea
                  value={formLongDesc}
                  onChange={(e) => setFormLongDesc(e.target.value)}
                  rows={4}
                  placeholder="Бид уг төслийг хэрхэн хийсэн, ямар хүндрэлийг шийдсэн тухай дэлгэрэнгүй тойм..."
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', resize: 'vertical' }}
                />
              </div>

              {/* Technologies Tags */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', display: 'block', marginBottom: '6px' }}>Ашигласан технологиуд (Таслалаар тусгаарлах)</label>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="React, TypeScript, TailwindCSS, WebSockets"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                />
              </div>

              {/* Cover Gradient Presets */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', display: 'block', marginBottom: '6px' }}>Нүүрний градиент өнгө (Gradient CSS)</label>
                <select
                  value={formGradient}
                  onChange={(e) => setFormGradient(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', backgroundColor: '#ffffff' }}
                >
                  <option value="linear-gradient(135deg, #1e3a8a 0%, #0d9488 100%)">Тэнгисийн Цэнхэр (Ocean Blue)</option>
                  <option value="linear-gradient(135deg, #4c1d95 0%, #db2777 100%)">Ягаан Нил (Sunset Pink)</option>
                  <option value="linear-gradient(135deg, #111827 0%, #374151 100%)">Төмөрлөг Саарал (Steel Dark)</option>
                  <option value="linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)">Гүн Харанхуй (Deep Teal)</option>
                  <option value="linear-gradient(135deg, #f59e0b 0%, #e11d48 100%)">Дөлөн Улаан (Fiery Gold)</option>
                </select>
              </div>

              {/* Statistics Details */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                <h5 style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>Төслийн статистик амжилтууд</h5>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Утга 1 (нэр)</label>
                    <input type="text" value={stat1Label} onChange={(e) => setStat1Label(e.target.value)} placeholder="Ачаалах хурд" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }} />
                    <label style={{ fontSize: '11px', color: '#64748b', display: 'block', marginTop: '4px', marginBottom: '4px' }}>Тоо/Үр дүн</label>
                    <input type="text" value={stat1Value} onChange={(e) => setStat1Value(e.target.value)} placeholder="0.8сек" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Утга 2 (нэр)</label>
                    <input type="text" value={stat2Label} onChange={(e) => setStat2Label(e.target.value)} placeholder="Борлуулалт өсөлт" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }} />
                    <label style={{ fontSize: '11px', color: '#64748b', display: 'block', marginTop: '4px', marginBottom: '4px' }}>Тоо/Үр дүн</label>
                    <input type="text" value={stat2Value} onChange={(e) => setStat2Value(e.target.value)} placeholder="+24%" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Утга 3 (нэр)</label>
                    <input type="text" value={stat3Label} onChange={(e) => setStat3Label(e.target.value)} placeholder="Хөрвүүлэлт" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }} />
                    <label style={{ fontSize: '11px', color: '#64748b', display: 'block', marginTop: '4px', marginBottom: '4px' }}>Тоо/Үр дүн</label>
                    <input type="text" value={stat3Value} onChange={(e) => setStat3Value(e.target.value)} placeholder="99.9%" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }} />
                  </div>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="btn btn-secondary"
                  style={{ padding: '10px 18px', fontSize: '13px', borderRadius: '8px' }}
                >
                  Цуцлах
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    padding: '10px 18px',
                    fontSize: '13px',
                    borderRadius: '8px',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
                    color: '#ffffff',
                    fontWeight: 600
                  }}
                >
                  <Save size={14} /> Хадгалах
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
