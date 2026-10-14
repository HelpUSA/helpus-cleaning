import React, { useState, useEffect } from 'react';
import { Language, translations } from '../i18n/translations';
import { ShieldCheck, Cookie, Check } from 'lucide-react';

interface CookieBannerProps {
  lang: Language;
  forceOpen?: boolean;
  onCloseForceOpen?: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({
  lang,
  forceOpen = false,
  onCloseForceOpen
}) => {
  const [accepted, setAccepted] = useState(true);
  const t = translations[lang];

  useEffect(() => {
    const consent = localStorage.getItem('helpus_cookie_consent');
    if (!consent) {
      setAccepted(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('helpus_cookie_consent', 'accepted');
    setAccepted(true);
    if (onCloseForceOpen) onCloseForceOpen();
  };

  if (accepted && !forceOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-left">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-400/10 rounded-xl text-amber-400 border border-amber-400/20">
            <Cookie className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-100">{t.cookieSettings}</h3>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
                LGPD / Safe
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {t.cookieConsent}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={handleAccept}
                className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs shadow-md transition"
              >
                <Check className="w-4 h-4" />
                {t.accept}
              </button>
              {forceOpen && (
                <button
                  onClick={onCloseForceOpen}
                  className="text-xs text-slate-400 hover:text-white px-3 py-2 transition"
                >
                  {t.close}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
