# Training proximus first session. NodeJs

Table of contents
=================

<!--ts-->
   * [Part One](#part-one)
     * [Introducere](#introducere)
     * [Cod Asincron](#cod-asincron)
     * [Probleme 1](#probleme-1) 
   * [Part Two](#part-two)
     * [Structura unui proiect in NodeJS](#structura-unui-proiect-in-nodejs)
       * [Module](#module)
       * [Pachete](#pachete)
     * [Rest API in NodeJs](#rest-api-in-nodejs)
       * [Structura API](#structura-api)
       * [Rularea unui API](#rularea-unui-api)
     * [Probleme 2](#probleme-2)
   * [Part Three](#part-three)
     * [Obiectul principal din ExpressJS](#obiectul-principal-din-expressjs)
     * [Rutare in ExpressJS](#rutare-in-expressjs)
       * [Obiectul Request](#obiectul-request)
       * [Obiectul Response](#obiectul-response)
     * [Middlewares in Express](#middlewares-in-express)
        * [Middlewares predefinite intalnite des](#middlewares-predefinite-intalnite-des) 
     * [Modularizarea rutelor in Express](#modularizarea-rutelor-in-express)
     * [Probleme 3](#probleme-3)
   * [Part four](#part-four) 
     * [Connectarea la o baza de date Async/Await](#connectarea-la-o-baza-de-date-Async/Await)
     * [Structura Scheletului](#structura-scheletului)
       * [Structura Datelor](#structura-datelor)
       * [Structura Api-ului](#structura-api-ului)
       * [Mediul de lucru](#mediul-de-lucru)
       * [Structura fisierelor](#structura-fisierelor)
       * [Variabile de Mediu](#variabile-de-mediu)
       * [Gestionarea Erorilor](#gestionarea-erorilor)
       * [Async Await si Express](#async-await-si-express)
     * [Probleme 4](#probleme-4)

     
## Part One

### Introducere

NodeJS este un mediu de rulare pentru Javascript bazat pe motorul V8 de la Chrome. Acesta permite rularea scripturilor de JS pe calculator, fara sa fie nevoie de browser.

Javascript este un limbaj de scripting cu o sintaxa foarte usoara, asemanatoare celei din C. Mai jos cateva particularitati ale limbajului:

- JS este un limbaj slab tipat. Variabilele sunt definite nu cu tipuri, dar cu let sau const
- Functiile nu au un tip de retur si de asemenea nici parametrii nu au tipul atasat
- Functiile pot fi definite folosind keyword-ul function sau folosind arrow functions

```js
function myFunc(x) {console.log(x)};
 
// este identic cu
 
const myFuncArrow = (x) => console.log(x);
 
myFunc(3); //3
myFuncArrow(3); //3
```
- deoarece JS este un limbaj interpretat, nu conteaza ordinea in care sunt definite functiile. Totusi, este indicat sa fiti cat mai organizati in cod
- JS nu are nevoie de o functie de main ca sa ruleze. Codul dintr-un fisier .js va rula in momentul in care scriptul este apelat

```js
const constanta = 'abc';
let variabila = 3;
 
function adauga (x, y, z) {
  if (x === 'abc') {
    y = y + z;
  }
  return  y;
}
 
const rezultat = adauga(constanta, variabila, 10);
 
console.log(rezultat);
```
- in JS exista doua tipuri de egalitate: == si ===. Primul tip de egalitate nu tine cont de tipurile variabirelor comparate, in timp ce al doilea tip este mai strict.
```js
const a = 10; //a este numar
const b = '10'; //b este sir de caractere
 
console.log(a == b); //true
console.log(a === b); //false
 
const c = 'abc';
const d = 'abc';
 
console.log(c == d); //true
console.log(c === d); //true
 
const fals = false; //boolean
const str = ''; //string
const zero = 0; //number
 
console.log(fals == str); //true
console.log(fals == zero); //true
console.log(str == zero); //true
 
console.log(fals === str); //false
console.log(fals === zero); //false
console.log(str === zero); //false
```
- JS este un limbaj semi-oop. Cu toate ca are concepte precum obiecte si clase (partial), principiile OOP nu se regasesc in totalitate
- Vectorii sunt declarati cu paranteze drepte [ ] si obiectele cu paranteze acolade { }
- Obiectele in JS sunt combinatii de chei valori, unde valorile pot fi orice: variabile, vectori, obiecte si chiar functii
- Accesul la elementele dintr-un obiect se face in doua moduri:

```js
const obj = {a:1, b:2};
 
console.log(obj.a); //1
console.log(obj['b']); //2
```
- Deoarece JS opereaza cu obiecte, exista doua tipuri de copiere: prin referinta, implicit si prin valoare
```js
const obj1 = {a:2};
const obj2 = obj1; // copiere prin referinta
 
obj2.a = 5;
console.log(obj1); // {a:5} -> valoarea s-a modificat si in obiectul original
 
const obj3 = Object.assign({}, obj1); // copiere prin valoare
 
const obj4 = JSON.parse(JSON.stringify(obj1)); // copiere prin valoare folosind JSON
 
obj3.a = 10;
console.log(obj1); // {a:5} -> valoarea nu s-a modificat
 
const obj4 = {...obj1} // copiere prin valoare (modern, folosind spread operator, ES6)
 
obj4.a = 9772;
console.log(obj1); // {a:5} -> valoarea nu s-a modificat
```
- JS este un limbaj functional. Prezinta concepte precum metode functionale (map, filter, reduce) si functii curry (callback-uri)
```js
const arr = [1, 2, 3, 4];
console.log(arr.map(x => x*2)); //2 4 6 8
 
const obj = { a:2, b:3, c: (x, y) => console.log(x + y)}
console.log(obj.c(obj.a, obj['b'])); //5
 
const func1 = (x, cb) => cb(x);
const func2 = y => console.log(y);
 
func1(3, func2); //3
```

### Cod asincron

JS ofera suport pentru executia codului asincron. Majoritatea operatiilor care se desfasoara in cadrul unui API sunt asincrone

> [!NOTE]
> De exemplu, accesul unei resurse din baza de date dureaza timp. Daca accesul ar fi blocant, tot serverul s-ar bloca pana cand resursa ar fi preluata. Din acest motiv, acest acces trebuie facut asincron.

> [!TIP]
> Codul asincron implica mecanisme de sincronizare logice. Toate operatiile asincrone se realizeaza in background, in bucla de eveniment.

Pentru sincronizarea logica a codului asincron se pot folosi promises sau async/await (recomandat).

- promisiuni - Obiecte ce contin doua functii curry, resolve si reject pentru manipularea sincrona a codului asincron. O promisiune se asteapta folosind then sau catch.

```js
const getAgePromise = new Promise((resolve, reject) => {
    resolve(25);
});
 
getAgePromise.then((age) => console.log(`My age is ${age}`));
```
- async/await - Syntactic sugar pentru promisiuni, ofera aceeasi functionalitate, dar intr-o maniera mai imperativa, asemanatoare codului sincron.

```js
const getAgeAsync = () => new Promise((resolve, reject) => {
    resolve(25);
});
 
// echivalent cu const getAgeAsync = async () => 25;
 
const main = async () => {
    const age = await getAgeAsync();
 
    console.log(`My age is ${age}`);
}
 
main();
```

> [!NOTE]
> Pentru a sincroniza un cod folosind promisiuni, se folosesc functiile then si catch care accepta ca si parametru o functie curry ce va contine rezultatele intoarse de executia asincrona a codului, sau eroare.

> [!NOTE]
> Pentru a sincroniza un cod folosind async/await, se foloseste cuvantul cheie await care asteapta rezultatul intors de functia asincrona. Pentru a folosi await, este nevoie ca functia parinte sa fie declarata cu async.

> [!NOTE]
> O functie async va returna intotdeauna o promisiune.

```js
const fs = require('fs');
const fsPromise = require('fs/promises');
 
const main = async () => {
 
    console.log('Voi citi continul fisierului sincron');
 
    const continutSincron = fs.readFileSync('./text.in');
 
    console.log(`Continutul sincron este: ${continutSincron}\n----------------\n`);
 
    console.log('Voi citi continul fisierului cu promisiune');
 
    let continutPromisiune = "NaN";
 
    fsPromise.readFile('text.in').then(continutPromisiune => console.log(`Continutul promisiune este: ${continutPromisiune}\n----------------\n`));
 
    console.log(`Continutul promisiune in afara promisiunii este: ${continutPromisiune}\n----------------\n`);
 
    console.log('Voi citi continul fisierului cu async await');
 
    let continutAsyncAwait = "NaN";
 
    continutAsyncAwait = await fsPromise.readFile('text.in');
 
    console.log(`Continutul async await este: ${continutAsyncAwait}\n----------------\n`);
}
 
 
main();
```

> [!NOTE]
> Scoateti cuvantul cheie await si rulati din nou. Ce observati?

### Probleme 1
1. Rulati scripturile din examples
2. Creati un script care sa afiseze “Hello World!”
3. Creati un script care sa afiseze ora si data curenta
4. Creati un script care populeaza un vector cu numere de la 0 la 100 si afiseaza doar numerele pare
5. Extindeti scriptul precedent si creati o functie care primeste ca parametru vectorul, un numar cu rol de index si o alta functie care afiseaza numarul aflat la pozitia index din vector
6. Creati o functie asincrona care returneaza un rezultat peste 2 secunde si asteptati-o. Folositi atat promisiuni, cat si async await.

## Part Two

### Structura unui proiect in NodeJS

#### Module

Un proiect de Node este structurat in module. Fiecare fisier Javascript din componenta unui proiect este considerat un modul. Puteti sa faceti analogia cu fisierele .c din C sau cu clasele din Java.

Un modul poate fi importat de catre oricare alt modul (adica fisier .js), folosind keyword-ul require si calea relativa catre el. Un modul poate expune informatii in exterior folosind proprietatea exports a obiectului global module.

> [!NOTE]
> Se pot exporta oricate variabile sau functii. Chiar daca se exporta doar o functie, ca in exemplul urmator, este indicat sa o puneti intr-un obiect atunci cand o exportati

```js
const sayHello = () => {  console.log("Hello world!");  }
module.exports = {
  sayHello
}
/*
module.exports = { sayHello } e identic cu
 
const objForExport = { sayHello: sayHello };
module.exports = objForExport;
*/
```
> [!NOTE]
> Atunci cand creati un obiect, daca cheia si valoarea au aceeasi denumire, se poate scrie doar numele cheii, fara sa se mai puna : si valoarea

modul1.js
```js
const a = 2;
const b = 3;
const getA = () => { return a; }
const getB = () => { return b; }
module.exports = {
  getA
};
// pentru oricine va importa acest modul, singurul lucru la care va avea acces va fi functia "getA"
```

modul2.js
```js
const myModule = require('./modul1.js');
 
const a_from_module_1 = myModule.getA();
console.log(a_from_module_1); //2
 
const b_from_module_1 = myModule.getB(); //ReferenceError!
```
#### Pachete

Asa cum in alte limbaje se pot folosi biblioteci externe pentru diverse functionalitati ce sunt deja implementate (exemplu, stdio.h in C pentru I/O) si in Node se pot folosi pachete.

Pachetele sunt module instalate din surse externe. Pentru a instala un pachet se foloseste NPM - node package manager in terminal.

Pentru a putea instala pachete intr-un proiect, este nevoie ca aceasta sa fie initializat. Pentru a initializa un proiect de node, este nevoie sa rulati comanda:

```bash
npm init
```

In urma rularii acestei comenzi se va crea un fisier, package.json. Acest fisier are rolul de a retine informatii cu privire la proiect si la dependentele sale.

> [!NOTE]
> Daca vreti sa rulati proiectul pe o alta masina, este nevoie sa va instalati local toate pachetele pe care le folositi in proiect. Puteti sa le instalati pe fiecare de mana, sau puteti sa va folositi de package.json si ele vor fi instalate automat.
> ```bash
> npm install
> ```

Pe langa dependente, in package.json sunt retinute si informatii cu privire la proiect (autor, repository, descriere) precum si scripturi de rulare si testare. Puteti asocia partea de scripts din package.json cu un Makefile.

Dupa ce ati initializat proiectul, puteti incepe sa instalati pachete. Pentru a instala un pachet, se executa comanda urmatoare:

```bash
npm install name_package --save
```

Dupa ce instalati un pachet, se vor crea folderul node_modules si fisierul package-lock.json. In folder se afla toate pachetele instalate. In fisier se retine versiunea exacta a pachetului cu care se lucreaza.

> [!WARNING]
> Niciodata sa nu stergeti package-lock.json.

Pentru a utiliza un pachet instalat, se foloseste tot keyword-ul require, insa se scrie doar numele pachetului, nu si calea catre locul unde a fost descarcat, aceasta deducandu-se automat din node_modules.

```js
//presupunem ca am instalat inainte pachetul fictiv my-awesome-package
 
const myAwesomePackage = require('my-awesome-package');
//do stuff
```
> [!NOTE]
> Pentru a vedea cum se utilizeaza un pachet, este necesar sa cititi pagina acestuia de pe NPM sau de pe site-ul pachetului, daca exista. De obieci, documentatiile sunt cuprinzatoare.

### Rest API in NodeJS
Express ofera posibilitatea de a crea rute HTTP foarte usor. De asemenea, parsarea continutului din cadrul cererilor HTTP este realizata mult mai simplu in express, decat in alte frameworkuri. Avantajul major se resimte in natura sa minimala si nerestrictiva.

#### Structura API
Exista doua moduri principale in care va puteti organiza codul atunci cand doriti sa realizati un API de tip REST. Puteti sa va impartiti proiectul in:

- foldere care inglobeaza scripturi care se afla pe acelasi nivel logic in aplicatie (e.g. folder dedicat rutelor, folder dedicat interactiunii cu baza de date, etc…)
- foldere dedicate functionalitatilor individuale (e.g. folder pentru utilizatori, folder pentru comenzi, etc…).

> [!NOTE]
> Chiar daca structura codului este importanta, cel mai important factor intr-un API este modularitatea la nivel de functionalitati. Cu cat fiecare functionalitate are un context bine definit, cu atat este mai putin probabil sa intampinati erori de logica sau de cod.

#### Rularea unui API
Pentru a rula un API de Node, este nevoie sa definiti un fisier de start. Acest fisier trebuie sa includa apoi referinte catre celelalte fisiere ce fac parte din proiect, atat direct, cat si indirect (e.g. start face referire catre modulul 1 iar modulul 1 face referire catre modulul 2).

Exemplu de API minimal cu express:

start.js
```js
const express = require('express');
 
const app = express();
 
app.get('/', (req, res) => {
    res.send("Hello world!");
});
 
app.listen(3000);
```

Daca doriti sa utilizati scripturi de npm, va trebui sa includeti referinta catre fisierul de start si in package.json:
```json
{
  "name": "project",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node start.js"
  },
  "dependencies": {
    "express": "~4.16.1"
  }
}
```
Pentru a rula serverul, executati comanda:

```bash
npm run start
```

### Probleme 2

1. Creati 3 module de Node.
  - Primul modul trebuie sa expuna o functie care calculeaza suma elementelor dintr-un vector dat ca parametru si returneaza suma. Suma trebuie calculata folosind functia reduce.
  - Al doilea modul trebuie sa expuna o functie care primeste ca parametru un vector vec si un numar parNum. In aceasta functie se va apela functia din modulul anterior, dandu-se ca parametru un vector nou format din elementele din vec care au aceeasi paritate cu parNum. Trebuie sa folositi filter pentru generarea vectorului nou. Se va returna suma.
  - Al treilea modul va folosi functia din al doilea modul, dandu-i ca parametru un vector, un numar si va afisa rezultatul intors.
2. Creati un proiect de NodeJS gol.
3. Instalati pachetul moment si afisati ora curenta in formatul YYYY-LL-ZZThh:mm.
4. Instalati ExpressJS si rulati scriptul.
5. Inlocuiti “Hello world” cu ora curenta obtinuta la exercitiul 3.

## Part Three

### Obiectul principal din ExpressJS

Nucleul oricarui program scris in Express este obiectul obtinut prin apelarea modulului express.

```js
const express = require('express');
const app = express(); // inima oricarui program ExpressJS
```

Acest obiect, pe care il vom denumi app pentru usurinta, contine toate metodele si proprietatile necesare pentru a rula un Rest API.

De exemplu, pentru a lega programul la retea si a-l expune pe un port, este nevoie de apelarea metodei listen a obiectului app.

```js
const port = 3000; //poate fi orice valoare valida pentru un port
app.listen(port, () => console.log(`Salut, rulez pe portul ${port}!`));
```

### Rutare in ExpressJS

Rutarea este esentiala intr-un Rest API-ul. In express, obiectul app are o serie de metode predefinite pentru a crea rute (url-uri) HTTP. Numele metodelor sunt exact verbele HTTP:

```js
app.get('/hello', (req, res) => { // -> creaza o ruta GET cu url-ul '/hello'
  res.send('Hello!'); 
}); 
 
app.post('/marco', (req, res) => { // -> creaza o ruta POST cu url-ul '/marco' 
  if (req.body.replyBack === true) {
    res.send('Polo!');
  } else {
    res.send('...');
 }
});
 
app.delete('/order', (req, res) => { // -> creaza o ruta DELETE cu url-ul '/order'
  res.send('Deleted order');
});
 
app.put('/user', (req, res) => { // -> creaza o ruta PUT cu url-ul '/user'
  res.send('Changed user');
});
```

> [!NOTE]
> Puteti observa ca toate rutele au in comun 2 lucruri:
> - req - obiectul request care are metode si proprietati ce permit interactiunea cu cererea
> - res - obiectul response care are metode si proprietati ce permit interactiunea cu raspunsul

#### Obiectul Request

Obiectul req are proprietati si functii pentru interactiunea cu cererea primita. Cele mai folosite 3 tipuri de interactiuni sunt:

- extragerea parametrilor din url (req.params)

```js
app.get('/books/:id', (req, res) => { // exemplu de url: '/books/3'
  const paramId = req.params.id;
  res.send(`You sent a request with param id ${paramId}`);
});
```

> [!WARNING]
> Aveti grija cu tipul parametrilor de cale. Acestia sunt, implicit, siruri de caractere. Daca doriti sa ii folositi intr-un context in care, de exemplu, ei sunt numere (e.g.: id), trebuie convertiti la tipul respectiv (e.g. parseInt(id)).

- extragerea parametrilor din cerere (req.query)
```js
app.get('/books', (req, res) => { // exemplu de url: '/books?id=3'
  const queryId = req.query.id;
  res.send(`You sent a request with query id ${queryId}`);
});
```

- extragerea continutului dintr-o cerere POST/PUT (req.body)
```js
app.post('/books', (req, res) => { 
  const book = req.body.book;
  res.send(`Your body is ${JSON.stringify(book)}`);
}
```
> [!NOTE]
> Continutul primit in corpul unei cereri poate fi de mai multe tipuri, printre care cele mai des intalnite: form-data, x-www-form-urlencoded, json, xml. Express ofera implicit suport pentru x-www-form-urlencoded si json. Pentru celelalte, exista pachete pe NPM care permit interactiunea cu alte tipuri de payload.

#### Obiectul Response
Obiectul res are proprietati si functii pentru interactiunea cu raspunsul ce va fi returnat. Cel mai des, res se foloseste pentru:
- a raspunde unei cererei cu text
```js
res.send('Hello!');
```
- a seta statusul HTTP intors in raspuns
```js
res.status(404).send('Not found!');
```
- a seta headers HTTP intoarse in raspuns
```js
res.set('Content-Type', 'application/json');
```
- a intoarce un json ca raspuns (seteaza implicit header-ul application/json)
```js
res.json(myJsonObject);
```
- a inchide comunicatia REST fara a trimite un raspuns efectiv
```js
res.end();
```

### Middlewares in Express
Una dintre particularitatile Express este reprezentata de conceptul de middlewares. Orice functie atasata obiectului app este un middleware. Functiile care se apeleaza pentru rutele definite sunt, de exemplu, tot middlewares.

Middlewares reprezinta o compozitie monadica. In alte cuvinte, puteti sa asociati middlewares cu piese de lego, unde fiecare piesa reprezinta cate o functie. Fiecare middleware vine peste un alt middleware, si tot asa, formandu-se un lant de functii care se executa secvential.

Un middleware este o functie ce contine obligatoriu parametrii discutati mai sus, req si res, precum si un parametru special, next.

> [!NOTE]
> Parametrul next este o functie care, atunci cand este apelata, opreste executia middleware-ului curent si incepe executia middleware-ului urmator din lantul de middleware-uri.

Pentru a adauga un middleware, se pot utiliza doua modalitati:
- utilizarea functiei use a obiectului app pentru a adauga o functie

```js
const myAwesomeMiddleware = (req, res, next) => {
  console.log('Hello from middleware!');
  next();
}
 
app.use(myAwesomeMiddleware);
app.get('/hello', (req, res) => {
  res.send('Hello!');
}
 
// atunci cand este apelata ruta, se va afisa la consola "Hello from middleware",
// deoarece functia myAwesomeMiddleware se executa prima in lantul de functii
```


- in-place middleware sub forma de functie anonima atasata unei rute

```js
app.get('/hello', (req, res, next) => {
  console.log('Hello from middleware');
  next();
}, (req, res) => {
  res.send('Hello!');
});
 
// atunci cand este apelata ruta, se va afisa la consola "Hello from middleware", deoarece functia anonima se executa prima in lantul de functii
```

> [!CAUTION]
> Daca nu executati next() in oricare dintre middlewares definite, fluxul de executie nu va avansa si serverul se va bloca.

> [!WARNING]
> Ordinea in care introduceti middlewares conteaza. Middlewares se executa in ordinea in care sunt introduse

> [!NOTE]
> Chiar si functia care incheie lantul de middlewares, adica cea care apeleaza o functie din obiectul res, este tot un middleware. Totusi, aceasta nu mai are nevoie sa apeleze next(), deoarece este ultima.

#### Middlewares predefinite intalnite des

Cele mai des intalnite middlewares in express sunt cele de securitate, logare sau de manipulare a cererilor:

- Helmet este un middleware de securitate, ce adauga o serie de headere importante
- Morgan este un middleware de logare, ce afiseaza informatii utile despre cereri la consola
- express.json este un middleware nativ ce permite extragerea corpurilor JSON din cereri HTTP
- express.urlencoded este un middleware nativ ce permite extragerea corpurilor application/x-www-form-urlencoded din cereri HTTP
- Cors este un middleware ce adauga headerele necesare pentru comunicatii in afara aceluiasi domeniu

```js
const express = require('express');
const app = express();
 
app.use(express.json());
 
app.post('/my-awesome-post-route', (req, res) => {
  const body = req.body;
  console.log('Body-ul meu este de tip JSON si a putut fi parsat pentru ca am utilizat middleware-ul express.json(). Body-ul este ${JSON.stringify(body)}');
  res.json(body);
});
```

> [!TIP]
> Middlewares predefinite apeleaza functia next() implicit.

### Modularizarea rutelor in Express

Chiar daca rutele se pot defini utilizand obiectul app, aceasta abordare limiteaza scrierea rutelor in acelasi fisier (in care este definit si app), sau in fisiere separate in care este importat app, codul devenind incalcit.

Express ofera obiectul Router. Acesta este o extensie a obiectului app si este folosit doar pentru a defini rute intr-o maniera modulara.

route.js
```js
const express = require('express');
const router = express.Router();
 
router.get('/', (req, res) => {
  res.send('Hello from router!');
});
 
module.exports = router;
```

start.js
```js
const express = require('express');
const myAwesomeRoute = require('./route.js');
 
const app = express();
 
app.use('/hello', myAwesomeRoute);
 
app.listen(3000, () => {console.log('App listening on port 3000');});
```

Pentru a folosi o ruta definita cu un obiect router, este nevoie ca obiectul sa fie exportat din fisierul in care este definit si importat in fisierul principal, unde se afla app, pentru a fi inclus in lantul de middlewares. Includerea se face folosind app.use, o cale si obiectul router importat.

> [!NOTE]
> Router are aceleasi proprietati si functii legate de rutare pe care le are si app

### Probleme 3

Trebuie sa implementati o mica librarie sub forma unui REST Api care implementeaza operatiile CRUD (Create, Read, Update, Delete) pentru 
<a href="https://github.com/costinvisan/training_proximus/blob/main/part_three/db/database.js">“baza de date”</a> aflata in cod:

O ruta pentru inserarea unei carti
O ruta pentru afisarea unei carti dupa id dat ca parametru de cale
O ruta pentru afisarea unei carti dupa autor dat ca parametru de cerere
O ruta pentru afisarea tuturor cartilor
O ruta pentru actualizarea unei carti dupa id
O ruta pentru stergerea unei carti dupa id dat ca parametru de cale
O ruta pentru stergerea mai multor carti dupa autor dat ca parametru de cerere 
O ruta pentru stergerea intregii baze de date
Rutele trebuie definite intr-un ruter extern
Rutele de inserare si actualizare vor opera pe JSON, deci trebuie sa activati parasarea de JSON

> [!TIP]
> Hint! middleware express.json()
> Este foarte indicat ca rutele voastre sa respecte schema de denumire CRUD
> Este foarte indicat sa tratati erorile utilizand try…catch pentru a nu lasa clientul care se conecteaza la API-ul vostru sa vada erorile generate in sistem
> Statusurile HTTP returnate trebuie sa fie in concordanta cu actiunea petrecuta (201 pt. create, 400 pt. bad request, etc…)


Obiectul cu care veti lucra, va avea formatul:
```js
const book = {
  title: String,
  author: String
}
```

> [!NOTE]
> Atentie, fiecare carte va avea un id generat in <a href="https://github.com/costinvisan/training_proximus/blob/main/part_three/db/database.js">“baza de date”</a>. Id-ul se genereaza automat, nu trebuie sa il scrieti voi, insa va fi returnat atunci cand se interogheaza “baza de date”.

## Part Four

### Connectarea la o baza de date Async/Await

In javascript exista doua tipuri de operatii:

- sincrone, care se executa instant
- asincrone, care returneaza rezultatul la un moment de tip viitor

Implicit, operatiile intensive din punct de vedere computational sau I/O sunt asincrone, pentru a nu bloca firul de executie.

Asadar, interactiunea cu o baza de date este un exemplu de operatie asincrona.

Flow-ul poate fi dedus in felul urmator:
- lanseaza cerere SQL (asincron)
- executa alte operatii mult mai putin costisitoare dpdv computational
- raspuns de la cererea SQL (in viitor)

Fara un mecanism clar de gestiune a operatiilor asincrone, codul poate deveni ilogic sau greu de scris si inteles.
O data cu introducerea async/await in EcmaScript 8, lucrurile s-au usurat considerabil:
- Orice functie marcata cu async este considerata functie asincrona si returneaza o promisiune
- Promisiunile pot fi asteptate folosind await
- Await poate fi folosit doar intr-o functie async

Asadar, in cadrul exemplului de mai sus, din moment ce lansarea cererii catre baza de date implica o promisiune, aceasta poate fi asteptata cu await, pentru ca rezultatul sa poata fi ulterior folosit.
```js
const getData = async () => { return 'Ana'; }
 
(async() => {
    const result = getData();
    console.log(result); // Promisiune in derulare
})();
 
(async() => {
    const result = await getData();
    console.log(result); // Ana
})();
```

### Structura Scheletului

In urma realizarii scheletului, se va obtine un REST Api ce ofera suport pentru o librarie online de carti. Api-ul se conecteaza la o baza de date PostgreSQL ce ruleaza intr-un container de Docker.

Va trebui sa aveti instalat atat Docker, cat si Docker Compose

#### Structura Datelor

Structura bazei de date este urmatoarea:

- Tabela authors retine autorii din sistem
- Tabela books retine cartile din sistem. Fiecare carte are cate un autor
- Tabela publishers retine editurile din sistem
- Tabela publishers_books este tabela de jonctiune pentru legaturile many-to-many dintre carti si edituri (o editura poate avea mai multe carti, o carte poate avea mai multe edituri)

#### Structura Api-ului

Api-ul trebuie sa ofere suport pentru manipularea datelor in sistem. Aveti deja implementat, in schelet, operatiile CRUD de baza pentru autori. Totusi, trebuie sa obtinem functionalitate completa.

Pe langa rutele CRUD de baza, este nevoie si de rute extinse. Un exemplu de ruta extinsa este urmatorul:
- GET /authors/:id/books trebuie sa returneze toate cartile pentru autorul cu id-ul :id

#### Mediul de lucru
Baza de date si utilitarul de interactiune cu baza de date, PG Admin, vor rula in Docker. In cadrul scheletului exista un fisier docker-compose.yml care face usoara pornirea acestor doua servicii.

```yml
version: "3.8"

services:

  pgadmin:
    image: dpage/pgadmin4
    ports:
      - "30001:80"
    environment:
      PGADMIN_DEFAULT_EMAIL: test@test.com
      PGADMIN_DEFAULT_PASSWORD: test

  db:
    image: postgres
    environment:
      POSTGRES_USER: dbuser
      POSTGRES_PASSWORD: dbpass
      POSTGRES_DB: bookstore
      TZ: Europe/Bucharest
      PGTZ: Europe/Bucharest
    ports:
      - "5432:5432"
    volumes:
      - part_four:/var/lib/postgresql/data
      - ./init_db.sql:/docker-entrypoint-initdb.d/init_db.sql

volumes:
  part_four:
```

Pentru a porni rularea celor doua containere, in folderul in care se afla fisierul docker-compose.yml trebuie sa lansati comanda:

```bash
docker-compose up
```
> [!TIP]
> - Dupa pornirea celor doua containere, daca veti intra, in browser, pe localhost:30001, veti putea sa utilizati PGAdmin cu credentialele test@test.com si test.
> - Ajunsi in pgAdmin creati o conexiune noua in pgAdmin folosind variabilele de environment din docker-compose.yml
> - Pentru adresa sau hostname-ul conexiunii la baza de date postgress va trebui sa inspectati containarul pentru postgres. Puteti folosi aceasta comanda:
> ```bash
> docker inspect docker-db-1
> ```
> - In urma comenzii veti un obtine un json pe care il puteti salva intr-un fisier si cauta dupa "Hostname", ar trebui sa arate ceva de genu: "ba8e9fcab13f".
> - Dupa ce opriti containerele aveti grija sa stergeti volumele de date in cazul in care incercati sa faceti migrarile de mai multe ori.
>  ```bash
>  docker-compose down --volumes
>  ```
![image](https://github.com/costinvisan/training_proximus/assets/45972193/adb8b106-b9d4-4181-8bc0-60d589ebb5a6)

#### Structura fisierelor

* conexiunea cu baza de date - ```Infrastructure/PostgreSQL/index.js```
* clasa de erori custom pentru - ```WebApp/Models/ServerError.js```
* controllerele pentru autori - ```WebApp/Controllers/AuthorsController.js```
* handler pentru raspuns - ```WebApp/Filters/ResponseFilter.js```
* accesul la tabela Authors din baza de date - ```Infrastructure/PostgreSQL/Repository/AuthorsRepository.js```
* fisierul ```start.js```

#### Variabile de Mediu
Gestiunea variabilelor de mediu este realizata utilizand Dotenv la rularea proiectului:
```yml
"scripts": {
    "start": "node -r dotenv/config src/start.js",
    "start-dev": "nodemon -r dotenv/config src/start.js"
  },
```
Variabilele de mediu sunt citite din fisierul .env atunci cand se executa comanda npm run start.

#### Gestionarea Erorilor
Gestionarea erorilor se realizeaza in maniera centralizata, folosind pachetul express-async-errors. Toate erorile aruncate sunt captate automat si transmise catre middleware-ul creat special pentru tratarea erorilor, din start.js
```js
// in cadrul start.js
app.use((err, req, res, next) => {
    if (err) {
        console.error(err);
        let status = 500;
        let message = 'Something Bad Happened';
        if (err instanceof ServerError) {
            message = err.Message;
            status = err.StatusCode;
        }
        return next(createError(status, message));
    }
});
```
> [!TIP]
> Observati cum, in cadrul middleware-ului centralizat, se verifica daca eroarea primita este de tipul ServerError. Astfel, decidem daca eroarea este generata de noi, deci poate fi trimisa catre utilizator. Altfel, eroarea este ascunsa si se trimite un mesaj generic (e.g. Something bad happened)

#### Async Await si Express
Pentru a folosi async/await in express, este nevoie ca middleware-urile din cadrul rutelor sa fie marcate ca functii async.
```js
Router.get('/', async (req, res) => {
 
    const authors = await AuthorsDataAccess.getAllAsync();
 
    ResponseFilter.setResponseDetails(res, 200, authors);
});
```
> [!TIP]
> - Bineinteles, metoda getAllAsync este si ea, la randul ei, async si din acest motiv, ea poate fi asteptata cu await.
> - Este buna practica sa sufixati toate metodele asincron cu “Async”

### Probleme 4

Plecand de la schelet, implementati functionalitatile pentru Books si Publishers si ruta extinsa pentru Authors:

Pentru Books:
- GET /books → va returna toate cartile. Pentru fiecare carte se va preciza numele cartii si id-ul acesteia
- GET /books/:id → va returna id-ul si numele cartii cu id-ul :id, impreuna cu id-ul, numele si prenumele autorului si id-ul si numele editurilor
- POST /books → va returna cartea adaugata
- PUT /books/:id → va returna cartea modificata
- DELETE /books/:id → nu va returna nimic, 204

Pentru Publishers:
- GET /publishers → va returna toate editurile. Pentru fiecare editura se va preciza numele editurii si id-ul acesteia
- GET /publishers/:id → va returna id-ul si numele editurii cu id-ul :id, impreuna cu toate cartile din editura respectiva. Pentru fiecare carte se va preciza id-ul si numele cartii, impreuna cu id-ul si numele si prenumele autorului.
- POST /publishers → va returna editura adaugata
- PUT /publishers/:id → va returna editura modificata
- DELETE /publishers/:id → nu va returna nimic, 204

Pentru BooksPublishers:
- POST /books/:id/publishers → adauga la o carte un publisher si pretul asociat
- PUT /books/:bookId/publishers/:publisherId → modifica pretul asociat unei relatii book-publisher
- DELETE/books/:bookId/publishers/:publisherId → sterge pretul asociat si publisher-ul de la o carte

Pentru Authors
- GET /authors/:id/books → va returna id-ul si numele cartilor pentru autorul cu id-ul :id, impreuna cu id-ul si numele editurii/editurilor pentru fiecare carte
