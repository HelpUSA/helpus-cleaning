# HelpUS Cleaning — Guia de Arquitetura, Colaboração Git e Diretrizes Técnicas entre Agentes IA

> **Repositório Oficial**: `https://github.com/HelpUSA/helpus-cleaning.git`  
> **Ambiente de Produção**: `https://cleaning.helpusbr.com`  
> **Stack Principal**: React 19, TypeScript, Vite 6, Tailwind CSS, Vercel Edge Serverless, Cloudflare DNS.  
> **Localização de Operação**: Gulf Shores & Orange Beach, Baldwin County, Alabama (AL, EUA).

---

## 1. Visão Geral da Solução HelpUS Cleaning

O **HelpUS Cleaning** é uma plataforma corporativa e unificada para o mercado de locação de temporada (*vacation rentals*), projetada para eliminar o uso de planilhas e softwares legados fragmentados. A plataforma centraliza a gestão de reservas de múltiplos canais (Airbnb, Vrbo, Booking.com, Direto e Bloqueios de Proprietário) com o despacho operacional de limpezas (*turnovers*), vistorias com fotos auditáveis, estoques de enxovais/químicos e aplicativo móvel para diaristas em campo.

### 2. Estrutura de Rotas e Telas (Subpáginas SPA)
O sistema opera como uma Single Page Application com roteamento pushState através de [`src/router/useAppRouter.ts`](file:///d:/AntiG/helpus-cleaning/src/router/useAppRouter.ts) e rewrites nativos no Edge da Vercel (`vercel.json`):

1. **`/` (ou `/landing`) — Showroom Comercial & Apresentação**:
   - Apresentação executiva para captação de clientes.
   - Métricas comprovadas (+120k turnovers, 99.8% de pontualidade em giros de 6h, 100% com evidência fotográfica).
   - Seletor de Personas: Administradoras (PM), Empresas de Limpeza, Diaristas de Campo, Proprietários e SuperAdmin.
   - Matriz comparativa: Métodos Tradicionais vs. HelpUS Cleaning Hub.

2. **`/pms` — HelpUS PMS & Reservas**:
   - Controle central de reservas e calendário horizontal Ribbon de múltiplos condomínios.
   - Detecção visual e alerta de *Back-to-Back* (Turn Around / T/A) entre 10:00 e 16:00 do mesmo dia.
   - Gatilho automático: ao salvar uma reserva, uma tarefa de limpeza é gerada instantaneamente no check-out com o diarista padrão da unidade.
   - Drawer lateral para visualização detalhada e despacho rápido.

3. **`/housekeeping` — HelpUS Housekeeping & Painel HOJE**:
   - Painel operacional em tempo real dividido por estados: Não Confirmado, Ordem de Serviço, Confirmado/Pendente, Em Andamento, Concluído e Inspecionado/Pronto.
   - Fila de confirmação de agendamentos em lote (`Confirm All`).
   - Gestão de profissionais e empresas credenciadas com valor a pagar e botão de envio de rota via WhatsApp.
   - Modal de vistoria com notas de qualidade, checklist cômodo a cômodo e galeria de fotos antes/depois.

4. **`/portal` — Portais RBAC por Papel Operacional**:
   - Controle granular de permissões e formulários:
     - Cadastrar e listar Imóveis (código, endereço, quartos, banheiros, senha da fechadura, Wi-Fi, taxa cobrada, repasse do cleaner).
     - Cadastrar e listar Proprietários (contato e imóveis vinculados).
     - Cadastrar e listar Empresas Parceiras de Housekeeping (com seguro verificado).
     - Cadastrar e listar Diaristas de Campo.
     - Gestão de Estoque de Insumos: produtos químicos hospitalares, enxoval/toalhas (linens), papelaria/descartáveis, amenities e equipamentos com alerta de estoque baixo.
     - Portal exclusivo do Proprietário com laudo de conservação patrimonial e agendamento de estadias próprias (Owner Stays).

5. **`/cleaner` — App Móvel de Campo do Diarista**:
   - Simulador mobile interativo (Modo Celular com moldura de smartphone ou Tela Cheia).
   - Rota diária com endereço da unidade, código da fechadura eletrônica e rede Wi-Fi.
   - Botões operacionais de Clock-In (cronômetro em tempo real) e Clock-Out para fechamento de folha.
   - Checklist obrigatório por cômodo (cozinha, banheiros, quartos, sala/varanda, inspeção final).
   - Upload de fotos de evidência pela câmera e registro de avarias/achados e perdidos.

6. **`/login` — Autenticação Google & Gestão de Contas**:
   - Modal de login alimentado pelo SDK oficial Google Identity Services (GSI) em [`src/auth/useGoogleAuth.ts`](file:///d:/AntiG/helpus-cleaning/src/auth/useGoogleAuth.ts).
   - Modo Demonstração rápido com 1 clique para demonstração em reuniões comerciais nos 5 perfis da plataforma.

---

## 3. Padrão Tri-Idioma (100% i18n)
- Todas as mensagens, botões, modais e legendas são gerenciadas em [`src/i18n/translations.ts`](file:///d:/AntiG/helpus-cleaning/src/i18n/translations.ts).
- Suporte simultâneo a **🇧🇷 Português (`pt`)**, **🇺🇸 Inglês (`en`)** e **🇪🇸 Espanhol (`es`)**.
- **Regra obrigatória**: Ao adicionar novos recursos ou componentes, NUNCA introduzir texto estático em código. Sempre adicione as chaves simultaneamente nos 3 idiomas em `translations.ts`.

---

## 4. Regras Absolutas de Compliance & Identidade
1. **Identidade Exclusiva HelpUS**: É estritamente proibido incluir menções a ferramentas legadas externas concorrentes ou nomes de pessoas físicas específicas no código, comentários ou interface.
2. **Design System**: Tailwind CSS Dark Theme (`bg-slate-950`, acentos `text-amber-400`, botões `bg-amber-400 text-slate-950`, detalhes em `emerald-400`, `sky-400` e `purple-400`).
3. **Responsividade**: Todas as telas devem funcionar com perfeição em celulares (<400px), tablets (768px) e monitores ultrawide (1080p+).

---

## 5. Protocolo de Comunicação e Colaboração via Git entre Agentes IA

Como este repositório é manipulado por agentes de IA colaborativos, siga o seguinte protocolo rigoroso:

### Passo 1: Sincronização Inicial
Antes de fazer qualquer alteração, puxe o histórico mais recente:
```bash
git fetch origin
git checkout master
git pull origin master
```

### Passo 2: Verificação do Histórico Recente
Examine os últimos commits para entender o que o outro agente implementou:
```bash
git log -n 5 --oneline
```

### Passo 3: Implementação e Validação Obrigatória
Nenhuma alteração pode ser comitada ou enviada para produção sem aprovação no compilador TypeScript e no bundle de produção:
```bash
npx tsc --noEmit
npm run build
```
Se houver qualquer erro de tipagem ou importação inexistente, corrija imediatamente antes de commitar.

### Passo 4: Mensagens de Commit Semânticas
Utilize o padrão Conventional Commits para que o outro agente compreenda imediatamente o escopo da alteração:
- `feat: ...` para novas funcionalidades
- `fix: ...` para correções de bugs
- `i18n: ...` para adições ou ajustes de traduções
- `docs: ...` para documentação técnica
- `refactor: ...` para melhorias de código sem alteração funcional

### Passo 5: Registro no Histórico de Handoff
Ao concluir uma tarefa relevante, adicione um resumo no arquivo `docs/AGENT_HANDOFF.md` indicando:
- O que foi alterado/criado
- O status da compilação e deploy
- Recomendações e próximos passos para o próximo agente

### Passo 6: Publicação e Deploy
```bash
git add .
git commit -m "feat(modulo): descricao clara da alteracao"
git push origin master
npx vercel --prod --yes
```
Verifique a resposta da URL de produção:
```bash
curl.exe -I https://cleaning.helpusbr.com
```
(Deve retornar `HTTP/1.1 200 OK`).
