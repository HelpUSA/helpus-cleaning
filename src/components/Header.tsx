import React from 'react';
import { Language, translations } from '../i18n/translations';
import { Sparkles, Calendar, Smartphone, Cloud, Globe, ShieldCheck, KeyRound } from 'lucide-react';

interface HeaderProps {
  currentTab: 'landing' | 'pms' | 'resort' | 'portal' | 'cleaner';
  onTabChange: (tab: 'landing' | 'pms' | 'resort' | 'portal' | 'cleaner') => void;
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
      <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-sky-500/10 border-b border-slate-800/80 px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-amber-400">cleaning.helpusbr.com</span>
            <span className="text-slate-500">•</span>
            <span className="truncate max-w-[200px] sm:max-w-none">{t.taglineLocation}</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-slate-400 text-[10px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <Cloud className="w-3.5 h-3.5" /> Edge Cloudflare (200 OK)
            </span>
            <span className="hidden sm:flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> {t.superadminMaster}
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Navigation */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        {/* HelpUS Official Logo & Brand */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <img
            src="/logo.png"
            alt="HelpUS Logo"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-amber-400/80 shadow-md shadow-amber-400/10"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 font-extrabold text-lg sm:text-xl tracking-tight leading-none">
              <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded shadow-sm text-sm sm:text-base">HELPUS</span>
              <span className="text-amber-400 font-black text-sm sm:text-base">CLEANING</span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium tracking-tight mt-0.5 hidden xs:block">
              {t.brandSubtitle}
            </span>
          </div>
        </div>

        {/* Unified System Navigation Switcher (Fully responsive overflow/wrap) */}
        <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 shadow-inner max-w-full overflow-x-auto">
          <button
            onClick={() => onTabChange('landing')}
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              currentTab === 'landing'
                ? 'bg-amber-400 text-slate-950 shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.navPresentation}</span>
          </button>
          <button
            onClick={() => onTabChange('pms')}
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              currentTab === 'pms'
                ? 'bg-amber-400 text-slate-950 shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-sky-400" />
            <span>{t.navPms}</span>
          </button>
          <button
            onClick={() => onTabChange('resort')}
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              currentTab === 'resort'
                ? 'bg-amber-400 text-slate-950 shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.navHousekeeping}</span>
          </button>
          <button
            onClick={() => onTabChange('portal')}
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              currentTab === 'portal'
                ? 'bg-purple-500 text-white shadow'
                : 'text-purple-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 text-purple-400" />
            <span>{t.navPortal}</span>
          </button>
          <button
            onClick={() => onTabChange('cleaner')}
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              currentTab === 'cleaner'
                ? 'bg-sky-500 text-slate-950 shadow'
                : 'text-sky-400 hover:text-sky-300 hover:bg-slate-800'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{t.navCleanerApp}</span>
          </button>
        </div>

        {/* Right Tools: i18n & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* i18n Selector with Flag Badges */}
          <div className="flex items-center gap-0.5 sm:gap-1 bg-slate-900 border border-slate-800 rounded-lg p-0.5 sm:p-1 text-xs">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-1 hidden xs:block" />
            <button
              onClick={() => onLangChange('pt')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition ${
                lang === 'pt' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
              title="Português"
            >
              🇧🇷 PT
            </button>
            <button
              onClick={() => onLangChange('en')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition ${
                lang === 'en' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
              title="English"
            >
              🇺🇸 EN
            </button>
            <button
              onClick={() => onLangChange('es')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition ${
                lang === 'es' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
              title="Español"
            >
              🇪🇸 ES
            </button>
          </div>

          {/* User / Google Profile */}
          {user ? (
            <div
              onClick={onLogin}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800/80 cursor-pointer border border-slate-800 rounded-lg py-1 px-2 sm:px-2.5 transition shadow-sm"
              title={t.loginAsRoleLabel}
            >
              <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full border border-amber-400/50 object-cover" />
              <div className="hidden md:block text-left text-xs leading-tight">
                <p className="font-semibold text-slate-200">{user.name}</p>
                <p className="text-[10px] text-amber-400">{user.email}</p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onLogout();
                }}
                className="text-xs text-slate-400 hover:text-red-400 ml-1 p-0.5 transition"
                title={t.close}
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={onLogin}
              className="flex items-center gap-1.5 sm:gap-2 bg-white hover:bg-slate-100 text-slate-900 font-bold px-2.5 sm:px-3 py-1.5 rounded-lg text-xs shadow-sm transition"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span className="hidden sm:inline">{t.loginWithGoogle}</span>
              <span className="sm:hidden">Google</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
