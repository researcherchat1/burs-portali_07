# Burs Portalı — yeni söhbət üçün giriş

**Canlı vəziyyət:** `CHECKPOINT.md` → **v37** (2026-10-12)  
**Qaydalar:** `Konstitusiya.md`  
Bu fayl köhnə söhbəti əvəz edir. Tarixçənin tam siyahısı checkpoint-dədir.

Yeni söhbətin ilk işi: bu fayl, `Konstitusiya.md`, `CHECKPOINT.md` və `development-desk.md` oxunsun. Sonra kod.

**Ad:** `boiler` = `SaaS-Boilerplate-main` (UI mənbəyi). Clerk və onun verilənlər bazası gəlmir.

---

## Layihə nədir

Təqaüd və burs elanlarını bir yerdə toplayan sayt. İstifadəçi elanı tapır, oxuyur və müraciəti **özü rəsmi səhifədə** edir. Platforma müraciəti qəbul etmir.

Kontent (səhifə, qaydalar, gələcək korporativ blog) burs elanından **ayrı** modeldir.

## Yekun şəkil

- İctimai sayt: ana səhifə, burs siyahısı və filter, burs detalı, rəsmi link. Kurslar eyni axınla: panel, `/kurslar`, detal, **Kursa keç**. Pricing və sponsorlar ana səhifədə, admin-dən. FAQ ayrıca `/faq` səhifəsindədir. Footer admin-dəndir.
- Dillər (plan): AZ / RU / EN. Tam i18n hələ yoxdur.
- Admin: burslar, kurslar, səhifələr, menyu, footer, rollar (rollar hələ yoxdur).
- Müştəri hesabı: giriş, profil, saxlanmış burslar.
- Pullu təbəqə: SAAS paketləri, reklam bannerləri, korporativ blog.
- Sayğaclar: gündəlik istifadəçi və platforma–müştəri statistikası, admin-də.

## Beş vacib mövzu (hamısı admin-dən)

Müştəri hesabı hazırdır. Banner ana səhifədə, `/burslar` siyahısında və burs detalındadır. Qalan üç mövzu hələ yoxdur. Sıra və ödəniş anı ayrıca qərardır.

1. **SAAS** — satılan paketlər. Bu, SaaS boilerplate deyil. Boilerplate yalnız UI mənbəyidir və artıq köçürülüb. İndiki Pricing bölməsi vitrindir, ödəniş sistemi deyil. Korporativ blog xüsusi paket ola bilər.
2. **Müştəri hesabı** — **hazır** (Dilim A–E). Ayrı `musteriler` kolleksiyası. `Users` yalnız admindir. Səhifələr: `/giris`, `/qeydiyyat`, `/kabinet`. Navbar: girişsiz **Giriş**, girişli **Kabinet**. Boiler dashboard götürülməyib.
3. **Reklam bannerləri** — admin kolleksiyası `bannerler`. Ana səhifə, `/burslar` və burs detalı geniş ekranda sol və sağ kənarda bir-bir banner göstərir. Hər səhifə öz **Yer** dəyərini oxuyur. **Saytda göstər** söndürüləndə gizlənir.
4. **Sayğaclar** — indi yalnız **Google Analytics (GA4)**. Platformadakı öz sayğac (`saylar`) dayandırılıb: mərhələ 1–2 kodda qalır, davamı yoxdur. Hansı sayğacları özümüz quracağımıza iş getdikcə qərar veriləcək. Umami, Plausible və oxşar ikinci proqram gətirilmir.
5. **Korporativ blog** — şirkət özü haqqında məlumat verir, platforma bunun üçün ödəniş alır. Burs elanı deyil.

## Protokol 1

- Kök: **Payload + Next** (`burs-portal`). İkinci auth və ikinci DB yoxdur.
- Başqa repo gələndə üsul: **köçür + budama**. Sıfırdan “nümunəyə baxıb yazmaq” seçilməyib.
- `/admin` Payload adminidir. Public sayt `src/app/(frontend)/`.

## Konstitusiya (qısa)

- Koddan əvvəl **Ayxandan** izin.
- Komutları agent işlətmir: hazır **CMD**, hər biri ayrı sətirdə, əvvəl `cd`. PowerShell yoxdur.
- Budama avtomatikdir. “Budayaqmı?” soruşulmur. Yalnız report: nə budandı və niyə.
- İnteqrasiya sistemi sonrakı addımlarda sındırmamalıdır (`enabled` və ya aydın sərhəd).
- Hər checkpoint yeniləməsində versiya (`vN`).
- Ciddi proses backend + DB ilə gedir. `localStorage` yalnız xırda və təhlükəsiz işdə, və yalnız Ayxanın icazəsindən sonra (Konstitusiya §9).

## İndi hazırdır (v27)

- Qurulum: Payload 3.90.2, Next 16, lokal Mongo (`mongodb://127.0.0.1/burs-portal`). Prod DB sonra.
- Mərhələ 1: Navbar, Hero, Pricing / FAQ / Sponsors (`enabled`), Footer (admin: brand, nav, legal, social).
- Mərhələ 2: burs `deadline`, ASCII slug, `BursCard` / `BursGrid`, `/burslar` + filter (ölkə, kateqoriya, səviyyə, deadline), `/burslar/[slug]`, ana səhifədə ən çox 6 kart, Navbar → `/burslar`.
- Seed: 5 kateqoriya + 20 published burs (şəkilsiz). `pnpm seed:burslar` və ya dev-də `GET /next/seed-burslar`.
- Admin-dən adi səhifə: Pages + slug (latın, məs. `platforma-qaydalari`). Publish səhifəni ana səhifəyə yapışdırmır. Footer və ya menyuya Internal link lazımdır.
- Filter localStorage deyil. URL query + Payload `where`.
- Mərhələ 3: müştəri kabineti (giriş, profil, saxlanmış burs, navbar).
- Bannerlər: admin kolleksiyası + ana səhifə, `/burslar` və burs detalı sol/sağ kənar (geniş ekran, hər tərəfdə bir ədəd).
- Kurslar (v35): admin `kurslar`, ana səhifə paneli, `/kurslar` (universitet, kateqoriya, dil), `/kurslar/[slug]`. Seed: `pnpm seed:kurslar` və ya dev-də `GET /next/seed-kurslar`. Yalnız `[seed-kurs-v1]` yazılan kurslar yenilənir. Saxlanmış kurs, kurs banneri və kurs sayğacı yoxdur.
- FAQ (v36): sual-cavab açılan siyahısı `/faq` səhifəsindədir. Ana səhifədə FAQ paneli yoxdur. Məlumat admin FAQ qlobalındadır.
- Footer (v37): üç sütun (Marka, Hüquqi, Sosial). Ən altda müəllif sətri və Light. Yeni sütun və link admin Footer qlobalından əlavə olunur. Əlaqə və FAQ footerdə yoxdur.

## Qalan işlər (MVP, canlıya çıxış)

Məqsəd tez canlıya çıxmaqdır. MVP: dolu burslar, sertifikat yönləndirmələri, az banner, müştəri kabineti. Kabinet və banner mexanizmi hazırdır.

1. **Açıq burslar** — ana səhifədə vaxtı keçmiş elan önə çıxmasın.
2. **Sertifikat yönləndirmələri** — siyahı və qısa səhifə. Ana səhifədə bursun yanında görünsün.
3. **Pricing vitrini** — canlı saytda söndürülsün. Paket hələ satılmır.
4. **Haqqında** — saytı kimin idarə etdiyi, qısa səhifə.
5. **Real məzmun** — 20 test bursu canlıya çıxmasın. Yerini real elan və bir neçə sertifikat linki tutsun.
6. **Banner məzmunu** — mexanizm hazırdır. Reklam yoxdursa tərəflər boş qalır.
7. **Prod** — server, domen, prod bazası. İndi lokal Mongo.
8. **Google Analytics** — ölçmə nömrəsi (`G-...`) gələndə qoşulur. Açılışı saxlamır.

## Canlıdan sonra

1. **SAAS paketləri** — kütlə yığılandan sonra. Satılan paket və ödəniş. İndi qurulmur.
2. **Korporativ blog** — müəssisənin abunə ilə aldığı yazı yeri. Burs elanı deyil.
3. **Dillər** — AZ / RU / EN.
4. **Admin rolları** — kim nəyi redaktə edir.
5. **SaaS CTA və DemoBanner** — plandadır, bu çıxışa gətirilmir.
6. **Google ilə giriş** — hesab yenə Mongo-da qalacaq.
7. **Reytinq və mükafat** — populyarlıqdan sonra. Sponsorlu tədbir ola bilər.

## Sənədlər

| Fayl | Etibar |
|------|--------|
| `CHECKPOINT.md` | Canlı status və v1–v19 |
| `development-desk.md` | Development boyu qəbul olunan dəyişən qərarlar |
| `Konstitusiya.md` | Məcburi qaydalar |
| `PHASE-2-BURSAR-PLAN.md` | Dilim statusları (A–F ✅). “Artıq var” cədvəli köhnəlib |
| `PHASE-1-IMPL-PLAN.md` | Mərhələ 1 dilimləri ✅ |
| `PHASE-1-CHECKLIST.md` | Məqsəd düzgündür. Checkbox-lar yenilənməyib |
| `UI-INTEGRATION-PLAN.md` | UI mənbə siyahısı. Bəzi “gətirilməyəcək” sətirləri köhnədir. Canlı vəziyyət checkpoint-dir |

## İşə başlamaq

Server komutu istənəndə şərhsiz, yalnız aşağıdakı iki sətir (Konstitusiya §2):

```bat
cd /d c:\Users\aykhan.asgarli\Downloads\burs-portal
pnpm dev
```

Ünvanlar: `http://localhost:3000` · `/burslar` · `/admin`

Demo boilerplate (yalnız baxış): https://react-saas.com
