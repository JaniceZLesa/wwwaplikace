# Space Invaders
Tento projekt je jednoduchá arkádová hra vytvořená pomocí JavaScriptu, kde hráč ovládá vesmírný člun, střílí na mimozemšťany a sbírá body. 
### Funkční specifikace:

#### 1. Datový konceptuální model:

Datový konceptuální model se zaměřuje na uchování informací o herním stavu, uživatelských skórech a herních objektech. Tento model bude využívat následující entity:

* **User (Uživatel)** :
* `name`: Jméno hráče (String).
* `score`: Skóre hráče (Integer).
* **Alien (Mimozemšťan)** :
* `x`: X-pozice mimozemšťana (Integer).
* `y`: Y-pozice mimozemšťana (Integer).
* `width`: Šířka mimozemšťana (Integer).
* `height`: Výška mimozemšťana (Integer).
* `alive`: Stav mimozemšťana (Boolean).
* **Bullet (Střela)** :
* `x`: X-pozice střely (Integer).
* `y`: Y-pozice střely (Integer).
* `width`: Šířka střely (Integer).
* `height`: Výška střely (Integer).
* `used`: Stav střely, zda byla použita (Boolean).
* **Game (Hra)** :
* `score`: Aktuální skóre (Integer).
* `alienArray`: Pole s objekty mimozemšťanů (Array).
* `bulletArray`: Pole s objekty střel (Array).
* `gameOver`: Stav hry (Boolean).

#### 2. Charakteristika funkčností aplikace:

* **Herní deska** : Interaktivní herní plocha vykreslená na `<canvas>`, kde se zobrazuje loď, mimozemšťani a střely.
* **Loď** : Uživatel ovládá loď pohybem doleva a doprava (klávesy `ArrowLeft` a `ArrowRight`).
* **Střely** : Uživatel střílí střely pomocí mezerníku.
* **Mimozemšťani** : Mimozemšťani se pohybují po herní desce a reagují na dosažení okraje obrazovky změnou směru.
* **Skóre** : Aktuální skóre je zobrazeno na herní desce a aktualizuje se při eliminaci mimozemšťanů.
* **Highscore** : Po skončení hry se uživatel může podívat na top 5 skóre.
* **Hra končí** : Když mimozemšťan dosáhne spodní části herní desky nebo když je loď zasažena.
* **Restart hry** : Po skončení hry se nabízí možnost hru restartovat.

#### 3. Specifikace uživatelských rolí a oprávnění:

* **Hráč** :
* Může ovládat loď (pohyb a střelbu).
* Získává skóre za zničené mimozemšťany.
* Může si prohlížet své výsledky a nejlepší skóre.
* Po skončení hry může zvolit novou hru nebo zobrazit nejlepší skóre.

#### 4. Uživatelské grafické rozhraní a jeho funkčnosti:

* **Herní plátno** : Zobrazení herní desky s objekty (loď, mimozemšťani, střely).
* **Skóre** : Zobrazení aktuálního skóre na obrazovce.
* **Upozornění o konci hry** : Okno pro zadání jména a zobrazení highscore seznamu.
* **Resetování hry** : Možnost začít novou hru po jejím skončení.

### Technická specifikace:

#### 1. Datový logický model:

Datový model zůstává v logické struktuře jako pole objektů v paměti pro aktuální stav hry. Důležitými objekty jsou:

* **Aliens** : Pole s objekty typu "alien", kterými jsou jednotliví mimozemšťané.
* **Bullets** : Pole pro uchování všech aktivních střel.
* **GameState** : Obsahuje informace o skóre a stavu hry (např. `gameOver`).

#### 2. Popis architektury a jejích jednotlivých částí:

Aplikace se skládá z následujících částí:

* **HTML** : Obsahuje základní strukturu stránky, včetně herního plátna (canvas) pro vykreslení.
* **CSS** : Definuje vzhled stránky, včetně pozadí herní desky a stylu textů.
* **JavaScript** : Hlavní logika hry, včetně vykreslování herních objektů na plátno, pohybu a interakce s hráčem, a ukládání výsledků.

##### 3. Popis tříd včetně základních funkcí:

* **Game (Hra)** :
* `loadHighScores()`: Načte uložené vysoké skóre z localStorage.
* `saveHighScore()`: Uloží nové vysoké skóre do localStorage.
* `showHighScores()`: Zobrazí seznam 5 nejlepších skóre.
* `update()`: Aktualizuje herní obrazovku a logiku (pohyb mimozemšťanů, střel, kolize).
* `endGame()`: Konec hry, nabídne zadání jména a uložení skóre.
* `restartGame()`: Restartuje hru.
* **Ship (Loď)** :
* Reprezentuje loď uživatele a její pohyb.
* **Bullet (Střela)** :
* Reprezentuje střelu a její pohyb po herní desce.
* **Alien (Mimozemšťan)** :
* Reprezentuje jednotlivého mimozemšťana a jeho pohyb po herní desce.

##### 4. Použité technologie a funkčnosti jednotlivých částí aplikace:

* **HTML** :
* `<canvas>` pro vykreslení herní plochy.
* Skripty pro načítání herních objektů a jejich vykreslování.
* **CSS** :
* Stylování herního plátna a základních textových elementů.
* **JavaScript** :
* Ovládání pohybu lodi (klávesy `ArrowLeft`, `ArrowRight`).
* Ovládání střelby (mezerník).
* Vykreslování mimozemšťanů a jejich pohybu.
* Zpracování kolizí mezi střelami a mimozemšťany.
* Ukládání a zobrazení výsledků v LocalStorage.
