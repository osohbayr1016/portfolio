import React, { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle2, Mail, MessageSquare } from 'lucide-react';
import { store } from '../data/store';
import { EditableText } from './EditableText';
import { useMobile } from '../hooks/useMobile';

interface ContactFormProps {
  presetMessage: string;
  isEditMode?: boolean;
  onStateUpdate?: () => void;
}

interface FormState {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ presetMessage, isEditMode, onStateUpdate }) => {
  const isMobile = useMobile();
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    projectType: 'theme',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync preset message when user clicks order button
  useEffect(() => {
    if (presetMessage) {
      setFormData((prev) => ({
        ...prev,
        projectType: presetMessage.toLowerCase().includes('bespoke') ? 'custom' : 'theme',
        message: presetMessage
      }));

      // Focus the text area or name input
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  }, [presetMessage]);

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Та бүтэн нэрээ оруулна уу';
    
    if (!formData.email.trim()) {
      tempErrors.email = 'И-мэйл хаяг шаардлагатай';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = 'Зөв и-мэйл хаяг оруулна уу';
    }
    
    if (!formData.message.trim()) tempErrors.message = 'Төслийн дэлгэрэнгүй мэдээлэл шаардлагатай';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error dynamically
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate database send or email action (400ms)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', projectType: 'theme', message: '' });
    }, 1200);
  };

  const emailVal = store.getSiteText('contact.email_val', 'tsolmon@developer.com');
  const telegramVal = store.getSiteText('contact.telegram_val', '@tsolmon_dev');

  return (
    <section id="contact" style={{ padding: isMobile ? '48px 0' : '100px 0', backgroundColor: '#ffffff', position: 'relative' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))', gap: isMobile ? '32px' : '64px', alignItems: 'flex-start' }}>
        
        {/* Left Side: Contact details */}
        <div>
          <EditableText
            storeKey="contact.badge"
            defaultValue="Холбоо Барих"
            isEditMode={!!isEditMode}
            onStateUpdate={onStateUpdate}
            tagName="span"
            style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#2563eb', letterSpacing: '2px', display: 'block', marginBottom: '12px' }}
          />
          <EditableText
            storeKey="contact.title"
            defaultValue="Хамтдаа вэбсайт бүтээцгээе."
            isEditMode={!!isEditMode}
            onStateUpdate={onStateUpdate}
            tagName="h2"
            style={{ fontSize: isMobile ? '26px' : '36px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', fontFamily: 'Outfit, sans-serif' }}
          />
          <EditableText
            storeKey="contact.description"
            defaultValue="Танд хөгжүүлэхийг хүсэж буй төсөл эсвэл бэлэн загвар байна уу? Шаардлагуудаа илгээнэ үү. Би 4 ажлын цагийн дотор хариу мэдэгдэж, зөвлөх болно."
            isEditMode={!!isEditMode}
            onStateUpdate={onStateUpdate}
            tagName="p"
            style={{ fontSize: isMobile ? '14px' : '15px', color: '#475569', lineHeight: 1.5, marginBottom: isMobile ? '24px' : '40px' }}
          />

          {/* Quick contact rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: isMobile ? '32px' : '48px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size={18} />
              </div>
              <div>
                <EditableText
                  storeKey="contact.email_label"
                  defaultValue="Шууд И-мэйл"
                  isEditMode={!!isEditMode}
                  onStateUpdate={onStateUpdate}
                  tagName="span"
                  style={{ fontSize: '11px', color: '#94a3b8', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}
                />
                <a href={`mailto:${emailVal}`} style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a', textDecoration: 'none' }}>
                  <EditableText
                    storeKey="contact.email_val"
                    defaultValue="tsolmon@developer.com"
                    isEditMode={!!isEditMode}
                    onStateUpdate={onStateUpdate}
                  />
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageSquare size={18} />
              </div>
              <div>
                <EditableText
                  storeKey="contact.telegram_label"
                  defaultValue="Телеграм суваг"
                  isEditMode={!!isEditMode}
                  onStateUpdate={onStateUpdate}
                  tagName="span"
                  style={{ fontSize: '11px', color: '#94a3b8', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}
                />
                <a href={`https://t.me/${telegramVal.replace('@', '')}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a', textDecoration: 'none' }}>
                  <EditableText
                    storeKey="contact.telegram_val"
                    defaultValue="@tsolmon_dev"
                    isEditMode={!!isEditMode}
                    onStateUpdate={onStateUpdate}
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Social icons */}
          <div style={{ marginBottom: isMobile ? '24px' : '0' }}>
            <EditableText
              storeKey="contact.social_title"
              defaultValue="Сошиал Хаягууд"
              isEditMode={!!isEditMode}
              onStateUpdate={onStateUpdate}
              tagName="h5"
              style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', marginBottom: '16px', letterSpacing: '0.5px' }}
            />

            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="#" style={{ color: '#475569', transition: 'color 0.2s', display: 'inline-flex', alignItems: 'center' }} onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'} onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}>
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/></svg>
              </a>
              <a href="#" style={{ color: '#475569', transition: 'color 0.2s', display: 'inline-flex', alignItems: 'center' }} onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'} onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}>
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Form details */}
        <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: isMobile ? '24px 20px' : '40px', boxShadow: 'var(--shadow-md)' }}>
          {isSuccess ? (
            <div style={{ textAlign: 'center', padding: '32px 0', animation: 'successPop 0.4s ease-out' }}>
              <CheckCircle2 size={56} style={{ color: '#10b981', margin: '0 auto 20px auto' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                Зурвас Амжилттай Илгээгдлээ!
              </h3>
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5, marginBottom: '24px' }}>
                Надтай холбогдсонд баярлалаа. Би таны төслийн шаардлагуудыг хүлээн авлаа. Тантай тун удахгүй холбогдох болно!
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="btn btn-secondary"
                style={{ fontSize: '13px', padding: '8px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: 'pointer' }}
              >
                Дахин зурвас илгээх
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Name */}
              <div>
                <label htmlFor="name" style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', display: 'block', marginBottom: '6px' }}>Таны Нэр</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Жишээ нь: Болд Баяр"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: errors.name ? '1px solid #ef4444' : '1px solid #cbd5e1',
                    fontSize: '14px',
                    backgroundColor: '#ffffff',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = errors.name ? '#ef4444' : '#cbd5e1'}
                />
                {errors.name && <span style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px', display: 'block' }}>{errors.name}</span>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', display: 'block', marginBottom: '6px' }}>И-мэйл Хаяг</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="bold@компани.мн"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: errors.email ? '1px solid #ef4444' : '1px solid #cbd5e1',
                    fontSize: '14px',
                    backgroundColor: '#ffffff',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = errors.email ? '#ef4444' : '#cbd5e1'}
                />
                {errors.email && <span style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
              </div>

              {/* Project Type */}
              <div>
                <label htmlFor="projectType" style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', display: 'block', marginBottom: '6px' }}>Төслийн Төрөл</label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    backgroundColor: '#ffffff',
                    outline: 'none'
                  }}
                >
                  <option value="theme">Бэлэн Загвар Тохируулах</option>
                  <option value="custom">Бүрэн Захиалгат Вэбсайт</option>
                  <option value="consult">Техникийн зөвлөгөө / Бусад</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', display: 'block', marginBottom: '6px' }}>Төслийн Дэлгэрэнгүй Мэдээлэл</label>
                <textarea
                  id="message"
                  name="message"
                  ref={textareaRef}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Өөрийн зорилго, хугацаа, эсвэл захиалахыг хүсэж буй загварын нэрийг бичнэ үү..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: errors.message ? '1px solid #ef4444' : '1px solid #cbd5e1',
                    fontSize: '14px',
                    backgroundColor: '#ffffff',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = errors.message ? '#ef4444' : '#cbd5e1'}
                />
                {errors.message && <span style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px', display: 'block' }}>{errors.message}</span>}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
                  color: '#ffffff'
                }}
              >
                {isSubmitting ? (
                  'Илгээж байна...'
                ) : (
                  <>
                    Төслийн Захиалга Илгээх <Send size={14} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
      <style>{`
        @keyframes successPop {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
};
