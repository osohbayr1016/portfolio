import React, { useState, useEffect, useRef } from 'react';
import { store } from '../data/store';

interface EditableTextProps {
  storeKey: string;
  defaultValue: string;
  isEditMode: boolean;
  onStateUpdate?: () => void;
  tagName?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div';
  style?: React.CSSProperties;
  className?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({
  storeKey,
  defaultValue,
  isEditMode,
  onStateUpdate,
  tagName = 'span',
  style,
  className
}) => {
  const [text, setText] = useState(() => store.getSiteText(storeKey, defaultValue));
  const elementRef = useRef<HTMLElement>(null);

  // Sync component state when the key or default changes
  useEffect(() => {
    setText(store.getSiteText(storeKey, defaultValue));
  }, [storeKey, defaultValue]);

  const handleBlur = () => {
    if (!elementRef.current) return;
    const newText = elementRef.current.innerText.trim();
    if (newText && newText !== text) {
      setText(newText);
      store.saveSiteText(storeKey, newText);
      if (onStateUpdate) {
        onStateUpdate();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Save on Enter (but allow shift+Enter for multi-line if editing a paragraph or header)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      elementRef.current?.blur();
    }
  };

  const Tag = tagName;

  if (isEditMode) {
    return (
      <Tag
        ref={elementRef as any}
        contentEditable
        suppressContentEditableWarning
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`${className || ''} visual-editable`}
        style={{
          outline: 'none',
          border: '1.5px dashed #2563eb',
          borderRadius: '4px',
          padding: '2px 6px',
          backgroundColor: 'rgba(37, 99, 235, 0.04)',
          cursor: 'text',
          position: 'relative',
          display: tagName === 'span' ? 'inline-block' : undefined,
          transition: 'all 0.2s ease',
          boxShadow: '0 0 0 2px rgba(37, 99, 235, 0.1)',
          ...style
        }}
        title="Засахын тулд товшиж бичнэ үү"
      >
        {text}
      </Tag>
    );
  }

  return (
    <Tag className={className} style={style}>
      {text}
    </Tag>
  );
};
