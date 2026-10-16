import React, { useState } from 'react';
import { Language, translations } from '../i18n/translations';
import { UserRole } from '../types';
import {
  Sparkles,
  Building,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Camera,
  Users,
  ChevronRight,
  TrendingUp,
  Zap,
  Smartphone,
  Layers,
  Package,
  CalendarRange,
  ArrowRight,
  BadgeCheck,
  Star
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
              <span className="text-[10px] text-emerald-400 font-medium">Em condomínios de praia</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {t.landingKpiPunctuality}
              </span>
              <p className="text-2xl font-black text-sky-400 mt-1">99.8%</p>
              <span className="text-[10px] text-slate-400 font-medium">Janela estrita de 6h (10h-16h)</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {t.landingKpiInspections}
              </span>
              <p className="text-2xl font-black text-emerald-400 mt-1">100%</p>
              <span className="text-[10px] text-slate-400 font-medium">Com fotos auditáveis</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Tempo de Resposta
              </span>
              <p className="text-2xl font-black text-purple-400 mt-1">Zero Atrasos</p>
              <span className="text-[10px] text-slate-400 font-medium">Sincronização em Nuvem</span>
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
                  Para Administradoras de Locação & PMs
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Controle total de ponta a ponta sem planilhas ou surpresas
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Elimine o caos das trocas de hóspedes aos sábados. Quando uma reserva entra pelo Airbnb, Vrbo ou canal direto, a tarefa de limpeza é gerada instantaneamente no check-out com verificação de back-to-backs (T/A).
                </p>
                <ul className="space-y-2 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Calendário horizontal Ribbon multunidades sincronizado</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Gatilho de faxina automático com controle de check-in 16h / check-out 10h</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Alertas visuais de giros no mesmo dia (Turn Arounds)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Faturamento transparente de taxas de limpeza por imóvel</span>
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
                    <span>{t.btnTestPortalAs} Administradora</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onNavigateToTab('pms')}
                    className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-semibold border border-slate-700 transition"
                  >
                    <CalendarRange className="w-4 h-4 text-sky-400" />
                    <span>Ver Calendário Ribbon</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <span className="font-bold text-xs text-slate-200">Visão da Administradora</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono">100% Sincronizado</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-white">Blue Water 1502</p>
                      <p className="text-[11px] text-slate-400">Troca rápida 10h-16h (T/A)</p>
                    </div>
                    <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded">T/A ATIVO</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-white">Shoalwater Oceanfront 205</p>
                      <p className="text-[11px] text-slate-400">Inspeção Concluída (Nota 99)</p>
                    </div>
                    <span className="text-[10px] bg-emerald-500 text-slate-950 font-black px-2 py-0.5 rounded">LIBERADO</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePersona === 'cleaning_company' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-black uppercase text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded border border-amber-400/20">
                  Para Empresas de Housekeeping & Limpeza
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Escalabilidade com controle de escalas, estoque e repasses
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Gerencie dezenas de diaristas e centenas de condomínios simultâneos. Aprove agendamentos em lote com um único clique, controle o consumo de lençóis e produtos químicos hospitalares, e emita pagamentos com precisão.
                </p>
                <ul className="space-y-2 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Fila de confirmação de agendamentos em lote (Confirm All)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Gestão de estoque de enxoval (linens), produtos químicos e amenities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Roster de diaristas com geolocalização e envio de rota no WhatsApp</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Controle de remuneração por casa e folha de pagamento em tempo real</span>
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
                    <span>{t.btnTestPortalAs} Empresa de Limpeza</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onNavigateToTab('resort')}
                    className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-semibold border border-slate-700 transition"
                  >
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Ver Painel Operacional HOJE</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <span className="font-bold text-xs text-slate-200">Painel Operacional da Empresa</span>
                  <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded">Controle de Insumos</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-white">Enxovais King 400 Fios</p>
                      <p className="text-[11px] text-slate-400">Depósito Orange Beach</p>
                    </div>
                    <span className="font-mono text-emerald-400 font-bold">45 em estoque</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-white">Desinfetante Hospitalar 5L</p>
                      <p className="text-[11px] text-slate-400">Depósito Gulf Shores</p>
                    </div>
                    <span className="font-mono text-amber-400 font-bold">24 em estoque</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePersona === 'cleaner' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-black uppercase text-sky-400 bg-sky-400/10 px-2.5 py-1 rounded border border-sky-400/20">
                  Para Diaristas & Profissionais de Campo
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Aplicativo de campo no celular sem papelada ou dúvidas
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  O diarista recebe sua rota diária direto no celular com endereço, senha da fechadura eletrônica e Wi-Fi. Faz o Clock-In ao chegar, segue o checklist obrigatório por cômodo, anexa fotos e finaliza com Clock-Out para liberação do pagamento.
                </p>
                <ul className="space-y-2 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Acesso imediato à senha da fechadura e rede Wi-Fi</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Checklist obrigatório por cômodo (cozinha, banheiros, quartos, varanda)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Envio de fotos antes/depois diretamente da câmera</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Reporte imediato de avarias e achados & perdidos com foto</span>
                  </li>
                </ul>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => onNavigateToTab('cleaner')}
                    className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition shadow"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Abrir Simulador do App Cleaner</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <span className="font-bold text-xs text-slate-200">Experiência no Smartphone</span>
                  <span className="text-[10px] bg-sky-500/20 text-sky-400 px-2 py-0.5 rounded font-mono">📱 Mobile Ready</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-white">Fechadura Eletrônica</span>
                      <span className="font-mono text-amber-400 font-bold">5821#</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Wi-Fi: BlueWater_1502_5G</p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300">Checklist dos Cômodos:</span>
                    <span className="font-bold text-emerald-400 font-mono">19/19 Verificados (100%)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePersona === 'owner' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-black uppercase text-purple-400 bg-purple-400/10 px-2.5 py-1 rounded border border-purple-400/20">
                  Para Proprietários de Imóveis (Owners)
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Visibilidade absoluta sobre a conservação do seu patrimônio
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Chega de dúvidas sobre o estado da sua casa na praia. O proprietário tem acesso ao histórico de todas as limpezas realizadas, laudos de vistoria com galeria de fotos e pode solicitar o bloqueio de estadias próprias (Owner Stay) sem custos indevidos.
                </p>
                <ul className="space-y-2 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Relatórios de vistoria pós-limpeza com fotos de alta resolução</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Solicitação de estadias próprias (Owner Stays) com faxina automática ao sair</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Histórico de manutenções preventivas e proteção patrimonial</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Transparência total sem relatórios impressos ou atrasos</span>
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
                    <span>{t.btnTestPortalAs} Proprietário</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <span className="font-bold text-xs text-slate-200">Laudo do Proprietário</span>
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono">Imóvel Auditado</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-white">Vistoria Pós-Checkout</span>
                      <span className="text-emerald-400 font-bold">Nota 99/100</span>
                    </div>
                    <p className="text-[11px] text-slate-400">2 Fotos de evidência anexadas • Sem avarias</p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300">Estadia do Proprietário:</span>
                    <span className="font-bold text-purple-400">12 a 15 de Outubro (Reunião)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePersona === 'superadmin' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-black uppercase text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded border border-amber-400/20">
                  Para SuperAdmins & Gestores da Plataforma
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Governança centralizada e controle absoluto de todos os módulos
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Acesso irrestrito para cadastrar e gerenciar Imóveis, Proprietários, Empresas de Limpeza, Diaristas e Estoques de Materiais. Monitoramento das integrações na nuvem e auditoria de cada operação.
                </p>
                <ul className="space-y-2 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Gestão completa de todas as entidades do sistema</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Permissões granulares de acesso por perfil de login</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Exportação de relatórios gerenciais e financeiros</span>
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
                    <span>{t.btnTestPortalAs} SuperAdmin Master</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <span className="font-bold text-xs text-slate-200">Painel Master de Governança</span>
                  <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded">Total Access</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300">Imóveis Ativos:</span>
                    <span className="font-bold text-white font-mono">5 Imóveis</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300">Empresas & Diaristas:</span>
                    <span className="font-bold text-white font-mono">2 Empresas • 4 Diaristas</span>
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
            Por que o HelpUS Cleaning substitui planilhas e softwares legados?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Uma comparação direta da eficiência operacional para condomínios e casas de temporada:
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 text-slate-400 uppercase font-bold text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Funcionalidade Operacional</th>
                <th className="py-3 px-4 text-slate-500">Método Tradicional / Planilhas</th>
                <th className="py-3 px-4 text-amber-400 font-extrabold bg-amber-400/5">HelpUS Cleaning Hub</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-3 px-4 font-semibold text-white">Turnovers Back-to-Back (T/A 10h-16h)</td>
                <td className="py-3 px-4 text-slate-400">Avisos manuais por WhatsApp, alto risco de esquecimento</td>
                <td className="py-3 px-4 font-bold text-emerald-400 bg-amber-400/5">Selo T/A prioritário automático e cronômetro em tempo real</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-white">Vistoria e Comprovação de Limpeza</td>
                <td className="py-3 px-4 text-slate-400">Sem fotos ou relatórios perdidos em conversas privadas</td>
                <td className="py-3 px-4 font-bold text-emerald-400 bg-amber-400/5">Galeria auditável de fotos com laudo aprovado para o proprietário</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-white">Controle de Enxoval & Insumos</td>
                <td className="py-3 px-4 text-slate-400">Contagem manual, queixas de falta de toalhas e lençóis</td>
                <td className="py-3 px-4 font-bold text-emerald-400 bg-amber-400/5">Módulo integrado de estoque com alerta de reposição mínima</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-white">Bloqueios de Proprietário (Owner Stays)</td>
                <td className="py-3 px-4 text-slate-400">Cobranças indevidas de comissão ou esquecimento de faxina</td>
                <td className="py-3 px-4 font-bold text-emerald-400 bg-amber-400/5">Estilo visual exclusivo no Ribbon, $0 de taxa e faxina garantida</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
