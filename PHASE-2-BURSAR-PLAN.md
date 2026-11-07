# Mərhələ 2 — Burslar (yekun plan)

**Tarix:** 2026-09-25  
**Checkpoint başlanğıc:** v13  
**Üsul:** SaaS kart/grid köçür + budama → Payload `burslar`  
**Gəlmir:** Clerk, kabinet, ödəniş, tam i18n routing  

---

## Nəticə (bitəndə nə olacaq)

1. **Admin** — Burslar panelində burslar görünür (o cümlədən ~20 test burs).  
2. **Ana səhifə** — burs grid (və ya “son burslar”) görünür.  
3. **`/burslar`** — tam siyahı + **filter** (ölkə, kateqoriya, təhsil səviyyəsi; deadline göstərici).  
4. **`/burslar/[slug]`** — detal səhifə.  
5. **Bağlantılar işlək:**  
   Navbar/Footer “Burslar” → siyahı → kart → detal → rəsmi müraciət linki.  
6. Filter seçiləndə griddə **yalnız uyğun** nəticələr.

**Test məqsədi:** filter + grid real data ilə yoxlanır (20 random burs).

---

## Artıq var

| Element | Status |
|---------|--------|
| Admin **Burslar** collection | ✅ (title, şəkil, ölkə, səviyyə, kateqoriya, rəsmi link, summary, slug, draft) |
| SaaS FeatureCard / Features | ✅ mənbədə var — kökə köçürüləcək |
| Public grid / filter / detal | ❌ |
| `deadline` sahəsi | ❌ |
| 20 test burs | ❌ (seed icazəsi verilib) |

---

## Dilimlər (sıra ilə, izinlə)

### Dilim A — Payload hazırlıq
**Status:** ✅ tamamlandı (2026-09-25)

- `deadline` (date) sahəsi  
- `slugField()` + ASCII slug (`toAsciiSlug` + beforeChange)  
- Admin default columns: + `deadline`  
- `defaultPopulate`: title, slug, country, educationLevel, deadline  

**Bitmə:** admin-də deadline saxlanır, slug etibarlıdır.

### Dilim B — Kart + grid UI
**Status:** ✅ tamamlandı (2026-09-25)

- `BursCard.tsx` — SaaS FeatureCard əsası (şəkil, badge, title, summary, deadline)
- `BursGrid.tsx` — Section + responsive grid
- Budama: `next-intl`, demo icon/Features template mətnləri gəlmədi

**Bitmə:** UI komponentləri kökdə hazırdır (data bağlama = Dilim C).

### Dilim C — Public siyahı
**Status:** ✅ tamamlandı (2026-09-25)

- `getPublishedBurslar` / `mapBursToCard`
- `/burslar` — tam siyahı
- Ana səhifə: `BurslarSection` (max 6) + “Bütün burslara bax”
- Navbar: Burslar → `/burslar`

**Bitmə:** admin published + ana səhifə + `/burslar` eyni datanı göstərir.

### Dilim D — Filter
**Status:** ✅ tamamlandı (2026-09-25)

- URL query: `country`, `category`, `level`, `deadline` (upcoming|past)
- `BursFilters` client UI → `router.push` (localStorage yox)
- Server: Payload `where` + nəticə sayı
- Ana səhifə teaser filtersiz qalır; filter yalnız `/burslar`

**Bitmə:** filter seçiləndə yalnız uyğun kartlar.

### Dilim E — Detal + bağlantılar
**Status:** ✅ tamamlandı (2026-09-25)

- `/burslar/[slug]` — detal (şəkil, badge, summary, deadline)
- “Rəsmi müraciət” → `officialLink` (yeni tab)
- Kart → detal; detal → siyahıya qayıt
- Navbar artıq `/burslar` (Dilim C); Footer admin Internal/Custom link ilə

**Bitmə:** uçdan-uca klik zənciri işləyir.

### Dilim F — Seed (20 test burs) + checkpoint
**Status:** ✅ tamamlandı (2026-09-25)

- 5 kateqoriya (STEM, Humanitar, Biznes, Tibb, İncəsənət)
- 20 published burs (ölkə / səviyyə / deadline fərqli; 12 aktiv + 8 keçmiş)
- Yenidən işə salma: `pnpm seed:burslar` və ya GET `/next/seed-burslar` (yalnız dev)
- Categories `slugField` düzəldildi

**Bitmə:** filter/grid testə hazırdır.

---

## Data modeli (MVP)

| Sahə | Rol |
|------|-----|
| title, slug, image | Kart / detal |
| country | Filter + badge |
| category | Filter + badge |
| educationLevel | Filter + badge |
| deadline | Filter/göstərici (yeni) |
| officialLink | Müraciət düyməsi |
| summary | Qısa mətn |
| _status | Yalnız published public-də |

---

## Qəbul meyarları (smoke)

- [ ] Admin-də ≥20 burs (və ya seed sayı) görünür  
- [ ] Ana səhifədə grid/teaser görünür  
- [ ] `/burslar` açılır, kartlar doludur  
- [ ] Filter dəyişəndə grid dəyişir  
- [ ] Kart → detal → rəsmi link işləyir  
- [ ] Menyudan “Burslar” düzgün ünvanadır  

---

## İş qaydası

Hər dilim bitəndə qısa status → növbəti dilim **ayrıca izin** ilə (Konstitusiya §1 / §7).
