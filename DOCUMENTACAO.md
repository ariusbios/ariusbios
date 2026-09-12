# Documentação — Biosite Platform

> Gerado a partir da análise do código-fonte real do projeto em `/Users/euerickwilliam/Desktop/BIOSITE` (2026-09-10). Este arquivo separa claramente **o que já está implementado no código** do **que está apenas planejado** (roadmap em `/Users/euerickwilliam/.claude/plans/spicy-dazzling-journal.md`), para não gerar contexto falso em conversas futuras com IA.

---

## 1. Visão geral

**Nome do app:** Biosite Platform (`package.json` → `"name": "biosite-platform"`, nome de marca ainda não definido).

**O que faz:** SaaS de "biosite" (página tipo link-in-bio + vitrine digital) para pequenos negócios (referência de mercado: Linktree, Beacons, myvizion/Contexta). Cada biosite reúne, numa única página mobile-first: perfil do negócio, stories estilo Instagram por categoria, carrossel de produtos em destaque, combos com desconto, prova social, lista de links/Wi-Fi/PIX (com QR Code em popup fullscreen) e localização. O objetivo declarado é ser mais completo e visualmente melhor que o concorrente de referência `padariatreze.myvizion.com.br`.

**Público-alvo (modelo de negócio em 3 camadas):**
- **Produtor**: quem revende a plataforma — cria e configura biosites para múltiplos clientes (multi-tenant).
- **Cliente final**: dono do negócio (ex: padaria, loja) que recebe o biosite pronto; no modelo planejado, pode editar apenas as imagens que o produtor liberar.
- **Visitante**: consumidor final que acessa o link público do biosite pelo celular.

**Stack:**

| Camada | Tecnologia | Status |
|---|---|---|
| Frontend | Next.js 16 (App Router, Turbopack), React 19, TypeScript | ✅ Implementado |
| Estilo | Tailwind CSS v4 + shadcn/ui (`components.json`) | ✅ Implementado |
| Ícones | `lucide-react` | ✅ Implementado |
| QR Code | `qrcode` (geração client-side, sem serviço externo) | ✅ Implementado |
| Banco/Backend | Supabase (Postgres) | 🟡 Parcial — projeto `ariusbios` criado e conectado, tabela `biosites` (jsonb, sem schema normalizado ainda) em produção, `/[slug]` já lê de lá. Auth/Storage/builder ainda não implementados |
| Deploy | Vercel + domínio próprio via CNAME | ⏳ Planejado, não configurado |
| Design | SuperDesign (ferramenta de geração de UI via IA) | ✅ Usado no processo de design; HTML aprovado salvo em `design-reference/bento-commerce.html` |

**Estado real do projeto:** template público do biosite (`src/app/(public)/[slug]/page.tsx`) já lê de um banco Supabase real (projeto `ariusbios`, ref `eiwjmeerlsowclcmqilb`) em vez de mock. Cadastro de biosite novo ainda é manual (INSERT direto via migration/dashboard) — não existe: autenticação, painel do produtor, painel do cliente, builder no-code, tracking de analytics ou domínio customizado. Isso corresponde a um atalho mínimo pra Fase 1.5→2 (ver `spicy-dazzling-journal.md`) — schema normalizado (`blocks`, `templates` etc.) fica pra quando o builder existir.

---

## 2. Estrutura do banco (Supabase)

**Status atual:** projeto Supabase `ariusbios` conectado (`supabase link`), migrations em `supabase/migrations/`. Existe uma única tabela real:

```sql
public.biosites (id uuid pk, slug text unique, data jsonb, created_at, updated_at)
```

RLS ativa, com policy de leitura pública (`anon`/`authenticated` podem `select`; nenhuma escrita liberada pra client-side — inserts/updates são feitos via migration ou dashboard). `data` guarda o objeto inteiro no formato `BiositeData` (mesmo shape que já era usado em `mock-biosite.ts`) — decisão deliberada de **não normalizar ainda**, pra não construir tabelas (`blocks`, `templates`, `hero_slides`...) que só fazem sentido quando o builder (Fase 2) existir e precisar editar campo a campo.

Client em `src/lib/supabase.ts` (usa `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY` de `.env.local`), leitura em `src/lib/get-biosite.ts`.

O schema abaixo é o **modelo planejado** pro dia em que o builder existir — derivado 1:1 do formato de dados já usado no frontend (`BiositeData` em `src/lib/types.ts`) cruzado com o roadmap do projeto. **Ainda não existe**, é o contrato de migração futura da tabela `biosites.data` (jsonb) pras tabelas normalizadas abaixo.

### Tabelas planejadas

**`biosites`**
| Campo | Tipo | Observação |
|---|---|---|
| id | uuid (PK) | |
| producer_id | uuid (FK → auth.users) | dono/revendedor do biosite |
| client_id | uuid nullable (FK → auth.users) | dono do negócio, pode ser nulo até o produtor convidar o cliente |
| slug | text unique | usado na rota pública `/[slug]` |
| template_id | uuid (FK → templates) | preset visual escolhido |
| accent_color | text | cor de destaque (hex) |
| background_color | text | cor de fundo do biosite inteiro; propagada no frontend via CSS var `--biosite-bg` |
| name | text | nome do negócio |
| avatar_url | text | logo/foto de perfil |
| verified | boolean | selo de verificado no header |
| bento_title | text | título da seção de destaques (ex: "Destaques da Casa"), editável |
| whatsapp_number | text | número usado nos links `wa.me` |
| footer_credit_url | text | link do rodapé "Quer um biosite igual a este?" |
| status_override | text nullable (`'open'` \| `'closed'` \| null) | força aberto/fechado manualmente, sobrepõe `business_hours` |
| custom_domain | text nullable | domínio próprio do produtor |
| domain_status | text | status de verificação do domínio (Vercel Domains API) |
| created_at | timestamptz | |

**`templates`**
| Campo | Tipo |
|---|---|
| id | uuid (PK) |
| name | text |
| preview_url | text |
| config | jsonb (tokens visuais do preset) |

**`business_hours`**
| Campo | Tipo |
|---|---|
| id | uuid (PK) |
| biosite_id | uuid (FK → biosites) |
| day_of_week | int (0=domingo … 6=sábado) |
| open_time | time |
| close_time | time |

Usada junto com `biosites.status_override` para calcular o selo "ABERTO AGORA"/"FECHADO" (lógica hoje implementada em `src/lib/business-hours.ts`, rodando sobre os dados mockados).

**`blocks`** — lista genérica, reordenável e de quantidade livre (inclusive múltiplos Wi-Fi/PIX/links)
| Campo | Tipo |
|---|---|
| id | uuid (PK) |
| biosite_id | uuid (FK → biosites) |
| type | text (`link` \| `qr_link` \| `map`) |
| position | int (ordem de exibição) |
| config | jsonb (formato varia por `type`, ver abaixo) |
| editable_by_client | boolean | se o cliente final pode editar este bloco no painel restrito (planejado) |

Formatos de `config` por tipo (espelham `src/lib/types.ts`):
- `link`: `{ label, url, description?, icon?: 'whatsapp'|'instagram'|'generic' }`
- `qr_link`: `{ kind: 'wifi'|'pix'|'custom', label, description?, wifi?: { ssid, password }, pix?: { key, receiverName, city } }` — ao tocar, abre popup fullscreen com QR Code gerado on-the-fly (Wi-Fi vira payload `WIFI:T:WPA;...`, PIX vira payload BR Code/EMV com CRC16, ambos calculados em `src/lib/wifi.ts` e `src/lib/pix.ts`)
- `map`: `{ label, address, mapImageUrl, mapsUrl }`

**`block_images`**
| Campo | Tipo |
|---|---|
| id | uuid (PK) |
| block_id | uuid (FK → blocks) |
| url | text |
| position | int |
| editable_by_client | boolean |

**`stories`** (bolhas estilo Instagram Stories, linha centralizada no topo)
| Campo | Tipo |
|---|---|
| id | uuid (PK) |
| biosite_id | uuid (FK → biosites) |
| label | text |
| position | int |

**`story_images`**
| Campo | Tipo |
|---|---|
| id | uuid (PK) |
| story_id | uuid (FK → stories) |
| url | text |
| position | int |

Cada story pode ter N imagens; ao tocar na bolha abre um visualizador fullscreen (`src/components/biosite/StoriesViewer.tsx`) com avanço automático e swipe entre fotos/bolhas.

**`hero_slides`** (carrossel principal, logo abaixo do selo aberto/fechado)
| Campo | Tipo |
|---|---|
| id | uuid (PK) |
| biosite_id | uuid (FK → biosites) |
| image_url | text |
| badge_text | text nullable | ex: "MAIS PEDIDO 🔥", editável, centralizado sobre a imagem |
| position | int |

**`social_proof_config`**
| Campo | Tipo |
|---|---|
| biosite_id | uuid (PK, FK → biosites) |
| enabled | boolean | liga/desliga a seção inteira |
| avatar_urls | text[] | avatares sobrepostos |
| order_count_label | text | ex: "+500 pedidos esta semana" |
| show_rating | boolean |
| rating | numeric |
| rating_count | text | ex: "1.2k" |

**`bento_items`** (seção "Destaques da Casa" — carrossel automático, até 6 itens)
| Campo | Tipo |
|---|---|
| id | uuid (PK) |
| biosite_id | uuid (FK → biosites) |
| image_url | text |
| title | text |
| price | text |
| badge | text nullable | ex: "MAIS VENDIDO" |
| position | int |

**`combos`** (seção "Combos com Desconto" — máximo 3 exibidos)
| Campo | Tipo |
|---|---|
| id | uuid (PK) |
| biosite_id | uuid (FK → biosites) |
| image_url | text |
| title | text |
| price | text |
| original_price | text nullable |
| original_price_color | text nullable | cor customizável do preço riscado |
| savings_label | text nullable | ex: "ECONOMIZE R$ 20" |
| highlighted | boolean | ativa borda/botão com brilho pulsante (glow) para destaque |
| position | int |

**`testimonials_config`**
| Campo | Tipo |
|---|---|
| biosite_id | uuid (PK, FK → biosites) |
| enabled | boolean | seção desligada por padrão |

**`testimonials`**
| Campo | Tipo |
|---|---|
| id | uuid (PK) |
| biosite_id | uuid (FK → biosites) |
| name | text |
| avatar_url | text |
| rating | int |
| quote | text |
| position | int |

**`store_gallery_config`**
| Campo | Tipo |
|---|---|
| biosite_id | uuid (PK, FK → biosites) |
| enabled | boolean |
| title | text | ex: "Nossa Loja", editável |

**`store_gallery_images`**
| Campo | Tipo |
|---|---|
| id | uuid (PK) |
| biosite_id | uuid (FK → biosites) |
| url | text |
| position | int (máx. 4 imagens exibidas em grade 2x2) |

**`visits`** (tracking de analytics — Fase 3, não implementado)
| Campo | Tipo |
|---|---|
| id | uuid (PK) |
| biosite_id | uuid (FK → biosites) |
| created_at | timestamptz |
| country / region / city | text | via headers de geo da Vercel |
| device_os | text (`ios` \| `android` \| `other`) |
| referrer | text |
| session_id | text |

**`clicks`**
| Campo | Tipo |
|---|---|
| id | uuid (PK) |
| visit_id | uuid (FK → visits) |
| biosite_id | uuid (FK → biosites) |
| block_id | uuid (FK → blocks) |
| block_label | text |
| created_at | timestamptz |

### Relacionamentos
`biosites` é a tabela central: todas as demais (`blocks`, `stories`, `hero_slides`, `bento_items`, `combos`, `testimonials`, `store_gallery_*`, `social_proof_config`, `testimonials_config`, `business_hours`, `visits`) referenciam `biosite_id`. `templates` é referenciada por `biosites.template_id`. Tabelas de imagem (`block_images`, `story_images`, `store_gallery_images`) referenciam seu bloco/story pai. `clicks` referencia tanto `visits` quanto `blocks`.

### Políticas RLS
**Nenhuma política RLS existe hoje** (não há banco criado). O planejado (ver plano do projeto):
- Perfis com `role` (`producer` | `client`) numa tabela `profiles`.
- RLS por `owner_id`/`biosite_id`: produtor só acessa biosites onde é `producer_id`; cliente final só acessa biosites onde é `client_id`, e dentro deles só pode escrever em `blocks`/`block_images`/`store_gallery_images` marcados com `editable_by_client = true`.
- Leitura pública (sem auth) liberada para a rota `/[slug]` renderizar o biosite.
- Storage: bucket `biosite-images` com policy restringindo upload a linhas cujo `editable_by_client = true` e usuário autenticado seja o `client_id` correspondente.

---

## 3. Autenticação

**Status atual: não implementada.** Não há nenhuma rota de login, nenhum uso de `@supabase/ssr`/`@supabase/supabase-js` no código, nenhum middleware de proteção de rota. A única rota pública hoje (`/[slug]`) não exige login.

**Planejado:**
- Provedor: Supabase Auth (e-mail/senha, possivelmente magic link — não decidido).
- Dois papéis: `producer` e `client`, controlados por uma tabela `profiles.role`.
- Rotas protegidas planejadas: `(dashboard)/produtor/*`, `(dashboard)/cliente/*`, `(dashboard)/builder/*` — nenhuma dessas pastas existe ainda no código.
- Proteção via middleware Next.js + client Supabase SSR (`@supabase/ssr`) checando sessão antes de liberar acesso ao grupo `(dashboard)`, redirecionando para login se não autenticado. Ainda não implementado.
- A rota pública `/[slug]` permanece sem autenticação, pois é a página vista pelo consumidor final.

---

## 4. Páginas e rotas

Rotas que **existem de fato** no código hoje (`src/app`):

| Rota | Arquivo | O que faz |
|---|---|---|
| `/` | `src/app/page.tsx` | Landing simples: título "Biosite Platform", texto avisando que o painel/builder ainda estão em construção, e um botão que leva ao biosite de exemplo (`/sabor-arte-bistro`). |
| `/[slug]` | `src/app/(public)/[slug]/page.tsx` | Página pública do biosite. Busca dados via `getBiositeBySlug` (`src/lib/get-biosite.ts`) na tabela `biosites` do Supabase; slug sem registro retorna `notFound()`. Hoje só existe o registro `sabor-arte-bistro` (seed em `supabase/migrations/`). Renderiza `<BiositePage>` com todas as seções (ver componentes abaixo). |

Rotas **planejadas, ainda inexistentes no código**: `(dashboard)/produtor/*`, `(dashboard)/cliente/*`, `(dashboard)/builder/*`, `api/track`, `api/domains`, `/preview/[template]`.

### Componentes que compõem a página `/[slug]` (todos em `src/components/biosite/`)
Renderizados em ordem por `BiositePage.tsx`:
1. `BiositeHeader` — logo (96px), nome, selo verificado, botão compartilhar (Web Share API com fallback de copiar link).
2. `StoriesRow` + `StoriesViewer` — bolhas de categoria centralizadas; toque abre visualizador fullscreen estilo Instagram (progresso automático, navegação por toque nas laterais).
3. `StatusPill` — "ABERTO AGORA"/"FECHADO", calculado por `src/lib/business-hours.ts` a partir de `businessHours` + `statusOverride`.
4. `HeroCarousel` — carrossel automático (troca a cada 4.5s) com badge central editável (ex: "MAIS PEDIDO 🔥").
5. `ScarcityBar` — faixa de urgência com marquee infinito ("Promoção Só Hoje", etc.).
6. `SocialProof` — avatares + "+500 pedidos..." + estrelas; seção inteira pode ser desligada (`enabled`).
7. `BlocksList` — lista de botões reordenáveis (WhatsApp "Peça Agora", Wi-Fi, PIX, links genéricos), cada um abre popup de QR (`QrModal`) quando aplicável.
8. `BentoGallery` — "Destaques da Casa" (título centralizado e editável), carrossel automático (3.5s) de até 6 produtos no formato 4:5 (padrão Instagram).
9. `CombosSection` — até 3 combos, card em destaque com borda/botão de brilho pulsante (`glow-ring`/`pulse-cta` em `globals.css`), cor do preço riscado customizável.
10. `TestimonialsSection` — depoimentos, seção desligada por padrão (`enabled: false` no mock).
11. `StoreGallery` — seção "Nossa Loja" (título editável) com grade de até 4 fotos.
12. `LocationBlock` (dentro de `BlocksList.tsx`) — card de localização com mapa e link para o Google Maps.
13. `FooterCredit` — rodapé fixo com CTA sutil "Quer um biosite igual a este? Fale pelo WhatsApp".

Toda a paleta de fundo do biosite é controlada por uma única CSS var (`--biosite-bg`), definida via `style` inline em `BiositePage.tsx` a partir de `data.backgroundColor`.

---

## 5. Integrações ativas

Nenhuma integração de API externa está "ativa" em tempo de execução hoje (sem chamadas de rede a serviços de terceiros a partir do backend, porque não há backend). O que existe:

| Integração | Tipo | Como é usada | Variável de ambiente? |
|---|---|---|---|
| WhatsApp (`wa.me`) | Deep link, sem API/token | Links `https://wa.me/{numero}?text=...` montados no client para os botões "Peça Agora", "Pedir" (bento) e "Adicionar ao Pedido" (combos) | Não — número de telefone hoje é um valor fixo em `src/lib/mock-biosite.ts` (`whatsappNumber`) |
| `qrcode` (npm) | Biblioteca local, sem serviço externo | Gera a imagem do QR Code (Wi-Fi e PIX) inteiramente no navegador, via `QRCode.toDataURL()` em `src/components/biosite/QrModal.tsx` | Não |
| Payload PIX (BR Code/EMV) | Lógica própria, sem API do Banco Central | `src/lib/pix.ts` monta a string padrão EMV com checksum CRC16 localmente | Não |
| Imagens mockadas (Unsplash, i.pravatar.cc) | URLs públicas de placeholder | Usadas só nos dados de exemplo (`mock-biosite.ts`) para simular fotos de produto/avatares | Não |
| Supabase | `@supabase/supabase-js` conectado ao projeto `ariusbios` | Client em `src/lib/supabase.ts`, leitura pública de `/[slug]` via `src/lib/get-biosite.ts`. `@supabase/ssr`/Auth ainda não usados | Parcial (leitura pública já em produção) |
| SuperDesign | Ferramenta de design (CLI), usada só durante o desenvolvimento | Gerou o HTML de referência em `design-reference/bento-commerce.html`; não faz parte do runtime do app | Não se aplica (não roda em produção) |
| Vercel Domains API | Planejada, não implementada | Usada futuramente para o produtor conectar domínio próprio (`api/domains`) | Planejado |

---

## 6. Variáveis de ambiente (.env)

**`.env.local` existe e é lido** (`src/lib/supabase.ts`). Não commitado (`.gitignore` já ignora `.env*`) — se o projeto for clonado em outra máquina, precisa recriar esse arquivo (valores abaixo, ou via `supabase projects api-keys --project-ref eiwjmeerlsowclcmqilb`).

### Variáveis em uso hoje:

| Variável | Onde obter | Uso atual |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Painel do Supabase → Project Settings → API → Project URL | URL do projeto `ariusbios`, usada em `src/lib/supabase.ts` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Painel do Supabase → Project Settings → API → chave `anon`/`publishable` | Chave pública, só permite `select` em `biosites` (RLS) |

### Variável prevista para quando existir escrita server-side (Fase 2+, ex: `api/track`):

| Variável | Onde obter | Uso planejado |
|---|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | Painel do Supabase → Project Settings → API → `service_role`/`secret` key | Chave privada para operações server-side que ignoram RLS; **nunca expor no client** |

### Variáveis adicionais previstas para fases futuras:

| Variável | Uso planejado |
|---|---|
| `VERCEL_API_TOKEN` (ou similar) | Autenticar chamadas à Vercel Domains API no endpoint `api/domains`, para o produtor conectar domínio próprio |

---

## Observação final para uso deste documento como contexto de IA

Este projeto saiu do "só mock": existe o **template público do biosite**, com design finalizado (via SuperDesign) e convertido em componentes React reais, já lendo de um banco Supabase real (`ariusbios`) em vez de dado estático. Ainda **sem autenticação e sem painel administrativo** — cadastro de biosite novo é manual (migration/dashboard), não existe builder. Qualquer sugestão de código que dependa de sessão de usuário ou rotas de dashboard deve primeiro **criar essa infraestrutura**, não assumir que ela já existe. O roadmap completo e as decisões de produto já tomadas estão em `/Users/euerickwilliam/.claude/plans/spicy-dazzling-journal.md`.
