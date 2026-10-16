import React, { useState } from 'react';
import { Language, translations } from '../i18n/translations';
import { UserRole } from '../types';
import { useGoogleAuth, GoogleUser } from '../auth/useGoogleAuth';
import { GoogleLoginButton } from '../auth/GoogleLoginButton';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Building,
  Layers,
  Smartphone,
  KeyRound,
  LogOut,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface GoogleLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  currentUser: { name: string; email: string; avatar: string } | null;
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onLoginSuccess: (user: { name: string; email: string; avatar: string }) => void;
  onLogout: () => void;
}

export const GoogleLoginModal: React.FC<GoogleLoginModalProps> = ({
  isOpen,
  onClose,
  lang,
  currentUser,
  currentRole,
  onSelectRole,
  onLoginSuccess,
  onLogout
}) => {
  const t = translations[lang];
  const [authError, setAuthError] = useState<string>('');

  const { login, isLoading, error: googleError } = useGoogleAuth({
    onSuccess: (gUser: GoogleUser) => {
      setAuthError('');
      onLoginSuccess({
        name: gUser.name,
        email: gUser.email,
        avatar: gUser.picture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      });
      onClose();
    },
    onError: (err: string) => {
      setAuthError(err);
    }
  });

  if (!isOpen) return null;

  const demoProfiles: Array<{
    role: UserRole;
    name: string;
    email: string;
    avatar: string;
    icon: React.ReactNode;
    color: string;
    title: string;
  }> = [
    {
      role: 'superadmin',
      name: 'SuperAdmin HelpUS',
      email: 'helpus.ecommerce@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      icon: <ShieldCheck className="w-4 h-4 text-amber-400" />,
      color: 'border-amber-400/40 bg-amber-400/5',
      title: t.portalSuperAdminRole
    },
    {
      role: 'property_manager',
      name: 'Sarah Jenkins (PM)',
      email: 'sarah.jenkins@gulfrentals.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      icon: <Building className="w-4 h-4 text-sky-400" />,
      color: 'border-sky-400/40 bg-sky-400/5',
      title: t.portalAdminRole
    },
    {
      role: 'cleaning_company',
      name: 'Gulf Coast Pro Cleaning',
      email: 'operations@gulfcoastclean.com',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
      icon: <Layers className="w-4 h-4 text-emerald-400" />,
      color: 'border-emerald-400/40 bg-emerald-400/5',
      title: t.portalCompanyRole
    },
    {
      role: 'cleaner',
      name: 'Maria Santos (Cleaner)',
      email: 'maria.santos@cleaner.com',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      icon: <Smartphone className="w-4 h-4 text-purple-400" />,
      color: 'border-purple-400/40 bg-purple-400/5',
      title: t.portalCleanerRole
    },
    {
      role: 'owner',
      name: 'Robert Davis (Owner)',
      email: 'robert.davis@rentals.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      icon: <KeyRound className="w-4 h-4 text-amber-300" />,
      color: 'border-amber-300/40 bg-amber-300/5',
      title: t.portalOwnerRole
    }
  ];

  const handleSelectDemo = (demo: typeof demoProfiles[0]) => {
    onSelectRole(demo.role);
    onLoginSuccess({
      name: demo.name,
      email: demo.email,
      avatar: demo.avatar
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="HelpUS Logo"
              className="w-9 h-9 rounded-full object-cover border border-amber-400/80 shadow"
            />
            <div>
              <h2 className="text-base sm:text-lg font-black text-white leading-tight">
                {t.loginModalTitle}
              </h2>
              <span className="text-[10px] text-amber-400 font-semibold tracking-wide">
                HelpUS Cleaning Platform
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          {/* Active Account Banner (If logged in) */}
          {currentUser ? (
            <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-12 h-12 rounded-full border-2 border-emerald-400 object-cover shadow"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-white">{currentUser.name}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-xs text-amber-400 font-mono">{currentUser.email}</p>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {t.loginSuccessTitle}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={onLogout}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-red-950/50 hover:text-red-400 text-slate-300 rounded-xl text-xs font-semibold border border-slate-700 transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t.loginLogoutBtn}</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-bold transition shadow"
                >
                  <span>{t.loginEnterBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Google Sign-in Section */}
              <div className="space-y-3">
                <p className="text-xs text-slate-300 text-center leading-relaxed">
                  {t.loginModalSubtitle}
                </p>

                {(authError || googleError) && (
                  <div className="bg-red-950/40 border border-red-500/40 rounded-xl p-3 flex items-start gap-2 text-xs text-red-300">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{authError || googleError}</span>
                  </div>
                )}

                <div className="pt-1">
                  <GoogleLoginButton
                    onClick={login}
                    isLoading={isLoading}
                    label={t.loginGoogleDirect}
                    variant="light"
                    className="shadow-md py-3 text-slate-900"
                  />
                </div>
              </div>

              {/* Separator */}
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-800"></div>
                <span className="flex-shrink mx-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {t.loginDemoMode}
                </span>
                <div className="flex-grow border-t border-slate-800"></div>
              </div>

              {/* Demo Role Switcher Profiles */}
              <div className="space-y-2">
                <p className="text-[11px] text-slate-400">
                  {t.loginDemoNote}
                </p>

                <div className="grid grid-cols-1 gap-2 pt-1">
                  {demoProfiles.map((demo) => (
                    <button
                      key={demo.role}
                      type="button"
                      onClick={() => handleSelectDemo(demo)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border transition text-left ${
                        demo.color
                      } hover:border-amber-400 hover:scale-[1.01]`}
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={demo.avatar}
                          alt={demo.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-white">{demo.name}</span>
                            {demo.icon}
                          </div>
                          <span className="text-[10px] text-slate-400 block">{demo.title} • {demo.email}</span>
                        </div>
                      </div>

                      <span className="text-[11px] font-bold text-amber-400 pr-2">
                        ➔
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Role Access Selector */}
          <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {t.loginAsRoleLabel}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(['superadmin', 'property_manager', 'cleaning_company', 'cleaner', 'owner'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => onSelectRole(r)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                    currentRole === r
                      ? 'bg-amber-400 text-slate-950 shadow'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {r === 'superadmin'
                    ? t.portalSuperAdminRole
                    : r === 'property_manager'
                    ? t.portalAdminRole
                    : r === 'cleaning_company'
                    ? t.portalCompanyRole
                    : r === 'cleaner'
                    ? t.portalCleanerRole
                    : t.portalOwnerRole}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.loginSecurityNotice}</span>
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
