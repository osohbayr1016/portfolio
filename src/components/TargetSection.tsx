import React from 'react';
import { EditableText } from './EditableText';
import { Wrench, Cpu, Lightbulb } from 'lucide-react';
import { useMobile } from '../hooks/useMobile';

interface TargetSectionProps {
  isEditMode?: boolean;
  onStateUpdate?: () => void;
}

export const TargetSection: React.FC<TargetSectionProps> = ({ isEditMode, onStateUpdate }) => {
  const isMobile = useMobile();

  return (
    <section id="target" style={{ padding: isMobile ? '48px 0' : '80px 0', borderBottom: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '32px' : '56px' }}>
          <EditableText
            storeKey="target.badge"
            defaultValue="Хэнд зориулагдсан бэ?"
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
            storeKey="target.title"
            defaultValue="Миний хөгжүүлдэг вэбүүд хэнд хамгийн сайн тохирох вэ?"
            isEditMode={!!isEditMode}
            onStateUpdate={onStateUpdate}
            tagName="h2"
            style={{ fontSize: isMobile ? '26px' : '32px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}
          />
          <EditableText
            storeKey="target.description"
            defaultValue="Таны бизнесийн хэрэгцээнд хамгийн сайн тохирох өндөр хурдны вэб болон технологийн шийдлийг санал болгож байна."
            isEditMode={!!isEditMode}
            onStateUpdate={onStateUpdate}
            tagName="p"
            style={{ fontSize: isMobile ? '14px' : '16px', color: '#475569', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}
          />
        </div>

        {/* 3-Column Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: isMobile ? '20px' : '32px'
          }}
        >
          {/* Card 1: Disappointed in previous developers */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: isMobile ? '20px' : '32px',
              transition: 'var(--transition-smooth)'
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#cbd5e1';
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }
            }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Wrench size={24} />
            </div>
            
            <EditableText
              storeKey="target.card1_title"
              defaultValue="Вэбсайтдаа сэтгэл дундуур байгаа хүмүүс"
              isEditMode={!!isEditMode}
              onStateUpdate={onStateUpdate}
              tagName="h3"
              style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}
            />
            
            <EditableText
              storeKey="target.card1_desc"
              defaultValue="Өмнө нь хувь хүн болон жижиг студиэр вэбсайт хийлгээд сэтгэл ханамжгүй үлдсэн, одоо байгаа вэбдээ сайжруулалт хийж, шинэ боломжууд (features) нэмэхийг хүсэж буй хүмүүст зориулагдсан."
              isEditMode={!!isEditMode}
              onStateUpdate={onStateUpdate}
              tagName="p"
              style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}
            />

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
              <li style={{ fontSize: '13.5px', color: '#475569', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> 
                <EditableText storeKey="target.card1_feat1" defaultValue="Одоо байгаа вэбийн алдаа засах" isEditMode={!!isEditMode} onStateUpdate={onStateUpdate} />
              </li>
              <li style={{ fontSize: '13.5px', color: '#475569', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> 
                <EditableText storeKey="target.card1_feat2" defaultValue="Шинэ боломж, функц нэмэх" isEditMode={!!isEditMode} onStateUpdate={onStateUpdate} />
              </li>
              <li style={{ fontSize: '13.5px', color: '#475569', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> 
                <EditableText storeKey="target.card1_feat3" defaultValue="Дизайн болон хурдны шинэчлэл" isEditMode={!!isEditMode} onStateUpdate={onStateUpdate} />
              </li>
            </ul>
          </div>

          {/* Card 2: No website, needs automation */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: isMobile ? '20px' : '32px',
              transition: 'var(--transition-smooth)'
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#cbd5e1';
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }
            }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Cpu size={24} />
            </div>

            <EditableText
              storeKey="target.card2_title"
              defaultValue="Вэбгүйгээр амжилттай яваа бизнесүүд"
              isEditMode={!!isEditMode}
              onStateUpdate={onStateUpdate}
              tagName="h3"
              style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}
            />

            <EditableText
              storeKey="target.card2_desc"
              defaultValue="Вэбсайт ашиглахгүйгээр хангалттай борлуулалт хийж, үйл ажиллагаа явуулдаг ч өдөр тутмын гараар хийдэг ажлуудаа автоматжуулж, цаг хугацаа алддаг саад тотгороо бууруулахыг хүсэж буй хүмүүст."
              isEditMode={!!isEditMode}
              onStateUpdate={onStateUpdate}
              tagName="p"
              style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}
            />

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
              <li style={{ fontSize: '13.5px', color: '#475569', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> 
                <EditableText storeKey="target.card2_feat1" defaultValue="Гар ажиллагааг автоматжуулах" isEditMode={!!isEditMode} onStateUpdate={onStateUpdate} />
              </li>
              <li style={{ fontSize: '13.5px', color: '#475569', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> 
                <EditableText storeKey="target.card2_feat2" defaultValue="Үйл ажиллагааны саадыг багасгах" isEditMode={!!isEditMode} onStateUpdate={onStateUpdate} />
              </li>
              <li style={{ fontSize: '13.5px', color: '#475569', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> 
                <EditableText storeKey="target.card2_feat3" defaultValue="Ажлын үр ашгийг нэмэгдүүлэх" isEditMode={!!isEditMode} onStateUpdate={onStateUpdate} />
              </li>
            </ul>
          </div>

          {/* Card 3: IT / Tech startups */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: isMobile ? '20px' : '32px',
              transition: 'var(--transition-smooth)'
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#cbd5e1';
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }
            }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Lightbulb size={24} />
            </div>

            <EditableText
              storeKey="target.card3_title"
              defaultValue="Санаагаа бизнес болгох стартапууд"
              isEditMode={!!isEditMode}
              onStateUpdate={onStateUpdate}
              tagName="h3"
              style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}
            />

            <EditableText
              storeKey="target.card3_desc"
              defaultValue="IT болон технологийн салбарт өөрийн шинэ санаагаа бодит бизнес болгохыг хүсэж буй хүмүүст зориулж, тэдний санааг зах зээлд өрсөлдөхүйц технологийн шийдэл болгон чиглүүлж ажиллана."
              isEditMode={!!isEditMode}
              onStateUpdate={onStateUpdate}
              tagName="p"
              style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}
            />

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
              <li style={{ fontSize: '13.5px', color: '#475569', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> 
                <EditableText storeKey="target.card3_feat1" defaultValue="Санааг технологийн шийдэл болгох" isEditMode={!!isEditMode} onStateUpdate={onStateUpdate} />
              </li>
              <li style={{ fontSize: '13.5px', color: '#475569', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> 
                <EditableText storeKey="target.card3_feat2" defaultValue="MVP (Анхны загвар) хөгжүүлэх" isEditMode={!!isEditMode} onStateUpdate={onStateUpdate} />
              </li>
              <li style={{ fontSize: '13.5px', color: '#475569', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> 
                <EditableText storeKey="target.card3_feat3" defaultValue="Салбарын стандартын дагуу чиглүүлэх" isEditMode={!!isEditMode} onStateUpdate={onStateUpdate} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
