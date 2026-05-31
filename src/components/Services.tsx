import React from 'react';
import { EditableText } from './EditableText';
import { useMobile } from '../hooks/useMobile';

interface ServicesProps {
  onOrderBespoke: () => void;
  isEditMode?: boolean;
  onStateUpdate?: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOrderBespoke, isEditMode, onStateUpdate }) => {
  const isMobile = useMobile();

  return (
    <section id="services" style={{ padding: isMobile ? '48px 0' : '80px 0', borderBottom: '1px solid #e2e8f0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '32px' : '64px' }}>
          <EditableText
            storeKey="services.badge"
            defaultValue="Үйлчилгээ & Тариф"
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
            storeKey="services.title"
            defaultValue="Ил тод үнийн санал, гайхалтай чанар."
            isEditMode={!!isEditMode}
            onStateUpdate={onStateUpdate}
            tagName="h2"
            style={{ fontSize: isMobile ? '26px' : '32px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}
          />
          <EditableText
            storeKey="services.description"
            defaultValue="Та бэлэн загварыг өөртөө тохируулан авах эсвэл цоо шинэ вэбсистемийг эхнээс нь хийлгэх байсан ч бид танд тохирох шийдлийг санал болгоно."
            isEditMode={!!isEditMode}
            onStateUpdate={onStateUpdate}
            tagName="p"
            style={{ fontSize: isMobile ? '14px' : '16px', color: '#475569', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}
          />
        </div>

        {/* Pricing Tiers Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: isMobile ? '20px' : '32px',
            marginBottom: isMobile ? '40px' : '64px'
          }}
        >
          {/* Theme Package */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: isMobile ? '28px 20px' : '40px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-md)',
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
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', backgroundColor: '#f1f5f9', padding: '4px 8px', borderRadius: '4px' }}>
                Шуурхай шийдэл
              </span>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginTop: '16px', marginBottom: '8px' }}>
                Бэлэн Загвар Тохируулах
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
                Өөрийн брэнд өнгө төрхийг шингээсэн гоёмсог загварыг хэдхэн хоногт багтаан ажиллуулж эхэлнэ.
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', marginBottom: '32px' }}>
                <span style={{ fontSize: isMobile ? '28px' : '36px', fontWeight: 800, color: '#0f172a' }}>1,300,000 ₮ - 1,800,000 ₮</span>
                <span style={{ fontSize: '14px', color: '#64748b', marginLeft: '6px' }}>/нэг удаа</span>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', borderTop: '1px solid #f1f5f9', paddingTop: '24px' }}>
                <li style={{ fontSize: '14px', color: '#475569', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> Брэнд өнгө төрх болон үсгийн фонт тохиргоо
                </li>
                <li style={{ fontSize: '14px', color: '#475569', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> Бизнесийн мэдээлэл болон зураг, текстийг оруулах
                </li>
                <li style={{ fontSize: '14px', color: '#475569', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> Гар утсанд зохицох харагдац болон хурдны шалгалт
                </li>
                <li style={{ fontSize: '14px', color: '#475569', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> Домэйн хаяг холбох болон вэбийг найдвартай ажиллуулах
                </li>
              </ul>
            </div>
            
            <a
              href="#themes"
              className="btn btn-secondary"
              style={{ textAlign: 'center', width: '100%', padding: '12px', display: 'block', textDecoration: 'none', fontWeight: 600 }}
            >
              Загвар & Демо сонгох
            </a>
          </div>

          {/* Bespoke Custom Package */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '2px solid #2563eb',
              borderRadius: '16px',
              padding: isMobile ? '28px 20px' : '40px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-lg)',
              position: 'relative',
              transition: 'var(--transition-smooth)'
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(-4px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#2563eb', color: '#ffffff', fontSize: '10px', fontWeight: 700, padding: '4px 12px', borderRadius: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Хамгийн их сонгогддог
            </div>

            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#2563eb', backgroundColor: '#eff6ff', padding: '4px 8px', borderRadius: '4px' }}>
                Цогц Шийдэл
              </span>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginTop: '16px', marginBottom: '8px' }}>
                Бүрэн Захиалгат Вэбсайт
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
                Таны бизнесийн хэрэгцээнд тусгайлан зориулж, 100% шинээр дизайн болон кодыг гараар бичнэ.
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', marginBottom: '32px' }}>
                <span style={{ fontSize: isMobile ? '28px' : '36px', fontWeight: 800, color: '#0f172a' }}>3,500,000 ₮ -оос</span>
                <span style={{ fontSize: '14px', color: '#64748b', marginLeft: '6px' }}>/эхлэх үнэ</span>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', borderTop: '1px solid #f1f5f9', paddingTop: '24px' }}>
                <li style={{ fontSize: '14px', color: '#475569', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> Вэбийн дизайн болон зохиомжийг 100% тусгайлан гаргах
                </li>
                <li style={{ fontSize: '14px', color: '#475569', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> React/Vite/TypeScript эсвэл цэвэрхэн кодчилол
                </li>
                <li style={{ fontSize: '14px', color: '#475569', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> Тусгай вэб виджетүүд болон гоёмсог интерактив анимациуд
                </li>
                <li style={{ fontSize: '14px', color: '#475569', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> Хайлтын бүрэн оновчлол (SEO) болон хурдны дээд үзүүлэлт (100 оноо)
                </li>
              </ul>
            </div>
            
            <button
              onClick={onOrderBespoke}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px', fontWeight: 600, border: 'none' }}
            >
              Шинэ Төсөл Эхлүүлэх
            </button>
          </div>
        </div>

        {/* Development Process Steps */}
        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: isMobile ? '40px' : '64px' }}>
          <EditableText
            storeKey="services.process_title"
            defaultValue="Вэбсайт Кодлох Миний Процесс"
            isEditMode={!!isEditMode}
            onStateUpdate={onStateUpdate}
            tagName="h3"
            style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 800, color: '#0f172a', textAlign: 'center', marginBottom: isMobile ? '24px' : '40px' }}
          />
          
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: isMobile ? '16px' : '24px'
            }}
          >
            {/* Step 1 */}
            <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', fontWeight: 'bold' }}>1</div>
              <EditableText
                storeKey="services.step1_title"
                defaultValue="Зөвлөлдөх & Төлөвлөх"
                isEditMode={!!isEditMode}
                onStateUpdate={onStateUpdate}
                tagName="h4"
                style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}
              />
              <EditableText
                storeKey="services.step1_desc"
                defaultValue="Вэбсайтын зорилго, техникийн шаардлага, контент болон дизайны өнгө төрхийг тодорхойлно."
                isEditMode={!!isEditMode}
                onStateUpdate={onStateUpdate}
                tagName="p"
                style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}
              />
            </div>

            {/* Step 2 */}
            <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', fontWeight: 'bold' }}>2</div>
              <EditableText
                storeKey="services.step2_title"
                defaultValue="Дизайн & Зохиомж"
                isEditMode={!!isEditMode}
                onStateUpdate={onStateUpdate}
                tagName="h4"
                style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}
              />
              <EditableText
                storeKey="services.step2_desc"
                defaultValue="Таны брэндийг төгс илэрхийлэх вэб бүтцийг зохион бүтээж, дизайныг боловсруулна."
                isEditMode={!!isEditMode}
                onStateUpdate={onStateUpdate}
                tagName="p"
                style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}
              />
            </div>

            {/* Step 3 */}
            <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', fontWeight: 'bold' }}>3</div>
              <EditableText
                storeKey="services.step3_title"
                defaultValue="Кодлол & Оновчлол"
                isEditMode={!!isEditMode}
                onStateUpdate={onStateUpdate}
                tagName="h4"
                style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}
              />
              <EditableText
                storeKey="services.step3_desc"
                defaultValue="Цэвэрхэн код бичиж, хайлтын системийн (SEO) оновчлолыг хийж, хурдыг дээд цэгт нь хүргэнэ."
                isEditMode={!!isEditMode}
                onStateUpdate={onStateUpdate}
                tagName="p"
                style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}
              />
            </div>

            {/* Step 4 */}
            <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', fontWeight: 'bold' }}>4</div>
              <EditableText
                storeKey="services.step4_title"
                defaultValue="Вэб ажиллуулах"
                isEditMode={!!isEditMode}
                onStateUpdate={onStateUpdate}
                tagName="h4"
                style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}
              />
              <EditableText
                storeKey="services.step4_desc"
                defaultValue="Бэлэн болсон вэбсайтыг таны домэйн хаяг дээр холбож, дэлхийн хамгийн хурдан CDN сүлжээнд байршуулна."
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
