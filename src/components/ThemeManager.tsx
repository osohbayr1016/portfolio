import React, { useState } from 'react';
import { Plus, Trash2, Edit3, X, Save, AlertCircle } from 'lucide-react';
import type { TemplateTheme } from '../data/templates';
import { store } from '../data/store';

interface ThemeManagerProps {
  onThemesChange: () => void;
}

export const ThemeManager: React.FC<ThemeManagerProps> = ({ onThemesChange }) => {
  const [themesList, setThemesList] = useState<TemplateTheme[]>(store.getTemplates());
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingTheme, setEditingTheme] = useState<TemplateTheme | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formBasePrice, setFormBasePrice] = useState('');
  const [formDelivery, setFormDelivery] = useState('');
  const [formDemoUrl, setFormDemoUrl] = useState('');
  const [formFeatures, setFormFeatures] = useState('');
  const [formGradient, setFormGradient] = useState('linear-gradient(135deg, #0b0f19 0%, #1e293b 100%)');
  
  const [formErrors, setFormErrors] = useState<string>('');

  const openAddEditor = () => {
    setEditingTheme(null);
    setFormName('');
    setFormCategory('');
    setFormDescription('');
    setFormBasePrice('1,500,000 ₮');
    setFormDelivery('3-5 Хоног');
    setFormDemoUrl('/demos/agency/index.html');
    setFormFeatures('Гар утсанд төгс зохицох дизайн, Оновчтой үсгийн фонт бүтэц, Хурдан ачаалалт');
    setFormGradient('linear-gradient(135deg, #0b0f19 0%, #1e293b 100%)');
    setFormErrors('');
    setIsEditorOpen(true);
  };

  const openEditEditor = (theme: TemplateTheme) => {
    setEditingTheme(theme);
    setFormName(theme.name);
    setFormCategory(theme.category);
    setFormDescription(theme.description);
    setFormBasePrice(theme.basePrice);
    setFormDelivery(theme.deliveryTime);
    setFormDemoUrl(theme.demoUrl);
    setFormFeatures(theme.features.join(', '));
    setFormGradient(theme.gradient);
    setFormErrors('');
    setIsEditorOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Энэ загварыг устгах уу? Устгавал вэбсайтын каталог хэсгээс шууд хасагдах болно.')) {
      const updated = themesList.filter(t => t.id !== id);
      setThemesList(updated);
      store.saveTemplates(updated);
      onThemesChange();
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formCategory.trim() || !formBasePrice.trim()) {
      setFormErrors('Нэр, ангилал болон үндсэн үнэ шаардлагатай!');
      return;
    }

    const featuresArray = formFeatures.split(',').map(f => f.trim()).filter(f => f.length > 0);

    const themeData: TemplateTheme = {
      id: editingTheme ? editingTheme.id : `theme-${Date.now()}`,
      name: formName,
      category: formCategory,
      description: formDescription,
      basePrice: formBasePrice,
      deliveryTime: formDelivery || '3-5 Хоног',
      demoUrl: formDemoUrl || '/demos/agency/index.html',
      features: featuresArray,
      gradient: formGradient,
      textColorClass: formGradient.includes('#ffffff') || formGradient.includes('#f8fafc') ? 'text-slate-900' : 'text-white',
      details: formDescription
    };

    let updatedList = [...themesList];
    if (editingTheme) {
      updatedList = updatedList.map(t => t.id === editingTheme.id ? themeData : t);
    } else {
      updatedList.push(themeData);
    }

    setThemesList(updatedList);
    store.saveTemplates(updatedList);
    onThemesChange();
    setIsEditorOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
            Бэлэн загварын каталог менежер
          </h3>
          <p style={{ fontSize: '14px', color: '#64748b' }}>
            Вэбсайтаар зочилж буй үйлчлүүлэгчдийн шууд захиалж болох бэлэн вэб загваруудыг удирдана.
          </p>
        </div>
        <button
          onClick={openAddEditor}
          className="btn btn-primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '10px 16px', borderRadius: '8px', border: 'none' }}
        >
          <Plus size={16} /> Шинэ Загвар Нэмэх
        </button>
      </div>

      {/* Grid List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {themesList.map((theme) => (
          <div
            key={theme.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(15,23,42,0.02)',
              transition: 'var(--transition-smooth)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#cbd5e1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexGrow: 1, overflow: 'hidden' }}>
              {/* Cover Gradient Micro */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '8px',
                  background: theme.gradient,
                  flexShrink: 0
                }}
              />
              
              <div style={{ overflow: 'hidden' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                  {theme.category}
                </span>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  {theme.name.split(' — ')[0]}
                </h4>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                  Үнэ: <strong style={{ color: '#0f172a' }}>{theme.basePrice}</strong> | Хугацаа: {theme.deliveryTime}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '16px' }}>
              <button
                onClick={() => openEditEditor(theme)}
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
                onClick={() => handleDelete(theme.id)}
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
        ))}
      </div>

      {/* Editor Modal */}
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
            {/* Header */}
            <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
                {editingTheme ? 'Вэб загварын мэдээлэл засах' : 'Шинэ вэб загвар нэмэх'}
              </h3>
              <button
                onClick={() => setIsEditorOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {formErrors && (
                <div style={{ display: 'flex', gap: '8px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '12px', borderRadius: '8px', color: '#ef4444', fontSize: '13px' }}>
                  <AlertCircle size={16} /> {formErrors}
                </div>
              )}

              {/* Theme Name */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', display: 'block', marginBottom: '6px' }}>Загварын нэр</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Жишээ нь: KAI Creative — Гэрэл зургийн портфолио"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                />
              </div>

              {/* Category */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', display: 'block', marginBottom: '6px' }}>Загварын ангилал</label>
                <input
                  type="text"
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  placeholder="Жишээ нь: Гэрэл зураг / Архитектур"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                />
              </div>

              {/* Base Price & Delivery Time */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', display: 'block', marginBottom: '6px' }}>Үндсэн тариф (₮)</label>
                  <input
                    type="text"
                    value={formBasePrice}
                    onChange={(e) => setFormBasePrice(e.target.value)}
                    placeholder="Жишээ нь: 1,500,000 ₮"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', display: 'block', marginBottom: '6px' }}>Хүлээлгэж өгөх хугацаа</label>
                  <input
                    type="text"
                    value={formDelivery}
                    onChange={(e) => setFormDelivery(e.target.value)}
                    placeholder="Жишээ нь: 3-5 Хоног"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                  />
                </div>
              </div>

              {/* Demo URL */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', display: 'block', marginBottom: '6px' }}>Демо хуудасны зам (Iframe load path)</label>
                <input
                  type="text"
                  value={formDemoUrl}
                  onChange={(e) => setFormDemoUrl(e.target.value)}
                  placeholder="Жишээ нь: /demos/agency/index.html"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                />
              </div>

              {/* Description */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', display: 'block', marginBottom: '6px' }}>Загварын тайлбар</label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  rows={3}
                  placeholder="Каталог хэсэгт харагдах загварын дэлгэрэнгүй давуу талуудын тайлбар..."
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', resize: 'vertical' }}
                />
              </div>

              {/* Features List */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', display: 'block', marginBottom: '6px' }}>Гол онцлогууд (Таслалаар тусгаарлах)</label>
                <textarea
                  value={formFeatures}
                  onChange={(e) => setFormFeatures(e.target.value)}
                  rows={3}
                  placeholder="Гар утсанд төгс зохицох дизайн, Хайлтын системийн оновчлол, Хурдан ачаалалт..."
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', resize: 'vertical' }}
                />
              </div>

              {/* Cover Gradient selector */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', display: 'block', marginBottom: '6px' }}>Каталог картны өнгө (Gradient CSS)</label>
                <select
                  value={formGradient}
                  onChange={(e) => setFormGradient(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', backgroundColor: '#ffffff' }}
                >
                  <option value="linear-gradient(135deg, #0b0f19 0%, #1e293b 100%)">Дизайн Студи Харанхуй (Dark Studio)</option>
                  <option value="linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)">Гэрэлтэй Цэнхэр (Light Tech Blue)</option>
                  <option value="linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)">Тансаг Цагаан (Lux Minimal White)</option>
                  <option value="linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)">Маргад Эрдэнэ (Emerald Mint)</option>
                </select>
              </div>

              {/* Footer Actions */}
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
