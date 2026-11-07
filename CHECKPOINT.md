# Checkpoint — Burs Portalı

**Versiya:** `v37`  
**Tarix:** 2026-10-12

### Versiya tarixçəsi

| Ver | Tarix | Qısa |
|-----|--------|------|
| v1 | 2026-09-24 | İlk checkpoint: Protokol 1, məhsul qərarları, UI gözləyir, qurulum növbəti |
| v2 | 2026-09-24 | Qurulum tamamlandı (Mongo lokal/dev, admin OK, 3.90.2 sync); UI hələ başlamayıb |
| v3 | 2026-09-24 | Ayrı `Burslar` collection əlavə olundu; admin-dən burs əlavə yolu açıldı; public UI hələ yox |
| v4 | 2026-09-24 | Burslara `Şəkil` (Media upload) sahəsi əlavə olundu |
| v5 | 2026-09-24 | UI üsulu düzəldildi: SaaS-dən köçür+budama; seçim planı `UI-INTEGRATION-PLAN.md` |
| v6 | 2026-09-25 | Dilim A tamam: SaaS UI kit |
| v7 | 2026-09-25 | Dilim B tamam: Globals Pricing/FAQ/Sponsors + enabled |
| v8 | 2026-09-25 | Dilim C tamam: Landing section UI + Payload |
| v9 | 2026-09-25 | Dilim D tamam: Navbar |
| v10 | 2026-09-25 | Dilim E tamam: LandingBlocks home |
| v11 | 2026-09-25 | UI polish: HomeHero + SaaS layout |
| v12 | 2026-09-25 | **Mərhələ 1 DONE** (Dilim F); növbəti: public burslar UI / Footer |
| v13 | 2026-09-25 | SaaS Footer UI kökə; admin Footer global (nav/legal/social) |
| v14 | 2026-09-25 | Mərhələ 2 Dilim A: Burslar deadline + slugField/ASCII |
| v15 | 2026-09-25 | Mərhələ 2 Dilim B: BursCard + BursGrid UI |
| v16 | 2026-09-25 | Mərhələ 2 Dilim C: /burslar + ana səhifə grid (Payload) |
| v17 | 2026-09-25 | Mərhələ 2 Dilim D: /burslar URL filter (ölkə/kateqoriya/səviyyə/deadline) |
| v18 | 2026-09-25 | Mərhələ 2 Dilim E: /burslar/[slug] detal + rəsmi müraciət |
| v19 | 2026-09-25 | **Mərhələ 2 DONE** — 20 seed burs + Dilim F |
| v20 | 2026-09-27 | Mərhələ 3 Dilim A: `musteriler` kolleksiyası (auth + saxlanmış burs) |
| v21 | 2026-09-27 | Mərhələ 3 Dilim B: /giris və /qeydiyyat (`musteri-token`) |
| v22 | 2026-09-27 | Mərhələ 3 Dilim C: /kabinet profil və çıxış |
| v23 | 2026-09-27 | Mərhələ 3 Dilim D: burs saxla / çıxar, kabinet siyahısı |
| v24 | 2026-09-27 | **Mərhələ 3 DONE** — Navbar Giriş/Kabinet |
| v25 | 2026-09-27 | Kabinet görünüşü: açıq menyu, bənövşəyi–çəhrayı vurğu, burs sətirləri |
| v26 | 2026-09-28 | Bannerlər addım 1: admin kolleksiyası. Saytda hələ yox |
| v27 | 2026-09-28 | Ana səhifə sol/sağ kənar banner. Digər səhifələrdə hələ yox |
| v28 | 2026-10-01 | `/burslar` sol/sağ kənar banner. Detal hələ yox |
| v29 | 2026-10-01 | Burs detalı sol/sağ kənar banner |
| v30 | 2026-10-02 | Sayğac qərarı: GA4 (ümumi trafik) + Payload/Mongo (biznes sayları) |
| v31 | 2026-10-02 | Sayğac mərhələ 1: `saylar` anbarı. Sayt hələ yazmır |
| v32 | 2026-10-02 | Sayğac mərhələ 2: səhifə və burs baxışı yazılır. Klik hələ yox |
| v33 | 2026-10-02 | Platforma sayğacı saxlanıldı. İndi yalnız GA4. Öz sayğaclara sonra qərar |
| v34 | 2026-10-05 | MVP: burs, sertifikat, az banner, kabinet. SAAS canlıdan sonra |
| v35 | 2026-10-10 | Kurslar: admin, /kurslar, detal, ana səhifə paneli, 8 seed kurs |
| v36 | 2026-10-11 | FAQ ana səhifədən çıxdı. Açılan suallar `/faq` səhifəsindədir |
| v37 | 2026-10-12 | Footer: 3 sütun, altda müəllif sətri və Light |

## Protokol 1 (dəyişməz)

- **Kök:** Payload + Next = yeganə onurğa
- Kontent, burs elanları, admin, public site bu kökdə yaşayır
- Yeni repo gələndə ikinci kök yox — yalnız bu kökə qoşulan parça

## Qəbul edilmiş məhsul qərarları

- Dillər (plan): AZ / RU / EN
- Kontent ≠ burs elanı (ayrı modellər)
- Admin rolları olacaq
- Burs minimum sahələr: ölkə, təhsil səviyyəsi, rəsmi link, kateqoriya (+ artım ehtimalı)
- Kabinet MVP: login + profil + saxlanmış burslar
- Müraciət: istifadəçi rəsmi linkə özü gedir
- Gələcək: premium xidmətlər, reklam banner yerləri

## DB strategiyası

- **Lokal/dev:** MongoDB (service `RUNNING`, `DATABASE_URL=mongodb://127.0.0.1/burs-portal`)
- **PROD DB:** server mərhələsində qurulacaq (Postgres indi mütləq deyil)
- Səbəb: şirkət kompunda veri yükləmə/çıxarma riski — əvvəl development tamamlanır

## Qurulum statusu — TAMAMLANDI

- [x] `pnpm install` (paketlər `3.90.2`)
- [x] `.env` dolduruldu
- [x] Lokal Mongo quraşdırıldı və işləyir
- [x] `pnpm dev` — `http://localhost:3000` OK
- [x] `http://localhost:3000/admin` OK
- [x] Template `main` ≠ paket uyğunsuzluğu həll olundu (kod **3.90.2** ilə sync)

### Texniki qeyd (kök səbəb, həll olundu)

Əvvəl kod Payload `main` template-indən, paketlər npm `3.90.2` idi → API uyğunsuzluğu.  
İndi kod paketlə eyni nəsildədir.

## Harada dayandıq

- **Mərhələ 2 tamamlandı (A–F)** — burs UI + filter + detal + 20 seed
- **Mərhələ 3 tamamlandı (A–E)** — müştəri kabineti: giriş, profil, saxlanmış burs, navbar
- Kabinet ekranı (v25): açıq yan menyu, bənövşəyi–çəhrayı vurğu, saxlanmış burslar üfüqi siyahı
- **Bannerlər:** ana səhifə, `/burslar` və burs detalı — sol/sağ kənar. Hər səhifə öz **Yer** dəyərini göstərir
- **Sayğac:** platforma tərəfi saxlanıldı. `saylar` mərhələ 1–2 kodda qalır, davamı yoxdur. Növbəti ölçmə yalnız GA4
- **MVP:** dolu burslar, sertifikat yönləndirmələri, az banner, müştəri kabineti. SAAS, blog, reytinq və ödəniş canlıdan sonra
- **Kurslar (v35):** ayrı `kurslar` kolleksiyası, `/kurslar` + filter, `/kurslar/[slug]`, ana səhifə paneli, menyu. Seed: `pnpm seed:kurslar` (yalnız `[seed-kurs-v1]`). Kabinetdə saxla, banner və sayğac yoxdur
- **FAQ (v36):** açılan suallar ana səhifədə yox, `/faq` səhifəsindədir. Məlumat admin FAQ qlobalında qalır
- **Footer (v37):** Marka, Hüquqi, Sosial. Ən altda müəllif sətri və Light. Yeni sütun və link admin **Footer** qlobalından əlavə olunur

## Növbəti addım (təklif)

→ MVP: ana səhifədə yalnız açıq burslar, sonra sertifikat yönləndirmələri (icazə)

## Qeyd

- **Qərar (SaaS və digər repolar):** ikinci kök yox. Üsul = **köçür + budama**
- “Yalnız nümunəyə baxıb sıfırdan yazmaq” — **seçilməyib**
- Konstitusiya: izinsiz kod yox; CMD Ayxana verilir; PowerShell yox; əvvəl `cd`
