//----------------------------MenuPosition------------------------------------------------------------------------
function MenuPosition(foodParams) {
    this.name = foodParams.name;
    this.price = foodParams.price;
    this.calories = foodParams.calories;
}
MenuPosition.prototype.getName = function () {
    return this.name;
}
MenuPosition.prototype.calculateCalories = function () {
    return this.calories;
}
MenuPosition.prototype.calculatePrice = function () {
    return this.price;
}

//----------------------------HAMBURGER------------------------------------------------------------------------

function Hamburger (size, stuffing) {
    MenuPosition.call(this, size, stuffing);
    this.size = size;
    this.stuffing = stuffing;
}
Hamburger.prototype = Object.create(MenuPosition.prototype);
Hamburger.prototype.constructor = Hamburger;
Hamburger.prototype.getName = function(){
    return 'Hamburger ' + this.size.name + ' with ' + this.stuffing.name;
}
Hamburger.prototype.calculatePrice = function () {
    return this.size.price + this.stuffing.price;
}
Hamburger.prototype.calculateCalories = function () {
    return this.size.calories + this.stuffing.calories;
}

Hamburger.SIZE_SMALL = { name: 'small', price: 50, calories: 20};
Hamburger.SIZE_LARGE = { name: 'large', price: 100, calories: 40};
Hamburger.STUFFING_CHEESE = { name: 'cheese', price: 10, calories: 20};
Hamburger.STUFFING_SALAD = { name: 'salad', price: 20, calories: 5};
Hamburger.STUFFING_POTATO = { name: 'potato', price: 15, calories: 10};

//----------------------------DRINK------------------------------------------------------------------------

function Drink( type) {
    MenuPosition.call(this, type);
}
Drink.prototype = Object.create(MenuPosition.prototype);
Drink.prototype.constructor = Drink;
Drink.TYPE_COLA = { name: 'Cola', price: 40, calories: 80};
Drink.TYPE_COFFEE = { name: 'Coffee', price: 80, calories: 20};

//----------------------------SALAD------------------------------------------------------------------------

function Salad(type, weight) {
    MenuPosition.call(this, type, weight)
    this.type = type;
    this.weight = weight;
}
Salad.prototype = Object.create(MenuPosition.prototype);
Salad.prototype.constructor = Salad;
Salad.prototype.getName = function (){
    return 'Salad ' + this.type.name + ' ' + this.weight + ' grams';
}
Salad.prototype.calculatePrice = function () {
    return this.type.price * this.weight / 100;
}
Salad.prototype.calculateCalories = function () {
    return this.type.calories * this.weight / 100;
}

Salad.TYPE_OLIVIE = { name: 'Olivie', price: 50, calories: 80 };
Salad.TYPE_CAESAR = { name: 'Caesar', price: 100, calories: 20 };

//----------------------------ORDER------------------------------------------------------------------------

function Order () {
    this.positions = [].slice.call(arguments);
    this.isPaid = false;
}

Order.prototype.getTotalPrice = function(){
    var price = 0;
    this.positions.forEach(function (position) {
        price += position.calculatePrice();
    })
    console.log('Total price:\n' +
        '-------------------------------------------------\n' +
        price + '\n');
}

Order.prototype.getTotalCalories = function(){
    var calories = 0;
    this.positions.forEach(function (position) {
        calories += position.calculateCalories();
    })
    console.log('Total calories:\n' +
        '-------------------------------------------------\n' +
        calories + '\n')
}

Order.prototype.addPosition = function (position) {
    if (!this.isPaid) this.positions.push(position)
    else console.log('You can\'t change order, it\'s already paid\n' );
}

Order.prototype.removePosition = function (position){
    if (!this.isPaid) {
        if (this.positions.indexOf(position) !== -1) {
            this.positions.splice(this.positions.indexOf(position), 1);
        } else {
            console.log('No such position in order\n');
        }
    } else {
        console.log('You can\'t change order, it\'s already paid\n');
    }
}

Order.prototype.showOrder = function () {
    console.log('Your order:\n' +
        '-------------------------------------------------');
    this.positions.forEach(function (position) {
        console.log(position.getName())
    })
    console.log();
}

Order.prototype.pay = function () {
    this.isPaid = true;
    Object.freeze(this);
    console.log('Successfully paid\n')
}
//----------------------------Test------------------------------------------------------------------------

var hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_SALAD);
var caesar = new Salad(Salad.TYPE_CAESAR, 200);
var olivie = new Salad(Salad.TYPE_OLIVIE, 150);
var cola1 = new Drink(Drink.TYPE_COLA)
var cola2 = new Drink(Drink.TYPE_COLA)
var order = new Order(hamburger, caesar, olivie, cola1);
order.addPosition(cola1)
order.showOrder();
order.removePosition(cola1);
order.showOrder();
order.getTotalPrice();
order.getTotalCalories();

