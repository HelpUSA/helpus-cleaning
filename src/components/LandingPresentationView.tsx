import React, { useState } from 'react';
import { Language, translations } from '../i18n/translations';
import { UserRole } from '../types';
import {
  Sparkles,
  Building,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  Users,
  Layers,
  Smartphone,
  CalendarRange,
  ArrowRight,
  Zap
} from 'lucide-react';

interface LandingPresentationViewProps {
  lang: Language;
  onSelectRoleDemo: (role: UserRole) => void;
  onNavigateToTab: (tab: 'pms' | 'resort' | 'cleaner' | 'portal') => void;
}

export const LandingPresentationView: React.FC<LandingPresentationViewProps> = ({
  lang,
  onSelectRoleDemo,
  onNavigateToTab
}) => {
  const t = translations[lang];
  const [activePersona, setActivePersona] = useState<UserRole>('property_manager');

  return (
    <div className="space-y-12 sm:space-y-16 animate-fade-in pb-12">
      {/* Hero Showcase Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-6 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow">
            <Sparkles className="w-4 h-4 text-amber-400" />
            {t.landingHeroTag}
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            {t.landingHeroTitle}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t.landingHeroSubtitle}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 text-left">
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {t.landingKpiTurnovers}
              </span>
              <p className="text-2xl font-black text-amber-400 mt-1">+120.000</p>
              <span className="text-[10px] text-emerald-400 font-medium">{t.landingKpiTurnoversNote}</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {t.landingKpiPunctuality}
              </span>
              <p className="text-2xl font-black text-sky-400 mt-1">99.8%</p>
              <span className="text-[10px] text-slate-400 font-medium">{t.landingKpiPunctualityNote}</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {t.landingKpiInspections}
              </span>
              <p className="text-2xl font-black text-emerald-400 mt-1">100%</p>
              <span className="text-[10px] text-slate-400 font-medium">{t.landingKpiInspectionsNote}</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {t.landingKpiResponseTime}
              </span>
              <p className="text-2xl font-black text-purple-400 mt-1">{t.landingKpiZeroDelay}</p>
              <span className="text-[10px] text-slate-400 font-medium">{t.landingKpiCloudSync}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audiences: Persona Switcher & Feature Breakdown */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-xl sm:text-3xl font-black text-white">
            {t.landingForWhoTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {t.landingForWhoSubtitle}
          </p>
        </div>

        {/* Persona Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl mx-auto">
          <button
            onClick={() => setActivePersona('property_manager')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activePersona === 'property_manager'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>{t.tabManagers}</span>
          </button>

          <button
            onClick={() => setActivePersona('cleaning_company')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activePersona === 'cleaning_company'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{t.tabCompanies}</span>
          </button>

          <button
            onClick={() => setActivePersona('cleaner')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activePersona === 'cleaner'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>{t.tabCleanersStaff}</span>
          </button>

          <button
            onClick={() => setActivePersona('owner')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activePersona === 'owner'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>{t.tabOwners}</span>
          </button>

          <button
            onClick={() => setActivePersona('superadmin')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activePersona === 'superadmin'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{t.tabSuperAdmin}</span>
          </button>
        </div>

        {/* Dynamic Card Display for the Active Persona */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl max-w-4xl mx-auto">
          {activePersona === 'property_manager' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-black uppercase text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded border border-amber-400/20">
                  {t.pmBadge}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {t.pmHeroTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t.pmHeroDesc}
                </p>
                <ul className="space-y-2 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t.pmFeature1}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t.pmFeature2}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t.pmFeature3}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t.pmFeature4}</span>
                  </li>
                </ul>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      onSelectRoleDemo('property_manager');
                      onNavigateToTab('portal');
                    }}
                    className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition shadow"
                  >
                    <span>{t.btnTestPortalAs} {t.portalAdminRole}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onNavigateToTab('pms')}
                    className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-semibold border border-slate-700 transition"
                  >
                    <CalendarRange className="w-4 h-4 text-sky-400" />
                    <span>{t.pmBtnRibbon}</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <span className="font-bold text-xs text-slate-200">{t.pmCardHeader}</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono">{t.pmCardSync}</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-white">Blue Water 1502</p>
                      <p className="text-[11px] text-slate-400">{t.pmCardTurnaround}</p>
                    </div>
                    <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded">T/A</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-white">Shoalwater Oceanfront 205</p>
                      <p className="text-[11px] text-slate-400">{t.pmCardInspected}</p>
                    </div>
                    <span className="text-[10px] bg-emerald-500 text-slate-950 font-black px-2 py-0.5 rounded">{t.pmCardReleased}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePersona === 'cleaning_company' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-black uppercase text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded border border-amber-400/20">
                  {t.companyBadge}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {t.companyHeroTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t.companyHeroDesc}
                </p>
                <ul className="space-y-2 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t.companyFeature1}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t.companyFeature2}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t.companyFeature3}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t.companyFeature4}</span>
                  </li>
                </ul>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      onSelectRoleDemo('cleaning_company');
                      onNavigateToTab('portal');
                    }}
                    className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition shadow"
                  >
                    <span>{t.btnTestPortalAs} {t.portalCompanyRole}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onNavigateToTab('resort')}
                    className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-semibold border border-slate-700 transition"
                  >
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>{t.companyBtnBoard}</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <span className="font-bold text-xs text-slate-200">{t.companyCardHeader}</span>
                  <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded">{t.companyCardSupply}</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-white">{t.companyCardLinens}</p>
                      <p className="text-[11px] text-slate-400">Orange Beach Hub</p>
                    </div>
                    <span className="font-mono text-emerald-400 font-bold">45 {t.companyCardStock}</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-white">{t.companyCardChemical}</p>
                      <p className="text-[11px] text-slate-400">Gulf Shores Central</p>
                    </div>
                    <span className="font-mono text-amber-400 font-bold">24 {t.companyCardStock}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePersona === 'cleaner' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-black uppercase text-sky-400 bg-sky-400/10 px-2.5 py-1 rounded border border-sky-400/20">
                  {t.cleanerBadge}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {t.cleanerHeroTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t.cleanerHeroDesc}
                </p>
                <ul className="space-y-2 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t.cleanerFeature1}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t.cleanerFeature2}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t.cleanerFeature3}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t.cleanerFeature4}</span>
                  </li>
                </ul>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => onNavigateToTab('cleaner')}
                    className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition shadow"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>{t.cleanerBtnSimulate}</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <span className="font-bold text-xs text-slate-200">{t.cleanerCardHeader}</span>
                  <span className="text-[10px] bg-sky-500/20 text-sky-400 px-2 py-0.5 rounded font-mono">📱 Mobile Ready</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-white">{t.cleanerCardLock}</span>
                      <span className="font-mono text-amber-400 font-bold">5821#</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Wi-Fi: BlueWater_1502_5G</p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300">{t.progressRooms}:</span>
                    <span className="font-bold text-emerald-400 font-mono">{t.cleanerCardVerified}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePersona === 'owner' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-black uppercase text-purple-400 bg-purple-400/10 px-2.5 py-1 rounded border border-purple-400/20">
                  {t.ownerBadge}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {t.ownerHeroTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t.ownerHeroDesc}
                </p>
                <ul className="space-y-2 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t.ownerFeature1}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t.ownerFeature2}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t.ownerFeature3}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t.ownerFeature4}</span>
                  </li>
                </ul>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      onSelectRoleDemo('owner');
                      onNavigateToTab('portal');
                    }}
                    className="flex items-center gap-2 bg-purple-500 hover:bg-purple-400 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition shadow"
                  >
                    <span>{t.btnTestPortalAs} {t.portalOwnerRole}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <span className="font-bold text-xs text-slate-200">{t.ownerCardHeader}</span>
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono">{t.ownerCardAudited}</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-white">{t.ownerCardCheckout}</span>
                      <span className="text-emerald-400 font-bold">{t.scoreBadge} 99/100</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{t.ownerCardPhotosAttached}</p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300">{t.ownerCardStay}</span>
                    <span className="font-bold text-purple-400">{t.ownerCardDates}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePersona === 'superadmin' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-black uppercase text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded border border-amber-400/20">
                  {t.superadminBadge}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {t.superadminHeroTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t.superadminHeroDesc}
                </p>
                <ul className="space-y-2 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t.superadminFeature1}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t.superadminFeature2}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t.superadminFeature3}</span>
                  </li>
                </ul>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      onSelectRoleDemo('superadmin');
                      onNavigateToTab('portal');
                    }}
                    className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition shadow"
                  >
                    <span>{t.btnTestPortalAs} {t.portalSuperAdminRole}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <span className="font-bold text-xs text-slate-200">{t.superadminCardHeader}</span>
                  <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded">{t.superadminCardTotalAccess}</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300">{t.superadminCardProps}</span>
                    <span className="font-bold text-white font-mono">5 {t.totalProperties}</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300">{t.superadminCardCrews}</span>
                    <span className="font-bold text-white font-mono">2 {t.tabCompanies} • 4 {t.tabCleanersStaff}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Feature Comparison Matrix */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {t.matrixTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {t.matrixSubtitle}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 text-slate-400 uppercase font-bold text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">{t.matrixColFeature}</th>
                <th className="py-3 px-4 text-slate-500">{t.matrixColOld}</th>
                <th className="py-3 px-4 text-amber-400 font-extrabold bg-amber-400/5">{t.matrixColNew}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-3 px-4 font-semibold text-white">{t.matrixRow1Title}</td>
                <td className="py-3 px-4 text-slate-400">{t.matrixRow1Old}</td>
                <td className="py-3 px-4 font-bold text-emerald-400 bg-amber-400/5">{t.matrixRow1New}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-white">{t.matrixRow2Title}</td>
                <td className="py-3 px-4 text-slate-400">{t.matrixRow2Old}</td>
                <td className="py-3 px-4 font-bold text-emerald-400 bg-amber-400/5">{t.matrixRow2New}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-white">{t.matrixRow3Title}</td>
                <td className="py-3 px-4 text-slate-400">{t.matrixRow3Old}</td>
                <td className="py-3 px-4 font-bold text-emerald-400 bg-amber-400/5">{t.matrixRow3New}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-white">{t.matrixRow4Title}</td>
                <td className="py-3 px-4 text-slate-400">{t.matrixRow4Old}</td>
                <td className="py-3 px-4 font-bold text-emerald-400 bg-amber-400/5">{t.matrixRow4New}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
