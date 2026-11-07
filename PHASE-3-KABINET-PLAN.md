# Mərhələ 3 — Müştəri kabineti

**Tarix:** 2026-09-27  
**Model qəbul edilib.** Kod bu plandan sonra, dilim-dilim, izinlə.  
**Gəlmir:** Clerk, boiler dashboard, localStorage ilə giriş və ya saxlanmış burs, müraciət forması.

## Nəticə

Müştəri qeydiyyatdan keçir, girir, profilini görür, bursu saxlayır və kabinetdə siyahını görür. Admin paneli köhnə `Users` ilə açılır. Müştəri `/admin` görmür.

## Dilimlər

### A — Verilənlər
**Status:** ✅ tamamlandı (2026-09-27)

Ayrı `musteriler` kolleksiyası (`auth`). Sahələr: ad, saxlanmış burslar (`burslar` əlaqəsi).  
`Users` dəyişmir. `access.admin: false` — müştəri `/admin` aça bilmir.  
Admin paneldə Müştərilər siyahısı görünür. Qeydiyyat səhifəsi Dilim B-dədir.

### B — Giriş
**Status:** ✅ tamamlandı (2026-09-27)

`/giris` və `/qeydiyyat`. Sessiya `musteri-token` (httpOnly). Admin `payload-token` dəyişmir.  
Şifrə ən az 8 simvol. `localStorage` yoxdur. Kabinet səhifəsi Dilim C-dədir.

### C — Kabinet
**Status:** ✅ tamamlandı (2026-09-27)

`/kabinet`: ad, email, çıxış. Girişsiz istifadəçi `/giris`-ə yönlənir.  
Uğurlu giriş və qeydiyyat `/kabinet`-ə aparır. Saxlanmış burs siyahısı Dilim D-dədir.

### D — Saxlanmış burs
**Status:** ✅ tamamlandı (2026-09-27)

Kart və detaldan “Saxla” / “Çıxar”. Kabinetdə siyahı. Eyni burs ikinci dəfə yazılmır.  
Yazı `musteriler.savedBurs` sahəsindədir. Girişsiz “Saxla” `/giris`-ə aparır.

### E — Bağlantı
**Status:** ✅ tamamlandı (2026-09-27)

Navbar: girişsiz **Giriş** → `/giris`. Girişli **Kabinet** → `/kabinet`.  
Admin paneli ünvanı dəyişməyib: `/admin`.

Hər dilim bitəndə qısa report. Növbəti dilim ayrıca “davam et” ilə.
