# Popis projektu

Tento projekt je jednoduchá arkádová hra vytvořená pomocí JavaScriptu, kde hráč ovládá vesmírný člun, střílí na mimozemšťany a sbírá body. Projekt je rozdělen do tří samostatných souborů dle principů architektury MVC (Model-View-Controller):

- **model.js**: Obsahuje logiku a data hry (model).
- **view.js**: Zajišťuje vykreslování hry (view).
- **controller.js**: Ovládá interakci mezi modelem a pohledem (controller).

## Vlastnosti

1. **Ovládání vesmírného člunu**
   - Pohyb doleva a doprava pomocí šipek.
   - Střílení kulky pomocí mezerníku.

2. **Mimozemšťani**
   - Mimozemšťani se pohybují vodorovně a postupně sestupují dolů.
   - Zvyšují obtížnost při každé úrovni (rychlejší pohyb, více mimozemšťanů).

3. **Kulky**
   - Kulky se pohybují nahoru a zasáhnou mimozemšťany.
   - Při zásahu se zvyšuje skóre.

4. **High Score**
   - Pět nejlepších skóre je uloženo v LocalStorage.
   - Při dosažení nového nejvyššího skóre si hráč zadá své jméno.
   - Nejlepší skóre se zobrazí po skončení hry.

## Požadavky

- Webový prohlížeč podporující JavaScript (například Google Chrome, Mozilla Firefox).

## Struktura souborů

```
/game
|-- index.html          # Hlavní HTML soubor
|-- style.css           # Styl hry (volitelné)
|-- model.js            # Herní logika a data
|-- view.js             # Vykreslování hry
|-- controller.js       # Ovládání hry
|-- assets/             # Složka s obrázky (např. ship.png, alien.png)
```

## Instalace a spuštění

1. Nakopírujte si projekt do počítače.
2. Ujistěte se, že ve složce `assets` jsou dostupné obrázky (např. `ship.png`, `alien.png`).
3. Otevřete soubor `index.html` v prohlížeči.
4. Hra se automaticky spustí.

## Ovládání

- **Šipka doleva**: Pohyb vesmírného člunu doleva.
- **Šipka doprava**: Pohyb vesmírného člunu doprava.
- **Mezerník**: Střelba.

## Herní pravidla

- Zasáhněte všechny mimozemšťany, abyste postoupili do další úrovně.
- Při každé úrovni se zvyšuje obtížnost (rychlost mimozemšťanů, jejich počet).
- Hra končí, pokud mimozemšťani dosáhnou vesmírného člunu.

## High Score

- Při dosažení nejvyššího skóre se zobrazí výzva k zadání jména.
- Nejlepší skóre je ukládáno do LocalStorage a zobrazí se po skončení hry.
- Je uloženo maximálně 5 nejlepších výsledků.