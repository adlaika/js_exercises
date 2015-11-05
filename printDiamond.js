//print diamond shape in console, given n for widest point.
//for even ns, round up to nearest odd n

//example:
// printDiamond(3):
// *
//***
// *

//printDiamond(5):
//  *
// ***
//*****
// ***
//  *

//printDiamond(7):
//   *
//  ***
// *****
//*******
// *****
//  ***
//   *

function printDiamond (n) {
    var results = [];

    if (n % 2 === 2) n++;
    for (var i = 0; i < (n + 1) / 2; i++) {
        results.push(buildLine(n, i));
    }

    results.forEach(function(x){console.log(x)});
    for (var i = results.length - 2; i >= 0; i--) {
        console.log(results[i]);
    }
}

function buildLine (n, lineNumber) {
    var line = '';
    var spaces = (n + 1) / 2 - lineNumber;
    var stars = (lineNumber * 2) + 1;

    for (var i = 0; i < spaces; i++) {
        line += ' ';
    }
    for (var i = 0; i < stars; i++) {
        line += '*';
    }

    return line;
}

