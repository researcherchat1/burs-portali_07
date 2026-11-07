# Konstitusiya — Burs Portalı

Bu qaydalar bütün agent/development işləri üçün məcburidir.

## 1. İcazə

Bütün növ implementasiyalardan əvvəl mütləq **Ayxandan** izin al.  
Ondan izinsiz heç bir kod dəyişikliyi etmə.

## 2. CMD — hazır komutlar

Şirkət kompüterində məhdudiyyətlər var; agent CMD-ləri çox vaxt işlədə bilməz.  
Ona görə **Ayxana hazır CMD komutlarını ver** — o özü işlətsin.

Ayxan serveri qaldırmaq üçün komut istəyəndə serveri yoxlama və şərh yazma. Yalnız bu iki sətri ver:

```bat
cd /d c:\Users\aykhan.asgarli\Downloads\burs-portal
pnpm dev
```

## 3. Komut formatı

Verdiyin hər CMD komutunu **ayrıca sətirdə** yaz.

## 4. PowerShell qadağandır

PowerShell istifadəyə icazə yoxdur.  
PowerShell komutları təklif etmə — yalnız **CMD**.

## 5. Əvvəl layihə qovluğu

Komut verməzdən / işlətməzdən əvvəl lazımdırsa **əvvəlcə layihə qovluğuna keçid** (`cd`) komutunu da mütləq ver.  
Heç vaxt güman etmə ki, terminal artıq düzgün qovluğdadır.

## 6. Checkpoint versiyaları

Hər `CHECKPOINT.md` yeniləməsində **versiya nömrəsi** ver (commit sırası kimi: `v1`, `v2`, `v3`…).  
Faylda görünməlidir:
- cari versiya (`Checkpoint vN`)
- tarix
- qısa “nə dəyişdi / harada dayandıq”

Məqsəd: yenidən oxuyanda dayanma / yenilənmə / davamiyyət itməsin.

## 7. Stabil inteqrasiya (əsas prioritet)

Prioritet budur ki, sistemləri bir-birinə elə inteqrasiya edək ki, layihənin irəliləyən dövrlərində **ümumi sistemin işləyişi error verməsin**.

Bütün inteqrasiya və implementasiya əməliyyatlarında bu maddə əsas götürülür:
- yarımçıq / kövrək bağlama yox
- ikinci kök (auth/DB) yox — Protokol 1
- gələcəkdə lazım olanı `enabled` və ya aydın sərhədlə saxla; ölü asılılıq gətirmə

## 8. Senzura və budama (kökə girən hər şey)

Ana sistemə (kökə) əlavə olunan **bütün növ komponentlər** mütləq senzuradan keçir.  
Ehtiyac varsa budanır; təhlükəsiz inteqrasiya təmin olunur.

**Ayxana** hər dəfə “bunu budamalıyıq” xəbərdarlığı və ya “bu komponenti budayaqmı?” sualı **verilmir** — Ayxan bunu bilir; bu maddə həmin sualların cavabıdır.

Budama yerinə yetiriləndə yalnız **report** edilir:
- nələr budandı
- qısa səbəb

## 9. Backend və DB (localStorage)

Ciddi və sistem tələb edən hər prosesin **backend və DB** bağlantısı olmalıdır.  
Frontend-only və ya `localStorage` ilə ciddi iş qurulmur.

`localStorage` yalnız çox xırda, təhlükəsizlik boşluğu yaratmayan işlərdə ola bilər (məsələn görünüş seçimi).  
Belə bir istisna da **qurulmazdan əvvəl Ayxandan izin** alınır.
