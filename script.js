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

//mimozemšťani
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
    nejvyssiSkore = nejvyssiSkore.slice(0, 10);
    localStorage.setItem('nejvyssiSkore', JSON.stringify(nejvyssiSkore));
}

function zobrazNejvyssiSkore() {
    let nejvyssiSkore = nahrajNejvyssiSkore();
    let nejvyssiSkoreText = "PĚT NEJVYŠŠÍCH SKÓRE:\n";
    nejvyssiSkore.forEach((score, index) => {
        nejvyssiSkoreText += `${index + 1}. ${score.name} - ${score.score}\n`;
    });
    alert(nejvyssiSkoreText);
}

window.onload = function() {
    hraciPole = document.getElementById("board");
    hraciPole.width = sirkaHracihoPole;
    hraciPole.height = vyskaHracihoPole;
    kontext = hraciPole.getContext("2d");

    //load images
    lodImg = new Image();
    lodImg.src = "./lod.png";
    lodImg.onload = function() {
        kontext.drawImage(lodImg, lod.x, lod.y, lod.width, lod.height);
    }

    mimozemstanImg = new Image();
    mimozemstanImg.src = "./mimozemstan.png";
    createAliens();

    requestAnimationFrame(update);
    document.addEventListener("keydown", moveShip);
    document.addEventListener("keyup", shoot);
}

function update() {
    requestAnimationFrame(update);

    if (konecHry) {
        endGame();
        return;
    }

    kontext.clearRect(0, 0, hraciPole.width, hraciPole.height);

    //loď
    kontext.drawImage(lodImg, lod.x, lod.y, lod.width, lod.height);

    //mimozemšťan
    for (let i = 0; i < poleMimozemstanu.length; i++) {
        let alien = poleMimozemstanu[i];
        if (alien.alive) {
            alien.x += mimozemstanRychlostX;

            //když se mimozemšťan dotkne hranice pole
            if (alien.x + alien.width >= hraciPole.width || alien.x <= 0) {
                mimozemstanRychlostX *= -1;
                alien.x += mimozemstanRychlostX*2;

                //pohyb všech mimozemšťanů v řadě
                for (let j = 0; j < poleMimozemstanu.length; j++) {
                    poleMimozemstanu[j].y += vyskaMimozemstana;
                }
            }
            kontext.drawImage(mimozemstanImg, alien.x, alien.y, alien.width, alien.height);

            if (alien.y >= lod.y) {
                konecHry = true;
            }
        }
    }

    //střely
    for (let i = 0; i < poleStrel.length; i++) {
        let bullet = poleStrel[i];
        bullet.y += rychlostStrelY;
        kontext.fillStyle="white";
        kontext.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

        //kolie střel a mimozemšťanů
        for (let j = 0; j < poleMimozemstanu.length; j++) {
            let alien = poleMimozemstanu[j];
            if (!bullet.used && alien.alive && detectCollision(bullet, alien)) {
                bullet.used = true;
                alien.alive = false;
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
        //zvýší počet mimozemšťanů v poli o 1
        skore += mimozemstanSloupce * mimozemstanRady * 100; //bonusový bod :)
        mimozemstanSloupce = Math.min(mimozemstanSloupce + 1, sloupce/2 -2); //limitováno na 16/2 -2 = 6
        mimozemstanRady = Math.min(mimozemstanRady + 1, rady-4);  //limitováno na 16-4 = 12
        if (mimozemstanRychlostX > 0) {
            mimozemstanRychlostX += 0.2; //zrychlení hybnosti mimozemšťanů vpravo
        }
        else {
            mimozemstanRychlostX -= 0.2; //zrychlení hybnosti mimozemšťanů vlevo
        }
        poleMimozemstanu = [];
        poleStrel = [];
        createAliens();
    }

    //score
    kontext.fillStyle="white";
    kontext.font="16px courier";
    kontext.fillText(skore, 5, 20);
}

// Funkce pro ukončení hry
function endGame() {
    // Vyzvání hráče k zadání jména a uložení skóre
    let jmenoHrace = prompt("KONEC HRY! Zadejte vaše jméno:");

    if (jmenoHrace) {
        // Uložení skóre do localStorage
        ulozNejvyssiSkore(jmenoHrace, skore);
        // Zobrazení highscore
        zobrazNejvyssiSkore();
    }

    // Zeptat se hráče, jestli chce hrát znovu
    let playAgain = confirm("Chcete hrát znovu?");
    if (playAgain) {
        restartGame(); // Restartujeme hru
        window.location.reload();
    } else {
        konecHry = true; // Konec hry
    }
}

function restartGame() {
    // Obnovit herní stav
    skore = 0;
    konecHry = false;
    mimozemstanPocet = 0;
    mimozemstanRady = 2;
    mimozemstanSloupce = 3;
    mimozemstanRychlostX = 1;
    poleMimozemstanu = [];
    poleStrel = [];
    lod.x = lodX; // Původní pozice lodi
    createAliens();
    requestAnimationFrame(update);
    
}

function moveShip(e) {
    if (konecHry) {
        endGame();
        return;
    }

    if (e.code == "ArrowLeft" && lod.x - rychlostLodeX >= 0) {
        lod.x -= rychlostLodeX; //pohyb lodi vlevo
    }
    else if (e.code == "ArrowRight" && lod.x + rychlostLodeX + lod.width <= hraciPole.width) {
        lod.x += rychlostLodeX; //pohyb lodi vpravo
    }
}

function createAliens() {
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
        endGame();
        return;
    }

    if (e.code == "Space") {
        //střelba
        let bullet = {
            x : lod.x + sirkaLode*15/32,
            y : lod.y,
            width : velikostDlazdice/8,
            height : velikostDlazdice/2,
            used : false
        }
        poleStrel.push(bullet);
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   
           a.x + a.width > b.x &&   
           a.y < b.y + b.height &&  
           a.y + a.height > b.y;    
}
