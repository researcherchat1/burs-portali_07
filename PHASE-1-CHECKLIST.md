# Mərhələ 1 — Checklist

**Məqsəd:** SaaS-dən **Navbar + Pricing + FAQ + Sponsors** inteqrasiyası.  
**Qaydalar:** Protokol 1 + Konstitusiya §7 + **§8** (senzura/budama avtomatik; report edilir).

**Yekun (alınır):**
1. Navbar  
2. Pricing (`enabled`, admin)  
3. FAQ (`enabled`, admin)  
4. Sponsors (`enabled`, admin)

**Alınmır (Mərhələ 1):** Hero, Footer, CTA, DemoBanner, Clerk, DB, tam i18n, kabinet

---

## 0. Sərhədlər (dəyişməz)

- [ ] Kök: `burs-portal` (Payload + Next)
- [ ] **GƏLMİR:** Clerk, SaaS DB/Drizzle, DemoBanner, tam i18n routing
- [ ] SaaS yalnız UI mənbəyi; auth/DB Payload-da qalır

---

## 1. Budama (SaaS-dən götürəndə silinəcək asılılıqlar)

- [ ] `next-intl` / `useTranslations` → sadə AZ string və ya lokal props
- [ ] Clerk / sign-in linkləri → silinir və ya Payload/placeholder
- [ ] DemoBanner, Pricing-ə bağlı ödəniş SDK → yox
- [ ] Importlar yalnız kökdə mövcud paketlərdən (və ya köçürülmüş lokal fayllardan)

---

## 2. Admin (Payload) — data + açar

Hər biri üçün Global (və ya collection):

### 2.1 Pricing
- [ ] Global: `pricing`
- [ ] Sahə: `enabled` (checkbox, default **false**)
- [ ] Sahələr: planlar (ad, qiymət, xüsusiyyətlər, CTA mətn/link) — SaaS Pricing strukturuna uyğun sadələşdirilmiş
- [ ] Admin-də görünür və redaktə olunur

### 2.2 FAQ
- [ ] Global: `faq`
- [ ] Sahə: `enabled` (default **false**)
- [ ] Sahələr: sual/cavab siyahısı (array)
- [ ] Admin-də görünür və redaktə olunur

### 2.3 Sponsors
- [ ] Global: `sponsors`
- [ ] Sahə: `enabled` (default **false**)
- [ ] Sahələr: loqo (Media) + ad + link (array)
- [ ] Admin-də görünür və redaktə olunur

---

## 3. UI köçürmə (SaaS → kök)

### 3.0 Navbar
- [ ] `Navbar` (+ lazımi Logo / menu parçaları) → kökə
- [ ] §8 budama: Clerk Sign in/up → placeholder; dil switcher bu mərhələdə yox
- [ ] Menyü linkləri burs portalına uyğun (AZ)
- [ ] Budama reportu (nə silindi + səbəb)

### 3.1 Pricing / FAQ / Sponsors
- [ ] `Pricing` template/feature → budanmış
- [ ] `FAQ` template/feature → budanmış
- [ ] `Sponsors` template/feature → budanmış
- [ ] Lazımi UI kit (button/badge/accordion — yalnız bunlar üçün)
- [ ] Data **yalnız** Payload globals-dan (hardcode SaaS mətn yox)
- [ ] Budama reportu

---

## 4. Public sayt davranışı

- [ ] `enabled === false` → section **render olunmur** (gizli)
- [ ] `enabled === true` → section görünür
- [ ] Build/dev: gizli olsa belə, səhv import **error vermir** (§7)
- [ ] Ana səhifə (və ya uyğun route) bu üç section-u şərtlə birləşdirir

---

## 5. Smoke test (Mərhələ 1 bitmə şərti)

- [ ] `pnpm dev` xətasız
- [ ] `localhost:3000` açılır; Pricing/FAQ/Sponsors **görünmür** (`enabled=false`)
- [ ] `/admin` → üç global redaktə olunur
- [ ] Birini `enabled=true` + Publish → public-də **yalnız o** görünür
- [ ] Yenidən `false` → yox olur
- [ ] Clerk/DB/i18n regressiyası yoxdur

---

## 6. Checkpoint

- [ ] `CHECKPOINT.md` → növbəti versiya (`v6`…) + “Mərhələ 1 tamam” qeydi
- [ ] `UI-INTEGRATION-PLAN.md` ilə uyğunluq saxlanılır

---

## Mərhələ 1-ə daxil DEYİL (sonra)

- Navbar / Hero / Footer / burslar siyahısı (ayrı dilim və ya Mərhələ 2 UI)
- DemoBanner
- tam i18n (AZ/RU/EN)
- Kabinet, ödəniş gateway

> Qeyd: Əgər ana səhifə hələ Payload template-dirsə, Mərhələ 1 section-ları mövcud frontend layout-a şərtlə taxılır; tam SaaS shell ayrıca addım ola bilər.
