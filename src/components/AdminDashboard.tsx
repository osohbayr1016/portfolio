import React, { useState } from 'react';
import { Layout, Briefcase, Palette, ArrowLeft, BarChart3, MessageSquare, CheckSquare } from 'lucide-react';
import { LayoutManager } from './LayoutManager';
import { ProjectManager } from './ProjectManager';
import { ThemeManager } from './ThemeManager';
import { store } from '../data/store';

interface AdminDashboardProps {
  onClose: () => void;
  onStateUpdate: () => void;
  onToggleVisualEdit: () => void;
}

type TabType = 'analytics' | 'layout' | 'projects' | 'themes';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose, onStateUpdate, onToggleVisualEdit }) => {
  const [activeTab, setActiveTab] = useState<TabType>('analytics');
  
  // Dynamic stats
  const [layout, setLayout] = useState<string[]>(store.getHomeLayout());
  const [projectsCount, setProjectsCount] = useState<number>(store.getProjects().length);
  const [themesCount, setThemesCount] = useState<number>(store.getTemplates().length);

  const handleUpdate = () => {
    setProjectsCount(store.getProjects().length);
    setThemesCount(store.getTemplates().length);
    onStateUpdate();
  };

  const handleLayoutUpdate = (newLayout: string[]) => {
    setLayout(newLayout);
    onStateUpdate();
  };

  // Mock inbox inquiries
  const mockInquiries = [
    { name: 'Баяраа (Зөвлөх ХХК)', email: 'bayar@consult.mn', type: 'Бэлэн Загвар', date: 'Өнөөдөр', detail: 'AURA Studio загварыг өөрийн компаний өнгөөр тохируулан хийлгэх сонирхолтой байна.' },
    { name: 'Анужин (Ану Арт директор)', email: 'anujin@art.mn', type: 'Бүрэн Захиалгат', date: 'Өчигдөр', detail: 'Чөлөөт уран бүтээлчийн портфолио вэб хувийн дизайнгаар эхнээс нь хийлгэх үнийн санал авах.' },
    { name: 'Бат-Эрдэнэ (Стартап үүсгэн байгуулагч)', email: 'bat@apex.io', type: 'SaaS Танилцуулга', date: '3 хоногийн өмнө', detail: 'ApexFlow загвар дээр суурилан хэрэглэгчийн бүртгэлийн хэсгийг нэмж хийлгэх боломжтой юу?' }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#f8fafc',
        zIndex: 250,
        display: 'flex',
        overflow: 'hidden',
        fontFamily: 'system-ui, sans-serif'
      }}
    >
      {/* 1. Sidebar Navigation */}
      <aside
        style={{
          width: '280px',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '24px',
          flexShrink: 0
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Logo brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '15px'
              }}
            >
              T
            </span>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.3px', margin: 0 }}>
                ЦОЛМОН АДМИН
              </h2>
              <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
                Систем идэвхтэй
              </span>
            </div>
          </div>

          {/* Nav list */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Visual Edit Mode button inside sidebar nav */}
            <button
              onClick={onToggleVisualEdit}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                border: '1.5px dashed #2563eb',
                borderRadius: '8px',
                backgroundColor: '#eff6ff',
                color: '#2563eb',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.2s',
                marginBottom: '12px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#dbeafe';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#eff6ff';
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2563eb', display: 'inline-block' }} />
              Шууд засах горим (Visual Edit)
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: activeTab === 'analytics' ? '#eff6ff' : 'transparent',
                color: activeTab === 'analytics' ? '#2563eb' : '#64748b',
                fontSize: '14.5px',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.2s'
              }}
            >
              <BarChart3 size={18} /> Хянах Самбар (Нүүр)
            </button>
            
            <button
              onClick={() => setActiveTab('layout')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: activeTab === 'layout' ? '#eff6ff' : 'transparent',
                color: activeTab === 'layout' ? '#2563eb' : '#64748b',
                fontSize: '14.5px',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.2s'
              }}
            >
              <Layout size={18} /> Эхлэлийн Бүтэц (Drag)
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: activeTab === 'projects' ? '#eff6ff' : 'transparent',
                color: activeTab === 'projects' ? '#2563eb' : '#64748b',
                fontSize: '14.5px',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.2s'
              }}
            >
              <Briefcase size={18} /> Төслүүд Удирдах
            </button>

            <button
              onClick={() => setActiveTab('themes')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: activeTab === 'themes' ? '#eff6ff' : 'transparent',
                color: activeTab === 'themes' ? '#2563eb' : '#64748b',
                fontSize: '14.5px',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.2s'
              }}
            >
              <Palette size={18} /> Загварууд Удирдах
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <button
          onClick={onClose}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            backgroundColor: '#ffffff',
            color: '#0f172a',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            width: '100%',
            transition: 'var(--transition-smooth)'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f8fafc'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; }}
        >
          <ArrowLeft size={16} /> Вэбсайт руу буцах
        </button>
      </aside>

      {/* 2. Main Content Canvas */}
      <main style={{ flexGrow: 1, overflowY: 'auto', padding: '40px 48px' }}>
        {activeTab === 'analytics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Intro Header & Visual Edit Promo */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                  Сайн байна уу, Цолмон! 👋
                </h2>
                <p style={{ fontSize: '15px', color: '#64748b' }}>
                  Таны вэбсайтны хянах самбарт тавтай морил. Эндээс вэбсайтны өгөгдөл, бүтэц зохион байгуулалтыг бодит цагт удирдана.
                </p>
              </div>

              {/* Promo Banner for Visual Inline Edit */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                  color: '#ffffff',
                  padding: '24px 32px',
                  borderRadius: '16px',
                  boxShadow: 'var(--shadow-md)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '24px',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ flex: '1 1 300px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '6px', color: '#ffffff' }}>
                    Шууд вэбсайт дээрээсээ бичвэрүүдээ засахыг хүсэж байна уу?
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#bfdbfe', margin: 0, opacity: 0.95 }}>
                    "Шууд засах" горимыг идэвхжүүлснээр та вэбсайтын нүүр хуудас дээрх дурын гарчиг, тайлбар эсвэл товчлуурын текстийг шууд товшоод засах боломжтой. Хадгалах товч дарах шаардлагагүй, бичвэрүүд шууд хадгалагдана.
                  </p>
                </div>
                <button
                  onClick={onToggleVisualEdit}
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#2563eb',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                    transition: 'all 0.2s',
                    flexShrink: 0
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  Шууд засах горимыг нээх
                </button>
              </div>
            </div>

            {/* KPI Cards Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
              {/* Card 1 */}
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '8px' }}>Нийт Бүтэц Хэсэг</span>
                  <span style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>{layout.length}</span>
                </div>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Layout size={20} />
                </div>
              </div>

              {/* Card 2 */}
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '8px' }}>Идэвхтэй Төслүүд</span>
                  <span style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>{projectsCount}</span>
                </div>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Briefcase size={20} />
                </div>
              </div>

              {/* Card 3 */}
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '8px' }}>Вэб Загварын Тоо</span>
                  <span style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>{themesCount}</span>
                </div>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Palette size={20} />
                </div>
              </div>

              {/* Card 4 */}
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '8px' }}>Ирсэн Захиалга</span>
                  <span style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>12 (Хуурамч)</span>
                </div>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageSquare size={20} />
                </div>
              </div>
            </div>

            {/* Quick Inbox & Config Checklist Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '32px', alignItems: 'flex-start' }}>
              {/* Inbox Mock Inquiries */}
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '28px' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>
                  Ирсэн Сүүлийн Захиалгууд (Захиалагчийн Ирсэн Хайрцаг)
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {mockInquiries.map((inq, idx) => (
                    <div key={idx} style={{ borderBottom: idx === mockInquiries.length - 1 ? 'none' : '1px solid #f1f5f9', paddingBottom: idx === mockInquiries.length - 1 ? '0' : '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{inq.name}</span>
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>{inq.date}</span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#2563eb', fontWeight: 600, marginBottom: '6px' }}>
                        Сонгосон төрөл: {inq.type} | И-мэйл: {inq.email}
                      </div>
                      <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.4 }}>
                        "{inq.detail}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Development Checklist */}
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '28px' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>
                  Хурдан удирдах зааварчилгаа
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <CheckSquare size={16} style={{ color: '#2563eb', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '13.5px', color: '#475569' }}>
                      <strong>Вэб бүтцээ солих:</strong> Зүүн талын цэснээс "Эхлэлийн бүтэц" таб руу орж хэсгүүдийн байрлалыг чирж солино.
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <CheckSquare size={16} style={{ color: '#2563eb', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '13.5px', color: '#475569' }}>
                      <strong>Төслүүд нэмэх:</strong> "Төслүүд удирдах" таб руу шилжин, "Шинэ төсөл нэмэх" товчлуурыг ашиглана.
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <CheckSquare size={16} style={{ color: '#2563eb', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '13.5px', color: '#475569' }}>
                      <strong>За загвар засах:</strong> "Загварууд удирдах" хэсгээс одоо байгаа загваруудын үнэ болон давуу талуудыг шинэчилнэ.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'layout' && (
          <LayoutManager layout={layout} onLayoutChange={handleLayoutUpdate} />
        )}

        {activeTab === 'projects' && (
          <ProjectManager onProjectsChange={handleUpdate} />
        )}

        {activeTab === 'themes' && (
          <ThemeManager onThemesChange={handleUpdate} />
        )}
      </main>
    </div>
  );
};
