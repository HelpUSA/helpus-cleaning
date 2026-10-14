import React from 'react';
import { Language, translations } from '../i18n/translations';
import { ShieldCheck, HeartHandshake } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onOpenCookies: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenCookies }) => {
  const t = translations[lang];

  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-10 text-center text-xs text-slate-400 mt-20">
      <div className="max-w-6xl mx-auto px-4 space-y-4">
        {/* HelpUS Official Header Line with Logo */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <img src="/logo.png" alt="HelpUS Logo" className="w-8 h-8 rounded-full border border-amber-400" />
          <span className="bg-amber-400 text-slate-950 font-extrabold px-2 py-0.5 rounded text-[11px]">HELPUS LLC</span>
          <span className="font-semibold text-slate-300">{t.footerTitle}</span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-amber-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> {t.footerHub}
          </span>
        </div>

        {/* Official Contacts & Links */}
        <p className="text-slate-400">
          E-mail Oficial:{' '}
          <a href="mailto:helpus.ecommerce@gmail.com" className="text-amber-400 underline hover:text-amber-300">
            helpus.ecommerce@gmail.com
          </a>{' '}
          | Portal Principal:{' '}
          <a href="https://helpusbr.com" target="_blank" rel="noreferrer" className="text-sky-400 underline hover:text-sky-300">
            helpusbr.com
          </a>{' '}
          | Instagram:{' '}
          <a href="https://www.instagram.com/helpus.ecommerce" target="_blank" rel="noreferrer" className="text-pink-400 underline hover:text-pink-300">
            @helpus.ecommerce
          </a>
        </p>

        {/* Operational System Notice */}
        <p className="text-[11px] text-slate-500 max-w-2xl mx-auto leading-relaxed">
          {t.footerSubtitle}
        </p>

        {/* Legal & Cookie Policy Trigger */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 pt-3 text-slate-500 border-t border-slate-900">
          <button
            onClick={onOpenCookies}
            className="hover:text-amber-400 hover:underline transition flex items-center gap-1.5"
          >
            🍪 {t.cookieSettings}
          </button>
          <span>•</span>
          <span className="text-slate-500">
            cleaning.helpusbr.com — {t.allRightsReserved} © {new Date().getFullYear()}
          </span>
          <span>•</span>
          <span className="text-emerald-500 flex items-center gap-1">
            <HeartHandshake className="w-3.5 h-3.5" /> 100% LGPD / US Privacy Compliant
          </span>
        </div>
      </div>
    </footer>
  );
};
