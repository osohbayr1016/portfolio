import { projects as defaultProjects } from './projects';
import type { Project } from './projects';
import { templates as defaultTemplates } from './templates';
import type { TemplateTheme } from './templates';

const LAYOUT_KEY = 'tsolmon_portfolio_layout';
const PROJECTS_KEY = 'tsolmon_portfolio_projects';
const TEMPLATES_KEY = 'tsolmon_portfolio_templates';

const DEFAULT_LAYOUT = ['hero', 'target', 'projects', 'themes', 'services', 'contact'];

export const store = {
  // --- Homepage Layout Section Order ---
  getHomeLayout(): string[] {
    const data = localStorage.getItem(LAYOUT_KEY);
    if (!data) {
      localStorage.setItem(LAYOUT_KEY, JSON.stringify(DEFAULT_LAYOUT));
      return DEFAULT_LAYOUT;
    }
    try {
      const parsed = JSON.parse(data) as string[];
      // Dynamic Migration: If any section from DEFAULT_LAYOUT is missing from saved localStorage state, inject it automatically
      const missing = DEFAULT_LAYOUT.filter(sec => !parsed.includes(sec));
      if (missing.length > 0) {
        let updated = [...parsed];
        missing.forEach(sec => {
          if (sec === 'target') {
            const heroIdx = updated.indexOf('hero');
            if (heroIdx !== -1) {
              updated.splice(heroIdx + 1, 0, 'target');
            } else {
              updated.unshift('target');
            }
          } else {
            updated.push(sec);
          }
        });
        localStorage.setItem(LAYOUT_KEY, JSON.stringify(updated));
        return updated;
      }
      return parsed;
    } catch {
      return DEFAULT_LAYOUT;
    }
  },

  saveHomeLayout(sections: string[]): void {
    localStorage.setItem(LAYOUT_KEY, JSON.stringify(sections));
  },

  resetHomeLayout(): string[] {
    localStorage.setItem(LAYOUT_KEY, JSON.stringify(DEFAULT_LAYOUT));
    return DEFAULT_LAYOUT;
  },

  // --- Portfolio Custom Projects CRUD ---
  getProjects(): Project[] {
    const data = localStorage.getItem(PROJECTS_KEY);
    if (!data) {
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(defaultProjects));
      return defaultProjects;
    }
    try {
      return JSON.parse(data);
    } catch {
      return defaultProjects;
    }
  },

  saveProjects(projectsList: Project[]): void {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projectsList));
  },

  // --- Pre-made Templates Catalog CRUD ---
  getTemplates(): TemplateTheme[] {
    const data = localStorage.getItem(TEMPLATES_KEY);
    if (!data) {
      localStorage.setItem(TEMPLATES_KEY, JSON.stringify(defaultTemplates));
      return defaultTemplates;
    }
    try {
      return JSON.parse(data);
    } catch {
      return defaultTemplates;
    }
  },

  saveTemplates(templatesList: TemplateTheme[]): void {
    localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templatesList));
  },

  // --- Inline Site Text Editing ---
  getSiteText(key: string, defaultValue: string): string {
    const saved = localStorage.getItem(`tsolmon_portfolio_text_${key}`);
    return saved !== null ? saved : defaultValue;
  },

  saveSiteText(key: string, value: string): void {
    localStorage.setItem(`tsolmon_portfolio_text_${key}`, value);
  },

  resetSiteTexts(): void {
    const prefix = 'tsolmon_portfolio_text_';
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (k && k.startsWith(prefix)) {
        localStorage.removeItem(k);
      }
    }
  }
};
