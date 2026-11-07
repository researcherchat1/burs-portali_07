# Mərhələ 1 — Implementasiya planı (hissə-hissə)

**Məqsəd:** prosesi kiçik dilimlərə bölmək — tələsmədən, §7/§8 ilə təhlükəsiz.  
**Alınır:** Navbar, Pricing, FAQ, Sponsors.  
**Gəlmir:** Clerk, SaaS DB, Hero, Footer, CTA, DemoBanner, tam i18n.

**İş qaydası:** hər dilim bitəndə Ayxana qısa status + (budama varsa) §8 report → növbəti dilimə **ayrıca izin** ilə keçid.

---

## Dilim A — Zəmin (asılılıqlar / UI kit)

**Status:** ✅ tamamlandı (2026-09-25)

**Nə edilir**
- Pricing/FAQ/Sponsors/Navbar üçün lazım olan minimal UI parçaları (button, badge, accordion və s.)
- SaaS-dən köçür + §8 budama (Clerk/i18n importları çıxır)

**Bitmə şərti**
- Fayllar kökdə durur, build/import xətası yoxdur
- Hələ public səhifədə görünüş dəyişməyə bilər

**§8 report:** budanan importlar/paketlər

---

## Dilim B — Payload Globals (admin data)

**Status:** ✅ tamamlandı (2026-09-25)

**Nə edilir**
- Globals: `pricing`, `faq`, `sponsors`
- Hər birində `enabled` (default `false`) + məzmun sahələri
- `payload.config.ts`-ə qoşulur

**Bitmə şərti**
- `/admin`-də üç global görünür və saxlanılır
- Public-də hələ görünməyə bilər

---

## Dilim C — Pricing / FAQ / Sponsors UI → data bağlama

**Status:** ✅ tamamlandı (2026-09-25)

**Nə edilir**
- Üç section komponenti köçürülür, budanır
- Data yalnız Payload globals-dan
- `enabled !== true` → render yox

**Bitmə şərti**
- Kod compile olur
- Section-lar ana layout-a taxılmağa hazırdır (`LandingBlocks`) — Dilim E-də taxılacaq

**§8 report:** nələr budandı

---

## Dilim D — Navbar

**Status:** ✅ tamamlandı (2026-09-25)

**Nə edilir**
- Navbar (+ Logo/menu) köçürülür
- Sign in/up → placeholder (Clerk yox) → `/admin` “Giriş”
- Dil switcher bu dilimdə yox
- Linklər AZ / burs portalına uyğun

**Bitmə şərti**
- Navbar public layout-da görünür
- Auth/i18n error yoxdur

**§8 report:** Clerk/i18n budaması

---

## Dilim E — Ana səhifəyə birləşdirmə + smoke

**Status:** ✅ tamamlandı (2026-09-25)

**Nə edilir**
- Frontend home: Navbar (D) + (şərtlə) Pricing/FAQ/Sponsors
- `enabled=false` → sectionlar görünmür
- Global xəta olarsa section `null` (səhifə sındırmır)

**Bitmə şərti (Mərhələ 1 DONE — yoxlama Ayxanda)**
- [ ] `pnpm dev` sabit
- [ ] Navbar görünür
- [ ] Üç section default gizli
- [ ] `enabled=true` → yalnız o görünür
- [ ] Clerk/DB regressiyası yox

---

## Dilim F — Sənədləşmə

**Status:** ✅ tamamlandı (2026-09-25)

**Nə edilir**
- `CHECKPOINT.md` → Mərhələ 1 tamam
- Checklist uyğunluğu

---

## Nə vaxt dayanırıq

Hər dilimdən sonra: qısa report → Ayxanın “növbəti dilimə keç” izni.  
Agent bir oturumda bütün A–F-i tələsik bitirməyə çalışmır.
