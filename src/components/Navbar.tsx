import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { EditableText } from './EditableText';
import { useMobile } from '../hooks/useMobile';

interface NavbarProps {
  onOrderClick: () => void;
  isEditMode?: boolean;
  onStateUpdate?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOrderClick, isEditMode, onStateUpdate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Хийсэн Төслүүд', href: '#projects' },
    { name: 'Бэлэн Загварууд', href: '#themes' },
    { name: 'Үйлчилгээ & Тариф', href: '#services' },
    { name: 'Холбоо Барих', href: '#contact' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        
        // Premium scroll-following pill styling
        width: isScrolled ? (isMobile ? 'calc(100% - 24px)' : 'calc(100% - 48px)') : '100%',
        maxWidth: isScrolled ? '1200px' : '100%',
        top: isScrolled
          ? (isEditMode ? '80px' : '20px')
          : (isEditMode ? '60px' : '0px'),
        borderRadius: isScrolled ? '24px' : '0px',
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
        border: isScrolled ? '1px solid rgba(226, 232, 240, 0.8)' : '1px solid transparent',
        boxShadow: isScrolled ? '0 20px 25px -5px rgba(15, 23, 42, 0.05), 0 8px 10px -6px rgba(15, 23, 42, 0.05)' : 'none',
        padding: isScrolled ? (isMobile ? '10px 16px' : '14px 24px') : (isMobile ? '16px 12px' : '24px 0'),
      }}
    >
      <div 
        className="container flex justify-between items-center" 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          width: isScrolled ? '100%' : undefined
        }}
      >
        {/* Logo */}
        <a
          href="#"
          className="text-xl font-bold font-display tracking-tight text-slate-900 flex items-center gap-1.5"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', color: '#0f172a' }}
        >
          <span
            className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold"
            style={{
              width: isMobile ? '28px' : '32px',
              height: isMobile ? '28px' : '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: isMobile ? '14px' : '16px'
            }}
          >
            T
          </span>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: isMobile ? '18px' : '20px', letterSpacing: '-0.5px' }}>
            <EditableText
              storeKey="navbar.brand"
              defaultValue="TSOLMON"
              isEditMode={!!isEditMode}
              onStateUpdate={onStateUpdate}
            />
            <span style={{ color: '#2563eb' }}>.</span>
          </span>
        </a>

        {/* Desktop Nav Links vs Mobile CTA */}
        {!isMobile ? (
          <nav
            className="hidden md:flex items-center gap-8"
            style={{ display: 'flex', alignItems: 'center', gap: '32px' }}
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                style={{
                  textDecoration: 'none',
                  color: '#475569',
                  fontSize: '14px',
                  fontWeight: 500,
                  transition: 'color 0.2s ease-in-out'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#2563eb')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#475569')}
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={onOrderClick}
              className="btn btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
                color: '#fff',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <EditableText
                storeKey="navbar.cta"
                defaultValue="Вэбсайт Захиалах"
                isEditMode={!!isEditMode}
                onStateUpdate={onStateUpdate}
                style={{ color: '#ffffff' }}
              /> <ArrowUpRight size={14} />
            </button>
          </nav>
        ) : (
          <button
            onClick={onOrderClick}
            className="btn btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
              color: '#fff',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Захиалах <ArrowUpRight size={12} />
          </button>
        )}
      </div>
    </header>
  );
};
