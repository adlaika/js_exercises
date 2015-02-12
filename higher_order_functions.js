//implement an action on each member of an collection or object
function forEach(collection, action){
  if (collection.constructor === Array){
    for (var i = 0; i < collection.length; i++)
      action(collection[i]);
  } else {
    for (key in collection){
      action(collection[key]);
    }
  }
};



//filters an collection by the result of a given function
function myFilter(collection, pred){
  result = [];
  for (var i = 0; i < collection.length; i++){
    if (pred(collection[i])){
      result.push(collection[i]);
    }
  };
  return result;
};

//applies function to elements of collection, returns results in a new collection
function myMap(collection, f){
  mapped = [];
  for (var i = 0; i < collection.length; i++){
    mapped.push(f(collection[i]));
  };
  return mapped;
};

//reduces an collection to a single value, using a given function
function myReduce(collection, start, f){
  current = start;
  for (var i = 0; i < collection.length; i++){
    current = f(current, collection[i]);
  };
  return current;
};
