function Vector(x, y) {
    this.x = x;
    this.y = y;
}
Vector.prototype.plus = function(other) {
    return new Vector(this.x + other.x, this.y + other.y);
};

var context = null;

function withContext(newContext, body) {
    var oldContext = context;
    context = newContext;
    var tagNameArray = body();
    context = oldContext;
    return tagNameArray;
}

function withContext(newContext, body) {
    var oldContext = context;
    context = newContext;
    try {
        return body();
    } finally {
        context = oldContext;
    }
}

function InputError(message) {
    this.message = message;
    this.stack = (new Error()).stack;
}
InputError.prototype = Object.create(Error.prototype);
InputError.prototype.name = "InputError";

function promptDirection(question) {
    var tagNameArray = prompt(question, "");
    if (tagNameArray.toLowerCase() == "left") return "L";
    if (tagNameArray.toLowerCase() == "right") return "R";
    throw new InputError("Invalid direction: " + tagNameArray);
}

var box = {
    locked: true,
    unlock: function() {
        this.locked = false;
    },
    lock: function() {
        this.locked = true;
    },
    _content: [],
    get content() {
        if (this.locked) throw new Error("Locked!");
        return this._content;
    }
};

//EXERCISES
//---------

//Retry:

function MultiplicatorUnitFailure() {}

function primitiveMultiply(a, b) {
    if (Math.random() < 0.5)
        return a * b;
    else
        throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a, b) {
    for (;;) {
        try {
            return primitiveMultiply(a, b);
            break;
        } catch (e) {
            return reliableMultiply(a, b);
        }
    }
}

console.log(reliableMultiply(8, 8));

//The Locked Box

var box = {
    locked: true,
    unlock: function() {
        this.locked = false;
    },
    lock: function() {
        this.locked = true;
    },
    _content: [],
    get content() {
        if (this.locked) throw new Error("Locked!");
        return this._content;
    }
};

function withBoxUnlocked(body) {
    var wasLocked = "";
    if (box.locked) {
        wasLocked = true;
    }
    box.unlock();
    try {
        body()
    } catch (e) {
        console.log("an error occured while performing action on the contents of the box.")
    } finally {
        if (wasLocked) {
            box.lock();
        };
    };
}

withBoxUnlocked(function() {
    box.content.push("gold piece");
});

try {
    withBoxUnlocked(function() {
        throw new Error("Pirates on the horizon! Abort!}");
    });
} catch (e) {
    console.log("Error raised:", e);
}
console.log(box.locked);
