//hranice hracího pole
let velikostDlazdice = 32;
let rady = 16;
let sloupce = 16;

let hraciPole;
let sirkaHracihoPole = velikostDlazdice * sloupce; 
let vyskaHracihoPole = velikostDlazdice * rady; 
let kontext;

//raketa
let sirkaLode = velikostDlazdice*2;
let vyskaLode = velikostDlazdice;
let lodX = velikostDlazdice * sloupce/2 - velikostDlazdice;
let lodY = velikostDlazdice * rady - velikostDlazdice*2;

let lod = {
    x : lodX,
    y : lodY,
    width : sirkaLode,
    height : vyskaLode
}

let lodImg;
let rychlostLodeX = 1.5*velikostDlazdice;

//alieni
let poleMimozemstanu = [];
let sirkaMimozemstana = velikostDlazdice*2;
let vyskaMimozemstana = velikostDlazdice;
let mimozemstanX = velikostDlazdice;
let mimozemstanY = velikostDlazdice;
let mimozemstanImg;

let mimozemstanRady = 2;
let mimozemstanSloupce = 3;
let mimozemstanPocet = 0; 
let mimozemstanRychlostX = 1; 

//střely
let poleStrel = [];
let rychlostStrelY = -10;

let skore = 0;
let konecHry = false;


function nahrajNejvyssiSkore() {
    const ulozeneNejvyssiSkore = localStorage.getItem('nejvyssiSkore');
    if (ulozeneNejvyssiSkore) {
        return JSON.parse(ulozeneNejvyssiSkore);
    }
    return [];
}

function ulozNejvyssiSkore(name, score) {
    let nejvyssiSkore = nahrajNejvyssiSkore();
    nejvyssiSkore.push({ name, score });
    nejvyssiSkore.sort((a, b) => b.score - a.score);
    nejvyssiSkore = nejvyssiSkore.slice(0, 5);
    localStorage.setItem('nejvyssiSkore', JSON.stringify(nejvyssiSkore));
}

function zobrazNejvyssiSkore() {
    let nejvyssiSkore = nahrajNejvyssiSkore();
    let seznamElement = document.getElementById("nejvyssiSkoreSeznam");
    seznamElement.innerHTML = "";
    nejvyssiSkore.forEach((score, index) => {
        let polozka = document.createElement("li");
        polozka.textContent = `${index + 1}. ${score.name} - ${score.score}`;
        seznamElement.appendChild(polozka);
    });
}

window.onload = function() {
    hraciPole = document.getElementById("board");
    hraciPole.width = sirkaHracihoPole;
    hraciPole.height = vyskaHracihoPole;
    kontext = hraciPole.getContext("2d");
    zobrazNejvyssiSkore();

    //obrázky
    lodImg = new Image();
    lodImg.src = "./lod.png";
    lodImg.onload = function() {
        kontext.drawImage(lodImg, lod.x, lod.y, lod.width, lod.height);
    }

    mimozemstanImg = new Image();
    mimozemstanImg.src = "./mimozemstan.png";
    vytvorMimozemstany();

    requestAnimationFrame(update);
    document.addEventListener("keydown", pohniLodi);
    document.addEventListener("keyup", shoot);
}

function update() {
    requestAnimationFrame(update);

    if (konecHry) {
        upozorneniNaKonecHry();
        return;
    }

    kontext.clearRect(0, 0, hraciPole.width, hraciPole.height);

    //loď
    kontext.drawImage(lodImg, lod.x, lod.y, lod.width, lod.height);

    //mimozemšťan
    for (let i = 0; i < poleMimozemstanu.length; i++) {
        let mimozemstan = poleMimozemstanu[i];
        if (mimozemstan.alive) {
            mimozemstan.x += mimozemstanRychlostX;

            //když se mimozemšťan dotkne hranice pole
            if (mimozemstan.x + mimozemstan.width >= hraciPole.width || mimozemstan.x <= 0) {
                mimozemstanRychlostX *= -1;
                mimozemstan.x += mimozemstanRychlostX*2;

                //pohyb všech mimozemšťanů v řadě
                for (let j = 0; j < poleMimozemstanu.length; j++) {
                    poleMimozemstanu[j].y += vyskaMimozemstana;
                }
            }
            kontext.drawImage(mimozemstanImg, mimozemstan.x, mimozemstan.y, mimozemstan.width, mimozemstan.height);

            if (mimozemstan.y >= lod.y) {
                konecHry = true;
            }
        }
    }

    //střely
    for (let i = 0; i < poleStrel.length; i++) {
        let strela = poleStrel[i];
        strela.y += rychlostStrelY;
        kontext.fillStyle="red";
        kontext.fillRect(strela.x, strela.y, strela.width, strela.height);

        //kolie střel a mimozemšťanů
        for (let j = 0; j < poleMimozemstanu.length; j++) {
            let vetrelec = poleMimozemstanu[j];
            if (!strela.used && vetrelec.alive && detekceKolize(strela, vetrelec)) {
                strela.used = true;
                vetrelec.alive = false;
                mimozemstanPocet--;
                skore += 100;
            }
        }
    }

    //vyčištění střel
    while (poleStrel.length > 0 && (poleStrel[0].used || poleStrel[0].y < 0)) {
        poleStrel.shift(); //odstraní první eleent z pole
    }

    //další level
    if (mimozemstanPocet == 0) {
        //zýší počet mimozemšťanů v poli o 1
        skore += mimozemstanSloupce * mimozemstanRady * 100; //bonusový bod :)
        mimozemstanSloupce = Math.min(mimozemstanSloupce + 1, sloupce/2 -2); //limitováno na 16/2 -2 = 6
        mimozemstanRady = Math.min(mimozemstanRady + 1, rady-4);  //limitováno na 16-4 = 12
        if (mimozemstanRychlostX > 0) {
            mimozemstanRychlostX += 0.2;
        }
        else {
            mimozemstanRychlostX -= 0.2;
        }
        poleMimozemstanu = [];
        poleStrel = [];
        vytvorMimozemstany();
    }

    //skore
    kontext.fillStyle="white";
    kontext.font="16px courier";
    kontext.fillText(skore, 5, 20);
}

function upozorneniNaKonecHry() {
    let jmenoHrace = prompt("KONEC HRY! Zadejte vaše jméno:");

    if (jmenoHrace) {
        ulozNejvyssiSkore(jmenoHrace, skore);
    }

    let hratZnovu = confirm("Chcete hrát znovu?");
    if (hratZnovu) {
        restarHry();
        window.location.reload();
    }
}

//restart
function restarHry() {
    skore = 0;
    konecHry = false;
    mimozemstanPocet = 0;
    mimozemstanRady = 2;
    mimozemstanSloupce = 3;
    mimozemstanRychlostX = 1;
    poleMimozemstanu = [];
    poleStrel = [];
    lod.x = lodX;
    vytvorMimozemstany();
    requestAnimationFrame(update);
    
}

function pohniLodi(e) {
    if (konecHry) {
        return;
    }

    if (e.code == "ArrowLeft" && lod.x - rychlostLodeX >= 0) {
        lod.x -= rychlostLodeX; //pohyb lodi vlevo
    }
    else if (e.code == "ArrowRight" && lod.x + rychlostLodeX + lod.width <= hraciPole.width) {
        lod.x += rychlostLodeX; //pohyb lodi vpravo
    }
}

function vytvorMimozemstany() {
    for (let c = 0; c < mimozemstanSloupce; c++) {
        for (let r = 0; r < mimozemstanRady; r++) {
            let alien = {
                img : mimozemstanImg,
                x : mimozemstanX + c*sirkaMimozemstana,
                y : mimozemstanY + r*vyskaMimozemstana,
                width : sirkaMimozemstana,
                height : vyskaMimozemstana,
                alive : true
            }
            poleMimozemstanu.push(alien);
        }
    }
    mimozemstanPocet = poleMimozemstanu.length;
}

function shoot(e) {
    if (konecHry) {
        return;
    }

    if (e.code == "Space") {
        //střelba
        let strela = {
            x : lod.x + sirkaLode*15/32,
            y : lod.y,
            width : velikostDlazdice/8,
            height : velikostDlazdice/2,
            used : false
        }
        poleStrel.push(strela);
    }
}

function detekceKolize(a, b) {
    return a.x < b.x + b.width &&   
           a.x + a.width > b.x &&   
           a.y < b.y + b.height &&  
           a.y + a.height > b.y;    
}
