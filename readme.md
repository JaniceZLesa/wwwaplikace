# Space Invaders

```
				░░░░░░░░░░░░░░░░░
				░░░░░▀▄░░░▄▀░░░░░
				░░░░▄█▀███▀█▄░░░░
				░░░█▀███████▀█░░░
				░░░█░█▀▀▀▀▀█░█░░░
				░░░░░░▀▀░▀▀░░░░░░
				░░░░░░░░░░░░░░░░░
				░░░░░░░░█░░░░░░░░
				░░░░░░░░░░░░░░░░░
				░░░░░░░░█░░░░░░░░
				░░░░░░░░░░░░░░░░░
				░░░░░░░░█░░░░░░░░
				░░░░░░░░░░░░░░░░░
				░░░░░░░░▄░░░░░░░░
				░░░░░░░███░░░░░░░
				░░▄███████████▄░░
				░░█████████████░░
				░░█████████████░░
				░░░░░░░░░░░░░░░░░

```

## Popis projektu

Tento projekt je jednoduchá arkádová hra vytvořená pomocí JavaScriptu, kde hráč ovládá vesmírný člun, střílí na mimozemšťany a sbírá body. Jeho nejvyšší dosažené skŕe je ukládáno do LocaStorage, kde je třízeno a uchováváno 5 nejvyšších dosažených výsledků, které jsou následně zobrazovány na stránce.

### Funkční specifikace:

#### Datový konceptuální model:

Datový modele je zaměřený na objekty určené ke správě herních prvků (loď, vetřelci, střely) a uchovávání stavů (nejvyšší dosažené skóre, konec hry). Jsou strukturované tak, aby mohla být implementována změna či rozšíření hry. Tento model bude rozdělen do tří hlavních částí.

###### **Herní prostředí**

* Hrací pole definované rozměry šířky a výšky.
* Kontext (CanvasRenderingContext2D) pro vykreslování grafiky.

###### **Herní objekty**

Loď hráče:

* Pozice (x, y), rozměry (šířka, výška) a rychlost pohybu.
* Obrázek reprezentující loď.

Mimozemšťani:

* Pole objektů mimozemšťanů, každý s pozicí (x, y), rozměry (šířka, výška), stavem (`alive`) a obrázkem.
* Globální atributy: počet sloupců, řad, rychlost pohybu, a počet zbývajících mimozemšťanů.

Střely:

* Pole objektů střel s pozicí (x, y), rozměry, stavem (`used`) a směrem pohybu.

###### **Herní logika a stav**

* Aktuální skóre a stav hry (`konecHry`).
* Ukládání a načítání nejlepšího skóre prostřednictvím `localStorage`.
* Funkce pro interakci, kolize a vykreslování.

#### Datové typy

Jednoduché hodnoty (integer): Rozměry, pozice, rychlost, skóre, a počty (`sirkaHracihoPole`, `rychlostLodeX`).

Složené struktury: Herní objekty (`lod`, `poleMimozemstanu`, `poleStrel`) jsou reprezentovány jako objekty nebo pole objektů.

HTML elementy a API: Používají se HTML elementy jako `<canvas>` (`hraciPole`) a `<img>` (`lodImg`, `mimozemstanImg`).

Persistentní data: Nejvyšší skóre je uloženo v JSON formátu v `localStorage`.

#### **Použité konkrétní datové typy**

| **Proměnná/Objekt**                | **Datový typ**        | **Popis**                                                                                                  |
| ------------------------------------------ | ---------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `hraciPole`                              | `HTMLCanvasElement`        | Odkazuje na `<canvas>`element hry.                                                                             |
| `sirkaHracihoPole`,`vyskaHracihoPole`  | `number`                   | Rozměry hrací plochy.                                                                                          |
| `kontext`                                | `CanvasRenderingContext2D` | Kontext pro vykreslování grafiky.                                                                              |
| `lod`                                    | `Object`                   | Obsahuje vlastnosti lodi (`x`,`y`,`width`,`height`).                                                     |
| `lodImg`                                 | `HTMLImageElement`         | Obrázek reprezentující loď.                                                                                  |
| `rychlostLodeX`                          | `number`                   | Rychlost pohybu lodi v osách.                                                                                   |
| `poleMimozemstanu`                       | `Array<Object>`            | Pole objektů mimozemšťanů, každý obsahuje vlastnosti (`x`,`y`,`width`,`height`,`alive`,`img`). |
| `mimozemstanImg`                         | `HTMLImageElement`         | Obrázek reprezentující mimozemšťana.                                                                        |
| `mimozemstanRady`,`mimozemstanSloupce` | `number`                   | Počet mimozemšťanů v řadách a sloupcích.                                                                  |
| `mimozemstanPocet`                       | `number`                   | Aktuální počet živých mimozemšťanů.                                                                      |
| `mimozemstanRychlostX`                   | `number`                   | Horizontální rychlost pohybu mimozemšťanů.                                                                  |
| `poleStrel`                              | `Array<Object>`            | Pole objektů střel, každá střela má vlastnosti (`x`,`y`,`width`,`height`,`used`).                |
| `rychlostStrelY`                         | `number`                   | Vertikální rychlost střel.                                                                                    |
| `skore`                                  | `number`                   | Aktuální skóre hráče.                                                                                       |
| `konecHry`                               | `boolean`                  | Indikuje, zda hra skončila (`true/false`).                                                                    |
| Funkce skóre                              | `Object`(JSON)             |                                                                                                                  |
| `nejvyssiSkore`                          | `Array<Object>`            | Načítá se z `localStorage`, obsahuje seznam objektů skóre:`{ name: string, score: number }`.            |

---

### Charakteristika funkčností aplikace:

#### **Herní prostředí a inicializace**

Herní plocha: Využívá element `<canvas>`, jehož velikost se přizpůsobuje počtu řad a sloupců herního pole (na základě velikosti dlaždic). Barva pozadí černá.

Při spuštění stránky se načítají obrázky pro loď a mimozemšťany, zobrazuje seznam nejvyšších skóre uložený v místním úložišti a inicializují herní prvky.

#### **Herní prvky**

##### **Loď:**

Loď má pevnou šířku a výšku (odvozenou z velikosti dlaždice). Pohybuje se vodorovně po spodní hraně hracího pole na základě kláves šipek vlevo a  vpravo. Klávesou mezerník může hráč střílet střely směrem vzhůru.

##### **Mimozemšťané:**

Na začátku každé úrovně se generuje pole mimozemšťanů ve dvou řadách a třech sloupcích (počet se postupně zvyšuje s úrovní). Pohybují se vodorovně, přičemž při dosažení okrajů mění směr a posouvají se dolů o jednu řadu. Pokud mimozemšťan dosáhne pozice lodi, hra končí.

##### **Střely:**

Střely jsou vytvářeny při výstřelu a pohybují se směrem vzhůru. Střely zničí mimozemšťany při kolizi.

#### **Mechaniky hry**

##### **Pohyb:**

Loď i mimozemšťané nemohou opustit hranice hracího pole. Pohyb mimozemšťanů se zrychluje s každou úrovní.

##### **Kolize:**

Detekce kolizí mezi střelami, mimozemšťany a lodí. Pokud střela zasáhne mimozemšťana, je mimozemšťan zničen a hráč získá body. Při kolizi mimozemšťana s lodí hra končí.

##### **Další úroveň:**

Po zničení všech vetřelců se generují noví s větším počtem řad a sloupců a vyšší rychlostí. Hráč obdrží bonusové body za dokončení úrovně.

##### **Konec hry:**

Pokud hra skončí (mimozemšťané dosáhnou lodi), je hráč vyzván k zadání svého jména. Skóre je uloženo do místního úložiště a je mu nabídnuta možnost restartovat hru.

#### **Správa skóre**

Hra ukládá seznam nejvyšších skóre do **LocalStorage** a zobrazuje ho v seznamu pod herním plátnem. Udržuje pouze 5 nejlepších skóre, která jsou řazena sestupně podle bodů.

#### **Grafika a styl**

Hra používá obrázky pro loď a mimozemšťany. Minimalistický vzhled s černým pozadím, bílým textem a červenými střelami.

---

### Specifikace uživatelských rolí

#### Hráč

Hlavní uživatel hry, který ovládá loď, střílí na mimozemšťany, a snaží se získat nejvyšší skóre.

Oprávnění:

Pohybovat lodí doleva a doprava pomocí kláves vlevo a vpravo. Střílet střely pomocí mezerníku. Zadat své jméno po skončení hry k uložení skóre. Restartovat hru.

#### **Systémový správce (interní role)**

Ukládá a spravuje herní data (skóre, stav hry). Jedná se o interní funkce aplikace, které nemají přímou interakci s uživatelem.

Oprávnění:

Ukládat nejvyšší skóre do localStorage. Načítat nejvyšší skóre z localStorage. Seřadit a zobrazovat nejlepších pět hráčů podle skóre. Vymazat střely, které opustily herní pole. Zvyšovat obtížnost hry při dosažení další úrovně. Ukončit hru, pokud mimozemšťan dosáhne dolní části hracího pole.

#### **Grafický správce (interní role)**

Role odpovědná za vykreslování objektů na hracím poli a aktualizaci herního rozhraní.

Oprávnění:

Vykreslovat loď hráče na hracím poli, mimozemšťany, střely. Aktualizovat jejich pohyb a detekovat kolize.

#### **Herní logika (interní role)**

Role zajišťující herní mechaniky, jako je kolize, postup do další úrovně nebo konec hry.

Oprávnění:

Detekovat kolize mezi střelami a mimozemšťany, vyšovat skóre hráče při zásahu mimozemšťana, vertikální přesun vetřelců, zyšování rychlosti vetřelců při další úrovni, automaticky ukončit hru, pokud mimozemšťan dosáhne spodního okraje pole.

---

### Popis uživatelského grafického rozhraní a jeho funkčnosti:

#### **Hlavní prvky rozhraní:**

Nadpisy:

V  horní části obrazovky je nadpis „Space Invaders“ a pod plátnem „Nejvyšší skóre“.

Herní plocha (Canvas):

Hlavním prvkem rozhraní je prázdné plátno (HTML `<canvas>` element) s ID `board`, slouží jako hrací pole, kde probíhá hra, má černé pozadí a dynamicky zobrazuje loď hráče, mimozemšťany, střely a  skóre zobrazené v levém horním rohu.

Tabulka nejvyšších skóre:

Pod herním plátnem je seznam nejlepších výsledků, který se dynamicky načítá z localStorage, každá položka seznamu obsahuje pořadí, jméno hráče a jeho skóre.

---

### Technická specifikace:

Aplikace je vytvořena jako jednoduchá 2D hra, která běží v prohlížeči. K vykreslení a herní logice je použito HTML5, CSS, JavaScript a lokální úložiště pro ukládání skóre.

#### Architektura aplikace

HTML: Struktura obsahuje prvky `<canvas>` pro vykreslení herního pole, `<ul>` k zobrazení nejvyššího skóre a nadpisy.

CSS: Herní pole je černé a zarovnané na střed, seznam nejvyššího skóre je čistě naformátovaný.

JavaScript: Herní logika, vykreslování, zpracování pohybu, střelby, detekce kolizí a práce s uložením skóre do LocalStorage.

Obrázky: Lodě a mimozemšťané jsou vykresleni pomocí obrázků.

### **Popis tříd a funkcí**

#### **Třída: Loď (lod)**

Proměnné:

* `x`, `y`: Souřadnice lodi na hracím poli.
* `width`, `height`: Velikost lodi.

Základní funkce:

* `pohniLodi(e)`: Pohyb lodi doleva/doprava při stisku šipek.
* `shoot(e)`: Vystřelení střely při stisknutí mezerníku.

#### **Třída: Mimozemšťan (alien)**

Proměnné:

* `x`, `y`: Souřadnice mimozemšťana.
* `width`, `height`: Velikost mimozemšťana.
* `alive`: Stav mimozemšťana (živý/mrtvý).

Základní funkce:

* `vytvorMimozemstany()`: Generuje pole mimozemšťanů na začátku hry nebo při dalším levelu.
* Pohyb mimozemšťanů v poli: Logika umožňuje pohybovat mimozemšťany po celé šířce plátna. Po dosažení okraje se posunou dolů.

#### **Třída: Střela (bullet)**

Proměnné:

* `x`, `y`: Souřadnice střely.
* `width`, `height`: Velikost střely.
* `used`: Stav střely (použitá/nepoužitá).

Základní funkce:

* Pohyb střely směrem nahoru.
* Detekce kolize se zásahy mimozemšťanů.

#### **Třída: Herní pole**

Proměnné:

* `width`, `height`: Rozměry hracího pole.
* `kontext`: Kontext vykreslování na plátně `<canvas>`.

Základní funkce:

* `update()`: Hlavní herní smyčka, která vykresluje objekty, řeší pohyb a střety.
* `detekceKolize(a, b)`: Detekce kolizí mezi střelou a mimozemšťanem.

#### **Ukládání skóre**

Funkce:

* `nahrajNejvyssiSkore()`: Načítá skóre z LocalStorage.
* `ulozNejvyssiSkore(name, score)`: Ukládá skóre hráče do LocalStorage.
* `zobrazNejvyssiSkore()`: Zobrazuje seznam nejlepších skóre na obrazovce.

#### **Správa herního stavu**

Funkce:

* `upozorneniNaKonecHry()`: Zobrazuje výzvu k zadání jména při konci hry.
* `restarHry()`: Obnovuje herní stav pro novou hru.

---

### **Použité technologie a funkčnost**

#### **Front-end (HTML, CSS):**

`<canvas>`: Slouží pro vykreslování herních objektů (loď, mimozemšťané, střely).

`<ul>`: Seznam pro zobrazení nejvyššího skóre.

Stylování prvků stránky pro lepší vizuální vzhled (zarovnání, barvy).

#### **Back-end (JavaScript):**

Práce s `<canvas>`: vykreslování obrázků (lodě a mimozemšťané), vykreslování střel a skóre.

Ovládání: klávesnice (šípky pro pohyb, mezerník pro střelbu).

Lokální úložiště: LocalStorage pro uložení a načtení nejvyšších skóre.

Herní smyčka: funkce `update()` pravidelně obnovuje stav hry pomocí `requestAnimationFrame`.

### **Uživatelské sekce aplikace**

#### **Z pohledu uživatele:**

1. **Start hry:**
   * Načte se hrací pole a seznam nejvyšších skóre.
   * Objeví se loď a mimozemšťané.
2. **Herní mechanika:**
   * Loď se pohybuje doleva/doprava.
   * Střelba na mimozemšťany.
   * Po zásahu mimozemšťan zmizí a hráč získá body.
   * Level se zvyšuje, jakmile zmizí všichni mimozemšťané.
3. **Konec hry:**
   * Uživatel zadá jméno a skóre se uloží.
   * Možnost restartu hry.
4. **Seznam skóre:**
   * Uživatel vidí žebříček nejlepších hráčů.

---

Autor: Bc. Jana Krapfová

Kontakt: j.krapfova@gmail.com 

Kód vychází z herního konceptu Space Invaders (1978, Taito, Tomohiro Nishikado), ale byl implementován jako autorská interpretace.

---
