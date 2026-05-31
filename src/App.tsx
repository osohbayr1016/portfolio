import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortfolioGrid } from './components/PortfolioGrid';
import { TemplateCatalog } from './components/TemplateCatalog';
import { DemoViewer } from './components/DemoViewer';
import { Services } from './components/Services';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { TargetSection } from './components/TargetSection';
import { store } from './data/store';
import { Settings, Home, Target, Briefcase, Layout, ShieldCheck, MessageSquare } from 'lucide-react';
import { useMobile } from './hooks/useMobile';

function App() {
  const [activeDemoUrl, setActiveDemoUrl] = useState<string | null>(null);
  const [activeDemoName, setActiveDemoName] = useState<string>('');
  const [presetContactMessage, setPresetContactMessage] = useState<string>('');
  
  // Admin & dynamic re-render triggers
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isVisualEditMode, setIsVisualEditMode] = useState(false);
  const [updateCounter, setUpdateCounter] = useState(0);

  // Active section scroll spy state
  const [activeSection, setActiveSection] = useState<string>('hero');
  const isMobile = useMobile();

  const handleStateUpdate = () => {
    setUpdateCounter((c) => c + 1);
  };

  // Keyboard shortcut (Cmd+Shift+A or Ctrl+Shift+A) to enter Admin Dashboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAdminOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectDemo = (url: string, name: string) => {
    setActiveDemoUrl(url);
    setActiveDemoName(name);
  };

  const handleCloseDemo = () => {
    setActiveDemoUrl(null);
    setActiveDemoName('');
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderTheme = (themeName: string) => {
    setPresetContactMessage(
      `Сайн байна уу! Би таны вэбсайт дээрх '${themeName}' бэлэн загварыг өөрийн бизнест тохируулан хийлгэх сонирхолтой байна. Холбогдож дэлгэрэнгүй ярилцъя!`
    );
    // Smooth scroll down to contact section
    setTimeout(scrollToContact, 100);
  };

  const handleOrderBespoke = () => {
    setPresetContactMessage(
      `Сайн байна уу! Би өөрийн бизнест зориулж 100% цоо шинээр, өөрийн хүссэн дизайны дагуу (Bespoke Fully Custom Website) вэбсайт хийлгэх сонирхолтой байна. Холбогдож ярилцъя:`
    );
    // Smooth scroll down to contact section
    setTimeout(scrollToContact, 100);
  };

  const handleNavbarOrder = () => {
    setPresetContactMessage(
      `Сайн байна уу! Вэбсайт захиалах, хамтран ажиллах талаар зөвлөгөө авч, дэлгэрэнгүй ярилцахыг хүсэж байна.`
    );
    setTimeout(scrollToContact, 100);
  };

  // Get dynamic homepage layout sections sequence
  const layout = store.getHomeLayout();

  // Scrollspy logic using IntersectionObserver on mobile
  useEffect(() => {
    if (!isMobile) return;

    const sections = ['hero', 'target', 'projects', 'themes', 'services', 'contact'];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: '-30% 0px -40% 0px', // trigger when center of section hits view
          threshold: 0
        }
      );
      observer.observe(el);
      return { observer, el, id };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [isMobile, updateCounter, layout]);

  const handleBottomNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // Configure items mapping for mobile bottom bar
  const bottomNavItems = [
    { id: 'hero', label: 'Нүүр', icon: Home },
    { id: 'target', label: 'Зорилт', icon: Target },
    { id: 'projects', label: 'Төслүүд', icon: Briefcase },
    { id: 'themes', label: 'Загвар', icon: Layout },
    { id: 'services', label: 'Тариф', icon: ShieldCheck },
    { id: 'contact', label: 'Холбоо', icon: MessageSquare }
  ];

  // Dynamically align active tabs sequence to layout setup
  const activeNavItems = bottomNavItems.filter((item) => layout.includes(item.id));

  return (
    <div key={updateCounter} style={{ paddingTop: isVisualEditMode ? '60px' : '0' }}>
      {/* Visual Edit Mode Sticky Top Bar */}
      {isVisualEditMode && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '60px',
            backgroundColor: '#0f172a',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            zIndex: 400,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                display: 'inline-block',
                boxShadow: '0 0 8px #10b981'
              }}
            />
            <span style={{ fontSize: '13.5px', fontWeight: 700, letterSpacing: '0.5px' }}>
              ШУУД ЗАСАХ ГОРУМ ИДЭВХТЭЙ (Visual Edit Mode)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => {
                if (confirm('Та вэбийн бүх бичвэрийг анхны хэвэнд нь буцаахдаа итгэлтэй байна уу?')) {
                  store.resetSiteTexts();
                  handleStateUpdate();
                }
              }}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #cbd5e1',
                color: '#cbd5e1',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Эхний бичвэр сэргээх
            </button>
            <button
              onClick={() => {
                setIsVisualEditMode(false);
                setIsAdminOpen(true);
              }}
              style={{
                backgroundColor: '#1e293b',
                border: '1px solid #3b82f6',
                color: '#3b82f6',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Хянах Самбар нээх
            </button>
            <button
              onClick={() => setIsVisualEditMode(false)}
              style={{
                backgroundColor: '#2563eb',
                border: 'none',
                color: '#ffffff',
                padding: '6px 18px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Засаж дууссан
            </button>
          </div>
        </div>
      )}

      <Navbar onOrderClick={handleNavbarOrder} isEditMode={isVisualEditMode} onStateUpdate={handleStateUpdate} />
      
      {/* Loop and render layout sections in dynamic sequence */}
      {layout.map((sectionId) => {
        switch (sectionId) {
          case 'hero':
            return (
              <Hero
                key="hero"
                onExploreWork={() => {
                  const workSec = document.getElementById('projects');
                  if (workSec) workSec.scrollIntoView({ behavior: 'smooth' });
                }}
                onBrowseThemes={() => {
                  const themeSec = document.getElementById('themes');
                  if (themeSec) themeSec.scrollIntoView({ behavior: 'smooth' });
                }}
                isEditMode={isVisualEditMode}
                onStateUpdate={handleStateUpdate}
              />
            );
          case 'target':
            return (
              <TargetSection
                key="target"
                isEditMode={isVisualEditMode}
                onStateUpdate={handleStateUpdate}
              />
            );
          case 'projects':
            return <PortfolioGrid key="projects" isMobile={isMobile} isEditMode={isVisualEditMode} onStateUpdate={handleStateUpdate} />;
          case 'themes':
            return (
              <TemplateCatalog
                key="themes"
                onSelectDemo={handleSelectDemo}
                onOrderTheme={handleOrderTheme}
                isEditMode={isVisualEditMode}
                onStateUpdate={handleStateUpdate}
              />
            );
          case 'services':
            return <Services key="services" onOrderBespoke={handleOrderBespoke} isEditMode={isVisualEditMode} onStateUpdate={handleStateUpdate} />;
          case 'contact':
            return <ContactForm key="contact" presetMessage={presetContactMessage} isEditMode={isVisualEditMode} onStateUpdate={handleStateUpdate} />;
          default:
            return null;
        }
      })}

      <Footer onAdminClick={() => setIsAdminOpen(true)} isEditMode={isVisualEditMode} onStateUpdate={handleStateUpdate} />

      {/* Dynamic Floating Bottom Tab Navigation for Mobile */}
      {isMobile && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 32px)',
            maxWidth: '460px',
            height: '64px',
            borderRadius: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.08)',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '0 8px',
            zIndex: 200,
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {activeNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleBottomNavClick(item.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'none',
                  border: 'none',
                  color: isActive ? '#2563eb' : '#64748b',
                  gap: '4px',
                  cursor: 'pointer',
                  padding: '8px 12px',
                  borderRadius: '12px',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isActive ? 'scale(1.08)' : 'scale(1)',
                }}
              >
                <Icon size={isActive ? 20 : 18} style={{ strokeWidth: isActive ? 2.5 : 2, transition: 'all 0.2s' }} />
                <span style={{ fontSize: '10px', fontWeight: isActive ? 700 : 500, letterSpacing: '0.2px' }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Floating Admin Trigger Gear Icon Button */}
      <button
        onClick={() => setIsAdminOpen(true)}
        style={{
          position: 'fixed',
          bottom: isMobile ? '96px' : '24px',
          right: isMobile ? '16px' : '24px',
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          boxShadow: '0 10px 15px -3px rgba(15,23,42,0.1), 0 4px 6px -4px rgba(15,23,42,0.1)',
          color: '#475569',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 150,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08) rotate(90deg)';
          e.currentTarget.style.color = '#2563eb';
          e.currentTarget.style.borderColor = '#2563eb';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
          e.currentTarget.style.color = '#475569';
          e.currentTarget.style.borderColor = '#e2e8f0';
        }}
      >
        <Settings size={22} />
      </button>

      {/* Full Screen Admin Dashboard */}
      {isAdminOpen && (
        <AdminDashboard
          onClose={() => setIsAdminOpen(false)}
          onStateUpdate={handleStateUpdate}
          onToggleVisualEdit={() => {
            setIsAdminOpen(false);
            setIsVisualEditMode(true);
          }}
        />
      )}

      {/* Immersive View iframe preview for templates */}
      {activeDemoUrl && (
        <DemoViewer
          demoUrl={activeDemoUrl}
          themeName={activeDemoName}
          onClose={handleCloseDemo}
          onOrder={(themeName) => {
            handleCloseDemo();
            handleOrderTheme(themeName);
          }}
        />
      )}
    </div>
  );
}

export default App;
