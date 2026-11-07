# UI inteqrasiya planı — SaaS → burs-portal (Protokol 1)

**Tarix:** 2026-09-24  
**Üsul:** köçür + budama (ikinci kök yox; Clerk/Postgres/Drizzle gəlmir)

## Mənbə
`SaaS-Boilerplate-main/SaaS-Boilerplate-main` marketing landing

## Götürüləcək (1-ci dilim — ana sayt UI)

| # | SaaS faylı / blok | Nə üçün |
|---|-------------------|---------|
| 1 | `templates/Navbar.tsx` + `features/landing/CenteredMenu.tsx` | Üst menyu shell |
| 2 | `templates/Logo.tsx` | Brand nişanı |
| 3 | `templates/Hero.tsx` + `features/landing/CenteredHero.tsx` | Ana hero |
| 4 | `features/landing/Section.tsx` | Bölmə wrapper |
| 5 | `templates/Features.tsx` + `FeatureCard.tsx` | Kart grid (burs kartlarına uyğunlaşdırılacaq) |
| 6 | `templates/CTA.tsx` + `CTABanner.tsx` | Aşağı CTA |
| 7 | `templates/Footer.tsx` + `CenteredFooter.tsx` | Footer — **DONE (v13)** |
| 8 | `components/ui/button*` , `badge*` | Dizayn tokenləri / düymələr |
| 9 | `styles/global.css` (lazımi hissə) | SaaS görünüşünün əsası |

Landing page tərkibi (SaaS `page.tsx`): Navbar → Hero → … → CTA → Footer  
Bizdə: **Navbar → Hero → Burslar siyahısı (Payload data) → CTA → Footer**

**Mərhələ 1 (Pricing / FAQ / Sponsors):** ətraflı checklist → `PHASE-1-CHECKLIST.md`  
(admin + `enabled` + budanmış UI; Auth/DB/i18n gəlmir)

## Budanacaq / gətirilməyəcək

| Blok | Səbəb |
|------|--------|
| Clerk / sign-in / dashboard / org | İkinci auth kökü |
| Drizzle / DB / Env billing | İkinci DB |
| `next-intl` tam routing (ilk dilimdə) | Sonra; indi AZ mətn |
| DemoBanner, Sponsors, Pricing, FAQ | İndi lazım deyil (sonra gələ bilər) |
| LocaleSwitcher (ilk dilimdə) | Sonra AZ/RU/EN |

## Kökdə oturacaq yer
`burs-portal` → `src/app/(frontend)/`  
Payload Header/Footer globals əvəzinə (və ya yanına) SaaS shell — **public site**.  
`/admin` toxunulmur.

## Uyğunlaşdırma (kiçik, məcburi)
- Linklər: Burslar, Kontent, Giriş (placeholder)
- Hero mətnləri: burs portalı
- Features grid → published `burslar` (şəkil, ölkə, səviyyə, rəsmi link)
- `next-intl` asılılığını ilk dilimdə sadə stringlə əvəz (və ya minimal stub)

## İcra sırası (izinlə, növbəti)
1. UI kit + Section + Navbar/Footer/Hero köçür  
2. Ana səhifəni SaaS shell ilə əvəz et  
3. Burslar siyahısını Payload-dan bağla  
4. Burs detal səhifəsi  
5. Checkpoint vN yenilə
