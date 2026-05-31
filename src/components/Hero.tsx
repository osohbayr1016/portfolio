import React from 'react';
import { ArrowRight, Code2, ShieldCheck, Zap } from 'lucide-react';
import { EditableText } from './EditableText';
import { useMobile } from '../hooks/useMobile';

interface HeroProps {
  onExploreWork: () => void;
  onBrowseThemes: () => void;
  isEditMode?: boolean;
  onStateUpdate?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onBrowseThemes, isEditMode, onStateUpdate }) => {
  const isMobile = useMobile();

  return (
    <section
      id="hero"
      className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-slate-50/50 border-b border-slate-200/50"
      style={{
        position: 'relative',
        paddingTop: isMobile ? '110px' : '160px',
        paddingBottom: isMobile ? '56px' : '96px',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        borderBottom: '1px solid #e2e8f0',
        overflow: 'hidden'
      }}
    >
      {/* Subtle Dot Grid Background */}
      <div className="dot-pattern" />

      {/* Radial Gradient overlay for soft premium depth */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          background: 'radial-gradient(circle at 50% 30%, rgba(37, 99, 235, 0.03) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container relative z-10 text-center animate-fade-in" style={{ textAlign: 'center' }}>
        {/* Availability Badge */}
        <div
          className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-semibold border border-emerald-200 mb-8"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#ecfdf5',
            color: '#047857',
            padding: '6px 14px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: 600,
            border: '1px solid #a7f3d0',
            marginBottom: isMobile ? '20px' : '32px'
          }}
        >
          <span
            className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              display: 'inline-block'
            }}
          />
          <EditableText
            storeKey="hero.badge"
            defaultValue="Шинэ захиалга авах боломжтой (2026 оны 6-р сар)"
            isEditMode={!!isEditMode}
            onStateUpdate={onStateUpdate}
          />
        </div>

        {/* Hero Title */}
        <h1
          className="text-4xl md:text-6xl font-bold font-display tracking-tight text-slate-900 mb-6 max-w-4xl mx-auto leading-tight"
          style={{
            fontSize: isMobile ? '32px' : 'clamp(36px, 6vw, 64px)',
            fontWeight: 800,
            lineHeight: isMobile ? 1.25 : 1.15,
            letterSpacing: isMobile ? '-0.8px' : '-1.5px',
            color: '#0f172a',
            maxWidth: '900px',
            margin: isMobile ? '0 auto 16px auto' : '0 auto 24px auto'
          }}
        >
          <EditableText
            storeKey="hero.title_part1"
            defaultValue="Бизнесийн борлуулалтыг нэмэгдүүлэх "
            isEditMode={!!isEditMode}
            onStateUpdate={onStateUpdate}
          />
          <EditableText
            storeKey="hero.title_part2"
            defaultValue="өндөр хурдны вэбсайтуудыг бүтээнэ."
            isEditMode={!!isEditMode}
            onStateUpdate={onStateUpdate}
            style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline'
            }}
          />
        </h1>

        {/* Hero Subtitle */}
        <EditableText
          storeKey="hero.subtitle"
          defaultValue="Би таны бизнесийн онцлогт тохирсон өндөр зэрэглэлийн вэб системүүдийг хөгжүүлж, маш богино хугацаанд бэлэн болох орчин үеийн загваруудыг санал болгож байна. Гайхалтай хурд, хялбар шийдэл."
          isEditMode={!!isEditMode}
          onStateUpdate={onStateUpdate}
          tagName="p"
          className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{
            fontSize: isMobile ? '14.5px' : 'clamp(16px, 2.5vw, 19px)',
            color: '#475569',
            lineHeight: 1.6,
            maxWidth: '780px',
            margin: isMobile ? '0 auto 24px auto' : '0 auto 40px auto'
          }}
        />

        {/* Actions buttons */}
        <div
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16"
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'center',
            alignItems: isMobile ? 'stretch' : 'center',
            gap: '12px',
            maxWidth: isMobile ? '280px' : 'none',
            margin: isMobile ? '0 auto 40px auto' : '0 auto 64px auto'
          }}
        >
          <button
            onClick={onBrowseThemes}
            className="btn btn-primary"
            style={{
              fontSize: '15px',
              padding: '14px 28px',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
              color: '#fff',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%'
            }}
          >
            Бэлэн загварууд & Демо үзэх <ArrowRight size={16} />
          </button>
          <button
            onClick={onExploreWork}
            className="btn btn-secondary"
            style={{
              fontSize: '15px',
              padding: '14px 28px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              background: '#ffffff',
              color: '#0f172a',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%'
            }}
          >
            Хийсэн ажлууд үзэх
          </button>
        </div>

        {/* Small Micro-benefits Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto border-t border-slate-200/80 pt-10 text-left"
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: isMobile ? '20px' : '24px',
            maxWidth: '850px',
            margin: '0 auto',
            borderTop: '1px solid #e2e8f0',
            paddingTop: isMobile ? '24px' : '40px',
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <Zap style={{ color: '#2563eb', flexShrink: 0 }} size={20} />
            <div>
              <EditableText
                storeKey="hero.benefit1_title"
                defaultValue="Гайхалтай хурд"
                isEditMode={!!isEditMode}
                onStateUpdate={onStateUpdate}
                tagName="h4"
                style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}
              />
              <EditableText
                storeKey="hero.benefit1_desc"
                defaultValue="Вэбсайтыг 1 секунд хүрэхгүй хугацаанд ачаалж, хэрэглэгчийг хүлээлгэхгүй."
                isEditMode={!!isEditMode}
                onStateUpdate={onStateUpdate}
                tagName="p"
                style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <Code2 style={{ color: '#2563eb', flexShrink: 0 }} size={20} />
            <div>
              <EditableText
                storeKey="hero.benefit2_title"
                defaultValue="Дээд зэргийн чанар"
                isEditMode={!!isEditMode}
                onStateUpdate={onStateUpdate}
                tagName="h4"
                style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}
              />
              <EditableText
                storeKey="hero.benefit2_desc"
                defaultValue="Вэбсайт бүтээгч програмууд ашиглалгүйгээр гараар бичсэн цэвэрхэн код."
                isEditMode={!!isEditMode}
                onStateUpdate={onStateUpdate}
                tagName="p"
                style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <ShieldCheck style={{ color: '#2563eb', flexShrink: 0 }} size={20} />
            <div>
              <EditableText
                storeKey="hero.benefit3_title"
                defaultValue="Хайлтын оновчлол (SEO)"
                isEditMode={!!isEditMode}
                onStateUpdate={onStateUpdate}
                tagName="h4"
                style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}
              />
              <EditableText
                storeKey="hero.benefit3_desc"
                defaultValue="Гүүглэд дээгүүр илрэх бүтэцтэй кодчилол болон хайлтын оновчлол."
                isEditMode={!!isEditMode}
                onStateUpdate={onStateUpdate}
                tagName="p"
                style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
