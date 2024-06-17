// Задание 1
// • Используя Symbol.iterator, создайте объект "Музыкальная коллекция", который можно итерировать. Каждая итерация должна возвращать следующий альбом из коллекции.

// • Создайте объект musicCollection, который содержит массив альбомов и имеет свойство-символ Symbol.iterator. Каждый альбом имеет следующую структуру:

// {
// title: "Название альбома",
// artist: "Исполнитель",
// year: "Год выпуска"
// }

// • Реализуйте кастомный итератор для объекта musicCollection. Итератор должен перебирать альбомы по порядку.
// • Используйте цикл for...of для перебора альбомов в музыкальной коллекции и вывода их на консоль в формате: Название альбома - Исполнитель (Год выпуска)


let musicCollection = {
    
albumArray: [{
    title: "Pat",
    artist: "The Beach Boys",
    year: "1966"
},
{
    title: "The Doors",
    artist: "The Doors",
    year: "1967"
},
{
    title: "Rumors",
    artist: "Fleetwood mac",
    year: "1977"
},
{
    title: "So",
    artist: "Peter Gabriel",
    year: "1986"
},
{
    title: "Ambient 1: Music for Airports",
    artist: "Brian Eno",
    year: "1978"
},
{
    title: "Homogenic",
    artist: "Bjork",
    year: "1997"
},
{
    title: "Wish you were here",
    artist: "Pink Floyd",
    year: "1975"
},
{
    title: "Blood Sugar Sex Magic",
    artist: "Red Hot Chilli Peppers",
    year: "1991"
},
{
    title: "To Bring You My Love",
    artist: "PJ Harvey",
    year: "1995"
},
{
    title: "Demon Days",
    artist: "Gorillaz",
    year: "2005"
},
]

}

musicCollection[Symbol.iterator] = function () {
    return {
        index: 0,
        current: this.albumArray[0],
        last: this.albumArray[this.albumArray.length-1],

        next() {
            return this.current !== this.last ? {done: false, value: this.current = musicCollection.albumArray[this.index++]} : {done: true};
        }

    }
}


for (const album of musicCollection) {
    console.log(`${album.title} - ${album.artist} (${album.year})`);
}

// Задание 2
// Вы управляете рестораном, в котором работают разные повара, специализирующиеся на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.

// Необходимо создать систему управления этими заказами, которая позволит:

// • Отслеживать, какой повар готовит какое блюдо.
// • Записывать, какие блюда заказал каждый клиент.

// Используйте коллекции Map для хранения блюд и их поваров, а также для хранения заказов каждого клиента. В качестве ключей для клиентов используйте объекты.

// Повара и их специализации:

// Виктор - специализация: Пицца.
// Ольга - специализация: Суши.
// Дмитрий - специализация: Десерты.

// Блюда и их повара:

// Пицца "Маргарита" - повар: Виктор.
// Пицца "Пепперони" - повар: Виктор.
// Суши "Филадельфия" - повар: Ольга.
// Суши "Калифорния" - повар: Ольга.
// Тирамису - повар: Дмитрий.
// Чизкейк - повар: Дмитрий.

// Заказы:

// Клиент Алексей заказал: Пиццу "Пепперони" и Тирамису.
// Клиент Мария заказала: Суши "Калифорния" и Пиццу "Маргарита".
// Клиент Ирина заказала: Чизкейк.

let menu = new Map();
let pizza = new Set();
pizza.add("Маргарита").add("Пепперони");
let sushi = new Set();
sushi.add("Филадельфия").add("Калифорния");
let dessert = new Set();
dessert.add("Тирамису").add("Чизкейк");
menu.set('Пицца', pizza);
menu.set('Суши', sushi);
menu.set('Десерты', dessert);

let orders = new Map();

let cook = new Map();
cook.set('Виктор', pizza).set('Ольга',sushi).set('Дмитрий',dessert);



let order1 = {
    orderNumber: 0,
    tableNumber: 1,
    numberOfPersons: 1,
    names: "Алексей",
    orderedDishes: ["Пиццa Пепперони" , "Тирамису"]
}
let order2 = {
    orderNumber: 1,
    tableNumber: 2,
    numberOfPersons: 1,
    names: "Мария",
    orderedDishes: ["Суши Калифорния" , "Пиццa Маргарита"]
}
let order3 = {
    orderNumber: 2,
    tableNumber: 3,
    numberOfPersons: 1,
    names: "Ирина",
    orderedDishes: ["Чизкейк"]
}


function addQueue(orders, order) { // добавляем заказ на кухню
    orders.set(order, false); /// фолс обозначает что заказ пока не выполнен
    console.log(`Заказ №${order.orderNumber} поступил на кухню`);
}

function distribution(objOrder) { // распределяем заказы
    for (const iter of cook.keys()) {
        for (const elem of objOrder.orderedDishes) {
            if (cook.get(iter).has(elem)){ // проверка какому повору отправить заказ
                console.log(`Повар ${iter} взял из заказа №${objOrder.orderNumber} на готовку ${elem}`);
                setTimeout(() => console.log(`Повар ${iter} приготовил из заказа №${objOrder.orderNumber}  ${elem}`), 3000);
                
                
            }else if (cook.get(iter).has(elem.split(' ')[1])){ // проверка какому повору отправить заказ проверяем второе слово
                console.log(`Повар ${iter} взял из заказа №${objOrder.orderNumber} на готовку ${elem}`);
                setTimeout(() => console.log(`Повар ${iter} приготовил из заказа №${objOrder.orderNumber}  ${elem}`), 3000);
                
            }
        }
    }
}


function createOrder(orders,objOrder) {
    addQueue(orders,objOrder);
    distribution(objOrder);
    setTimeout(() => console.log(`Заказ №${objOrder.orderNumber} подан`), 8000);
    setTimeout(() => orders.set(objOrder, true), 8000);/// меняем значение на тру обозначаем что заказ выполнен
}

createOrder(orders, order1);
createOrder(orders, order2);
createOrder(orders, order3);


setTimeout(() => console.log(orders), 8000);