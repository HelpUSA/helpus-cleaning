import React from 'react';
import { Language, translations } from '../i18n/translations';
import { Sparkles, Calendar, Smartphone, Cloud, Globe, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  currentTab: 'pms' | 'resort' | 'cleaner';
  onTabChange: (tab: 'pms' | 'resort' | 'cleaner') => void;
  lang: Language;
  onLangChange: (lang: Language) => void;
  user: { name: string; email: string; avatar: string } | null;
  onLogin: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  lang,
  onLangChange,
  user,
  onLogin,
  onLogout
}) => {
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
      {/* Top Banner - System & Region Notice */}
      <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-sky-500/10 border-b border-slate-800/80 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-amber-400">cleaning.helpusbr.com</span>
            <span className="text-slate-500">•</span>
            <span>{t.taglineLocation}</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <Cloud className="w-3.5 h-3.5" /> Cloudflare Edge + Vercel (200 OK)
            </span>
            <span className="flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> SuperAdmin Master Ativo
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* HelpUS Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-extrabold text-xl tracking-tight">
            <span className="bg-amber-400 text-slate-950 px-2.5 py-1 rounded-md shadow-sm">HELPUS</span>
            <span className="text-amber-400 font-bold">CLEANING</span>
          </div>
          <span className="hidden lg:inline-block text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
            OwnerRez + ResortCleaning Unificado
          </span>
        </div>

        {/* Unified System Navigation Switcher */}
        <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800 shadow-inner">
          <button
            onClick={() => onTabChange('pms')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              currentTab === 'pms'
                ? 'bg-amber-400 text-slate-950 shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>{t.navPms}</span>
          </button>
          <button
            onClick={() => onTabChange('resort')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              currentTab === 'resort'
                ? 'bg-amber-400 text-slate-950 shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.navResortCleaning}</span>
          </button>
          <button
            onClick={() => onTabChange('cleaner')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              currentTab === 'cleaner'
                ? 'bg-sky-500 text-slate-950 shadow'
                : 'text-sky-400 hover:text-sky-300 hover:bg-slate-800'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>{t.navCleanerApp}</span>
          </button>
        </div>

        {/* Right Tools: i18n & User Profile */}
        <div className="flex items-center gap-3">
          {/* i18n Selector */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-1" />
            <button
              onClick={() => onLangChange('pt')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${lang === 'pt' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              PT
            </button>
            <button
              onClick={() => onLangChange('en')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${lang === 'en' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              EN
            </button>
            <button
              onClick={() => onLangChange('es')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${lang === 'es' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              ES
            </button>
          </div>

          {/* User / Google Profile */}
          {user ? (
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg py-1 px-2.5">
              <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full border border-amber-400/50" />
              <div className="hidden sm:block text-left text-xs leading-tight">
                <p className="font-semibold text-slate-200">{user.name}</p>
                <p className="text-[10px] text-amber-400">{user.email}</p>
              </div>
              <button
                onClick={onLogout}
                className="text-xs text-slate-400 hover:text-red-400 ml-1 transition"
                title="Desconectar"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={onLogin}
              className="flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 font-semibold px-3 py-1.5 rounded-lg text-xs shadow-sm transition"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>{t.loginWithGoogle}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
