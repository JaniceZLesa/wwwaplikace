class HraciPole {
    constructor(velikostDlazdice, sloupce, rady) {
        this.velikostDlazdice = velikostDlazdice;
        this.sloupce = sloupce;
        this.rady = rady;

        this.element = document.getElementById("board");
        this.element.width = this.velikostDlazdice * this.sloupce;
        this.element.height = this.velikostDlazdice * this.rady;
        this.kontext = this.element.getContext("2d");
    }

    vymazat() {
        this.kontext.clearRect(0, 0, this.element.width, this.element.height);
    }
}

class Lod {
    constructor(hraciPole, velikostDlazdice, sloupce, rady, rychlostLodeX) {
        this.hraciPole = hraciPole;
        this.velikostDlazdice = velikostDlazdice;
        this.sloupce = sloupce;
        this.rady = rady;
        this.rychlostLodeX = rychlostLodeX;

        this.x = this.velikostDlazdice * this.sloupce / 2 - this.velikostDlazdice;
        this.y = this.velikostDlazdice * this.rady - this.velikostDlazdice * 2;
        this.width = this.velikostDlazdice * 2;
        this.height = this.velikostDlazdice;
        this.img = new Image();
        this.img.src = "./lod.png";
    }

    vykresli() {
        this.hraciPole.kontext.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    pohni(smer) {
        const novaPozice = smer === 'vlevo' 
            ? this.x - this.rychlostLodeX 
            : this.x + this.rychlostLodeX;

        if (novaPozice >= 0 && novaPozice + this.width <= this.hraciPole.element.width) {
            this.x = novaPozice;
        }
    }
}

class Mimozemstan {
    constructor(x, y, img, velikostDlazdice) {
        this.x = x;
        this.y = y;
        this.width = velikostDlazdice * 2;
        this.height = velikostDlazdice;
        this.alive = true;
        this.img = img;
    }

    pohni(rychlost) {
        this.x += rychlost;
    }

    vykresli(kontext) {
        if (this.alive) {
            kontext.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }
}

class Strela {
    constructor(x, y, velikostDlazdice) {
        this.x = x + velikostDlazdice * 15/32;
        this.y = y;
        this.width = velikostDlazdice / 8;
        this.height = velikostDlazdice / 2;
        this.used = false;
    }

    vykresli(kontext) {
        kontext.fillStyle = "red";
        kontext.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Hra {
    constructor() {
        this.velikostDlazdice = 32;
        this.rady = 16;
        this.sloupce = 16;
        this.rychlostLodeX = 1.5 * this.velikostDlazdice;
        this.rychlostStrelY = -10;
        this.mimozemstanSloupce = 3;
        this.mimozemstanRady = 2;
        this.mimozemstanRychlostX = 1;
        this.mimozemstanPocet = 0;
        this.skore = 0;
        this.konecHry = false;

        this.hraciPole = new HraciPole(this.velikostDlazdice, this.sloupce, this.rady);
        this.lod = new Lod(this.hraciPole, this.velikostDlazdice, this.sloupce, this.rady, this.rychlostLodeX);
        this.poleMimozemstanu = [];
        this.poleStrel = [];

        this.inicializace();
    }

    inicializace() {
        this.nahrajNejvyssiSkore();
        this.zobrazNejvyssiSkore();
        this.vytvorMimozemstany();
        this.nastavPosluchace();
        requestAnimationFrame(() => this.update());
    }

    vytvorMimozemstany() {
        const mimozemstanImg = new Image();
        mimozemstanImg.src = "./mimozemstan.png";

        for (let c = 0; c < this.mimozemstanSloupce; c++) {
            for (let r = 0; r < this.mimozemstanRady; r++) {
                this.poleMimozemstanu.push(new Mimozemstan(
                    this.velikostDlazdice + c * this.velikostDlazdice * 2,
                    this.velikostDlazdice + r * this.velikostDlazdice,
                    mimozemstanImg,
                    this.velikostDlazdice
                ));
            }
        }
        this.mimozemstanPocet = this.poleMimozemstanu.length;
    }

    nastavPosluchace() {
        document.addEventListener("keydown", (e) => this.pohniLodi(e));
        document.addEventListener("keyup", (e) => this.vystrel(e));
    }

    pohniLodi(e) {
        if (this.konecHry) return;
        if (e.code === "ArrowLeft") this.lod.pohni('vlevo');
        if (e.code === "ArrowRight") this.lod.pohni('vpravo');
    }

    vystrel(e) {
        if (e.code === "Space" && !this.konecHry) {
            this.poleStrel.push(new Strela(this.lod.x, this.lod.y, this.velikostDlazdice));
        }
    }

    update() {
        if (this.konecHry) {
            this.upozorneniNaKonecHry();
            return;
        }

        requestAnimationFrame(() => this.update());
        this.hraciPole.vymazat();
        this.updateMimozemstany();
        this.updateStrel();
        this.lod.vykresli();
        this.vykresliSkore();

        if (this.mimozemstanPocet === 0) {
            this.skore += this.mimozemstanSloupce * this.mimozemstanRady * 100;
            this.mimozemstanSloupce = Math.min(this.mimozemstanSloupce + 1, Math.floor(this.sloupce / 2) - 2);
            this.mimozemstanRady = Math.min(this.mimozemstanRady + 1, this.rady - 4);
            
            // Zvýšení rychlosti mimozemšťanů
            if (this.mimozemstanRychlostX > 0) {
                this.mimozemstanRychlostX += 0.2;
            } else {
                this.mimozemstanRychlostX -= 0.2;
            }
            
            this.poleMimozemstanu = [];
            this.poleStrel = [];
            this.vytvorMimozemstany();
        }
    }

    updateMimozemstany() {
        for (let i = 0; i < this.poleMimozemstanu.length; i++) {
            const mimozemstan = this.poleMimozemstanu[i];
            if (mimozemstan.alive) {
                mimozemstan.pohni(this.mimozemstanRychlostX);

                if (mimozemstan.x + mimozemstan.width >= this.hraciPole.element.width || mimozemstan.x <= 0) {
                    this.mimozemstanRychlostX *= -1;
                    mimozemstan.x += this.mimozemstanRychlostX * 2;

                    for (let j = 0; j < this.poleMimozemstanu.length; j++) {
                        this.poleMimozemstanu[j].y += this.velikostDlazdice;
                    }
                }

                mimozemstan.vykresli(this.hraciPole.kontext);

                if (mimozemstan.y >= this.lod.y) {
                    this.konecHry = true;
                }
            }
        }
    }

    updateStrel() {
        for (let i = 0; i < this.poleStrel.length; i++) {
            const strela = this.poleStrel[i];
            strela.y += this.rychlostStrelY;
            strela.vykresli(this.hraciPole.kontext);

            for (let j = 0; j < this.poleMimozemstanu.length; j++) {
                const mimozemstan = this.poleMimozemstanu[j];
                if (!strela.used && mimozemstan.alive && this.detekceKolize(strela, mimozemstan)) {
                    strela.used = true;
                    mimozemstan.alive = false;
                    this.mimozemstanPocet--;
                    this.skore += 100;
                }
            }
        }

        while (this.poleStrel.length > 0 && (this.poleStrel[0].used || this.poleStrel[0].y < 0)) {
            this.poleStrel.shift();
        }
    }

    vykresliSkore() {
        this.hraciPole.kontext.fillStyle = "white";
        this.hraciPole.kontext.font = "16px courier";
        this.hraciPole.kontext.fillText(this.skore, 5, 20);
    }

    upozorneniNaKonecHry() {
        const jmenoHrace = prompt("KONEC HRY! Zadejte vaše jméno:");
        if (jmenoHrace) {
            this.ulozNejvyssiSkore(jmenoHrace, this.skore);
        }

        const hratZnovu = confirm("Chcete hrát znovu?");
        if (hratZnovu) {
            this.restartHry();
        } else {
            window.close();
        }
    }

    nahrajNejvyssiSkore() {
        const ulozeneNejvyssiSkore = localStorage.getItem('nejvyssiSkore');
        if (ulozeneNejvyssiSkore) {
            console.log("Načtené nejvyšší skóre", JSON.parse(ulozeneNejvyssiSkore));
            return JSON.parse(ulozeneNejvyssiSkore);
        }
        return [];
    }

    ulozNejvyssiSkore(name, score) {
        console.log("Ukládám skóre:", name, score); 
        let nejvyssiSkore = this.nahrajNejvyssiSkore();
        nejvyssiSkore.push({ name, score });
        nejvyssiSkore.sort((a, b) => b.score - a.score);
        nejvyssiSkore = nejvyssiSkore.slice(0, 5);
        localStorage.setItem('nejvyssiSkore', JSON.stringify(nejvyssiSkore));
        console.log("Aktuální nejvyšší skóre:", nejvyssiSkore);
    }

    zobrazNejvyssiSkore() {
        let nejvyssiSkore = this.nahrajNejvyssiSkore();
        let seznamElement = document.getElementById("nejvyssiSkoreSeznam");
        if (!seznamElement) {
            console.error("Element 'nejvyssiSkoreSeznam' nebyl nalezen.");
            return;
        }
        seznamElement.innerHTML = "";
        nejvyssiSkore.forEach((score, index) => {
            let polozka = document.createElement("li");
            polozka.textContent = `${index + 1}. ${score.name} - ${score.score}`;
            seznamElement.appendChild(polozka);
        });
        console.log("Zobrazeno nejvyšší skóre:", nejvyssiSkore);
    }

    restartHry() {
        this.skore = 0;
        this.konecHry = false;
        this.mimozemstanPocet = 0;
        this.mimozemstanRady = 2;
        this.mimozemstanSloupce = 3;
        this.mimozemstanRychlostX = 1;
        this.poleMimozemstanu = [];
        this.poleStrel = [];
        this.lod.x = this.velikostDlazdice * this.sloupce / 2 - this.velikostDlazdice;
        this.vytvorMimozemstany();
        requestAnimationFrame(() => this.update());
    }

    detekceKolize(a, b) {
        return a.x < b.x + b.width &&
               a.x + a.width > b.x &&
               a.y < b.y + b.height &&
               a.y + a.height > b.y;
    }
}

window.onload = () => {
    new Hra();
};