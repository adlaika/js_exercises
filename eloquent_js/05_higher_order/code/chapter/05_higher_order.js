var ancestry = JSON.parse(ANCESTRY_FILE);

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

function reduceAncestors(person, f, defaultValue) {
  function valueFor(person) {
    if (person == null)
      return defaultValue;
    else
      return f(person, valueFor(byName[person.mother]),
                       valueFor(byName[person.father]));
  }
  return valueFor(person);
}

function sharedDNA(person, fromMother, fromFather) {
  if (person.name == "Pauwels van Haverbeke")
    return 1;
  else
    return (fromMother + fromFather) / 2;
}

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}



//-------------Flatten---------------------
function flatten(arrays) {
  return arrays.reduce(function(flat, add) {
    return flat.concat(add);
  });
}

var arrays = [[1, 2, 3], [4, 5], [6]];
//console.log(flatten(arrays)); // [1,2,3,4,5,6];


//-------Mother-Child Age Difference-------
function hasKnownMother(name) {
  return byName[byName[name].mother] != undefined;
} //checks if "name"s mother has data in JSON object

//console.log(hasKnownMother("Maria Sturm"));
//false

var peopleWithKnownMothers = Object.keys(byName).filter(function(name){
  return hasKnownMother(name)
});
//console.log(peopleWithKnownMothers);
//returns list of people whose mothers exist in ancestry data

function mothersAgeAtChildbirth(name) {
  if (byName[byName[name].mother] != undefined) {
    return byName[name].born - byName[byName[name].mother].born;
  } else {
    return undefined;
  }
} //returns difference between "name"s
  //and "name"s mother's ages

//console.log(mothersAgeAtChildbirth("Carolus Haverbeke"));
//31

//console.log(mothersAgeAtChildbirth("Maria Sturm"));
//undefined

var ageDifferences = [];
peopleWithKnownMothers.forEach(function(name){
  return ageDifferences.push(mothersAgeAtChildbirth(name));
});
//create array of ages at childbirth

//console.log(ageDifferences);
//return said array

console.log(average(ageDifferences));

//--------Historical Life Expectancy--------------
function deathCenturyOf(person) {
  return Math.ceil(person.died / 100);
}
//computes century in which given person died

//console.log(deathCenturyOf(byName["Maria Sturm"]));
//20 (th century)

function ageOfDeath(person){
  return person.died - person.born;
}


function groupBy(arr, groupOf){
  var groups = {};
  for (i = 0; i < arr.length; i++){
    var groupName = groupOf(arr[i]);
    if (groupName in groups) {
      groups[groupName].push(arr[i]);
    } else {
      groups[groupName] = [arr[i]];
    }
  }
  return groups;
}

var byCentury = groupBy(ancestry, deathCenturyOf);
//obj containing persons grouped by century of death

for (var century in byCentury){
  var ages = byCentury[century].map(function(person){
    return ageOfDeath(person);
  });
  console.log(century + ": " + average(ages));
}

/* Uglier way of doing it below:
var ageOfDeathbyCentury = {};
ancestry.forEach(function(person){
  var ageOfDeath = person.died - person.born;
  if (ageOfDeathbyCentury[deathCenturyOf(person)] == undefined) {
    ageOfDeathbyCentury[deathCenturyOf(person)] = [ageOfDeath];
  } else {
    ageOfDeathbyCentury[deathCenturyOf(person)].push(ageOfDeath);
  }
});

//console.log(ageOfDeathbyCentury);

cens = Object.keys(ageOfDeathbyCentury);
//console.log(cens);

cens.forEach(function(cen) {
  console.log(average(ageOfDeathbyCentury[cen]));
});
*/
//--------Every and then Some--------
function every(array, pred){
  for(i = 0; i < array.length; i++){
    if (pred(array[i]) == false)
      return false;
  }
  return true;
}

console.log(every([NaN,NaN,NaN], isNaN));
//true
console.log(every([NaN,NaN,4], isNaN));
//false

function some(array, pred){
  for(i = 0; i < array.length; i++){
    if (pred(array[i]) == true)
      return true;
  }
  return false;
}

console.log(some([NaN, 3, 4], isNaN));
// → true
console.log(some([2, 3, 4], isNaN));
// → false

