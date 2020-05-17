
let unos = document.getElementById('unos');
let uneti = document.getElementById('uneti');

///////////////////////////////////////////////////////////////////////////////////
///// clicking on button ON/OFF => page will reload itself erasing all data in output div

document.getElementById("off").addEventListener('mouseup', function () {
    let nekiUnos = document.getElementById("unos").innerHTML;
    if (nekiUnos != '') {
        window.location.reload();
    }
    nekiUnos = '';
    unos.innerHTML = '';
    uneti.innerHTML = '';

})
///////////////////////////////////////////////////////////////////////////////////
///// clicking on button CE => you will erase last digit or sign , and if there are 
///// brackets in output => with one click on this button you will erase 
///// everything between the brackets

document.getElementById("poslednje").addEventListener('click', function (e) {

    //console.log('e.target.id ' + e.target.id);

    //let bb = unos.innerHTML.length;
    let zz = uneti.innerHTML.length;
    let part;

    if (uneti.innerHTML[zz - 1] == ')') {
        let inp = uneti.innerHTML.lastIndexOf('(');
        //console.log('inp ' + inp);

        part = uneti.innerHTML.substr(0, inp);

    } else {

        part = uneti.innerHTML.substr(0, zz - 1);
    }
    // console.log('part ' + part);

    unos.innerHTML = '';
    uneti.innerHTML = part;

})
////////////////////////////////////////////////////////////////////////////////////
///// clicking on button "+/-" => the idea was that when you click on this button 
///// the entered number gets brackets around him and sign "-" in front of him.
///// For example, if you enter number 9  and you click on this button
///// you will get (-9)

document.getElementById("plusMinus").addEventListener('mouseup', function (e) {

    //console.log('e.target.id ' + e.target.id);

    let zunos = unos.innerHTML;
    let zuneti = uneti.innerHTML;
    // let bb = zunos.length;
    let pp = zuneti.length;

    if (['*', '/', '-', '+'].includes(zuneti[0])) {
        unos.innerHTML = zunos.replace(zunos[0], '');
        uneti.innerHTML = zuneti.replace(zuneti[0], '');
    }

    let niz = [];
    let bplus = uneti.innerHTML.lastIndexOf('+');
    let bminus = uneti.innerHTML.lastIndexOf('-');
    let bputa = uneti.innerHTML.lastIndexOf('*');
    let bdelj = uneti.innerHTML.lastIndexOf('/');

    niz.push(bplus, bminus, bputa, bdelj);
    let sor = niz.sort(function (a, b) { return b - a });


    let parch = uneti.innerHTML.substring(sor[0] + 1, pp);
    //console.log('parch' + ' ' + parch + ' ' + pp);
    let izraz = '(' + '-' + parch + ')';
    let izLeng = parch.length;
    //console.log('plusminus izraz' + ' ' + izraz + izLeng);

    let oparch = zuneti.slice(0, sor[0] + 1);
    let konacno = oparch + izraz;
    //console.log('oparch' + ' ' + oparch + 'oparch+izraz ' + konacno);

    if (zuneti == '(-)') {
        unos.innerHTML = '';
        uneti.innerHTML = '';
    }

    if (['+', '-', '*', '/', '.'].includes(zunos)) {
        unos.innerHTML = '';
        uneti.innerHTML += '';
    } else if (zuneti[pp - 1] == ')') {
        unos.innerHTML = '';
        uneti.innerHTML += '';
    } else {
        unos.innerHTML = izraz;
        uneti.innerHTML = konacno;
    }

})
////////////////////////////////////////////////////////////////////////////////
///// clicking on button "." => you will get a number with decimals 

document.getElementById("zarez").addEventListener('mouseup', function (e) {

    //console.log('e.target.id ' + e.target.id);

    let y = e.target.innerHTML;

    unos.innerHTML = y;
    uneti.innerHTML += y;

    let g = uneti.innerHTML;

    let res = g.split('');

    let zz = res.length;

    if (
        res[zz - 2] == '.'
    ) {
        res[zz - 2] = '';
    }

    let niz = [];
    let bplus = uneti.innerHTML.lastIndexOf('+');
    let bminus = uneti.innerHTML.lastIndexOf('-');
    let bputa = uneti.innerHTML.lastIndexOf('*');
    let bdelj = uneti.innerHTML.lastIndexOf('/');

    niz.push(bplus, bminus, bputa, bdelj);
    let sor = niz.sort(function (a, b) { return b - a });

    let prch = uneti.innerHTML.substring(sor[0] + 1, zz - 1);
    // console.log('prch' + ' ' + prch + ' ' + zz);

    if (prch.includes('.')) {
        res[zz - 1] = '';
        unos.innerHTML = '';
    }

    if (['+', '-', '*', '/'].includes(res[zz - 2])) {
        res[zz - 1] = '0.';
        unos.innerHTML = '';
    }

    if (res[zz - 2] == undefined) {
        res[zz - 1] = '0.';
    }

    if (res[zz - 5] == undefined && res[zz - 4] == '(') {
        //  console.log(res);
        res = ["(", "-", "0", ".", ")"];
        // console.log(res);
    }

    if (
        [')'].includes(res[zz - 2])
    ) {
        unos.innerHTML = '';

        let inst = uneti.innerHTML.lastIndexOf('(');
        //console.log('inst ' + inst);
        let insp = uneti.innerHTML.lastIndexOf(')');
        //console.log('insp ' + insp);
        let isecak = uneti.innerHTML.substring(inst + 1, insp);

        if (isecak.lastIndexOf('.') !== -1) {
            res[zz - 2] = '';
            res[zz - 1] = ')';

            // console.log('isecak ' + isecak);
            // console.log('res[zz-2] ' + res[zz - 2]);
            // console.log('res ' + res);
        } else {
            // console.log('isecak ' + isecak);
            //  console.log('res[zz-2] ' + res[zz - 2]);
            res[zz - 2] = '.';
            res[zz - 1] = ')';

            //console.log('res ' + res);
        }

        if (res[zz - 2] == ')') {
            res[zz - 1] = '';
            // console.log('res[zz-1] ' + res[zz - 1]);
        }
    }

    let rezult = res.join('');
    let rr = rezult.length;

    let lastin = rezult.lastIndexOf(')');
    let firstin = rezult.lastIndexOf('(');
    let noviPrch = uneti.innerHTML.substring(sor[0] + 1, rr);
    // console.log('novi prch ' + noviPrch+ ' ' +noviPrch.length + ' '+noviPrch.lastIndexOf('.'));

    if (noviPrch.includes(')')) {
        noviPrch = uneti.innerHTML.substring(firstin + 1, lastin);
        let nnn = noviPrch.replace(')', '');
        noviPrch = nnn;
    }

    if (noviPrch.includes('.')) {
        unos.innerHTML = noviPrch;
    } else {
        unos.innerHTML = noviPrch + y;
    }

    uneti.innerHTML = rezult;

})
////////////////////////////////////////////////////////////////////////////
/////  clicking on buttons from 0 to 9 => you will enter these numbers 
///// and calculate them

let buttons = document.getElementsByClassName('taster');

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('mouseup', function (e) {

        let b = e.target.innerHTML;

        //console.log('b ' + b);

        unos.innerHTML += b;
        uneti.innerHTML += b;

        document.getElementById('unos').style.fontSize = 'x-large';

        let zunos = unos.innerHTML;
        let zuneti = uneti.innerHTML;
        let bb = zunos.length;
        let pp = zuneti.length;

        //console.log('iz buttona prvi ' + zunos[0]);

        if (zunos[0] == '=') {
            unos.innerHTML = b;
            uneti.innerHTML = b;
        }

        let parcep = zuneti.lastIndexOf(')');
        let parceo = zuneti.lastIndexOf('(');
        let lolo = zuneti.slice(parceo + 1, parcep);
        // console.log('parcep ' + parcep + ' ' + (zuneti[parcep + 1]));
        // console.log('lolo' + lolo);

        if (parcep != -1
            && ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(zuneti[parcep + 1])
        ) {
            // console.log('parcep+1' + (zuneti[parcep + 1]));
            // console.log('parceo' + parceo + 'parcep' + parcep);

            unos.innerHTML = b;
            uneti.innerHTML = zuneti.slice(0, parceo + 1) + lolo + b + ')';
        }

        let prv = uneti.innerHTML;
        if (['*', '/'].includes(prv[0])) {
            unos.innerHTML = zunos.replace(zunos[0], '');
            uneti.innerHTML = prv.replace(prv[0], '');
        }

        let lolol = zuneti.substring(parceo + 1, parcep);
        //console.log('lolol' + lolol + b + 'o' + zuneti[pp - 2]);
        if (lolol.includes('.')
            && zuneti[pp - 2] == ')') {
            unos.innerHTML = lolol + b;
        }
        if (lolol.lastIndexOf('.') == -1
            && zuneti[pp - 2] == ')') {
            unos.innerHTML = lolol + b;
        }
    })
}
//////////////////////////////////////////////////////////////////////////////////
/////  clicking on button "=" => you will evaluate the entered expression

document.getElementById("jednako").addEventListener('mouseup', function (e) {

    let j = e.target.innerHTML;

    // console.log('j ' + j);

    document.getElementById('unos').style.fontSize = 'xx-large';

    let posindd = uneti.innerHTML.length;

    if (['+', '-', '*', '/'].includes(uneti.innerHTML[posindd - 1])) {
        let zam = uneti.innerHTML.substring(0, posindd - 1);
        //console.log('zam ' + zam);
        uneti.innerHTML = zam;
    }

    unos.innerHTML = '=' + eval(uneti.innerHTML);
    uneti.innerHTML += '';

})

///////////////////////////////////////////////////////////////////////////////////
/////  clicking on buttons "-", "+", "/", "*" => you will add these signs
///// to the expression and you will calculate them

let signs = document.getElementsByClassName("znak");

for (let i = 0; i < signs.length; i++) {
    signs[i].addEventListener('mouseup', function (e) {

        let s = e.target.innerHTML;

        if (uneti.innerHTML == '(-)') {
            unos.innerHTML = '';
            uneti.innerHTML = '';
        }

        unos.innerHTML = s;
        uneti.innerHTML += s;

        let g = uneti.innerHTML;

        let res = g.split('');
        let zz = res.length;

        if (
            ['+', '-', '*', '/'].includes(res[zz - 2]) && ['+', '-', '*', '/'].includes(res[zz - 1])
        ) {
            res[zz - 2] = '';
        }

        let rezul = res.join('');
        uneti.innerHTML = rezul;

    })
}

//////////////////////////////////////////////////////////////////////////////////////
//////// THE END //////////////// Made By Natalija Stanimirovic //////////////////////
//////////////////////////////////////////////////////////////////////////////////////