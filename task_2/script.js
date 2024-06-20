// Задание 1
// Представьте, что у вас есть класс для управления библиотекой. В этом классе будет приватное свойство для хранения списка книг, а также методы для добавления книги, удаления книги и получения информации о наличии книги.

// Класс должен содержать приватное свойство #books, которое инициализируется пустым массивом и представляет собой список книг в библиотеке.

// Реализуйте геттер allBooks, который возвращает текущий список книг.

// Реализуйте метод addBook(title), который позволяет добавлять книгу в список. Если книга с таким названием уже существует в списке, выбросьте ошибку с соответствующим сообщением.

// Реализуйте метод removeBook(title), который позволит удалять книгу из списка по названию. Если книги с таким названием нет в списке, выбросьте ошибку с соответствующим сообщением.

// Реализуйте метод hasBook(title), который будет проверять наличие книги в библиотеке и возвращать true или false в зависимости от того, есть ли такая книга в списке или нет.

// Реализуйте конструктор, который принимает начальный список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив не содержит дубликатов; в противном случае выбрасывайте ошибку.

class LibraryManagement {
    #books = [];

    get allBooks() {
        return this.#books;
    }
    set allBooks(books) {
        this.#books = books;
    }
    addBook(title){
        for (const book of this.#books) {
            if (book == title){
                throw new Error("Такая книга уже есть");
            }
        }
        this.#books.push(title);
    }
    removeBook(title){
        if (!this.#books.includes(title)){
            throw new Error("Такой книги нет");
        }
        this.#books.splice(this.#books.indexOf(title), 1)
    }
    hasBook(title){
        return this.#books.includes(title);
    }
    constructor(books){
        if (new Set(books).size !== books.length){
            throw new Error("В массиве есть повторения");
        }
        this.#books = books;
    }

}

const lm = new LibraryManagement([]);


lm.addBook('Анна Каренина');
lm.addBook('Гордость и предубеждение');
lm.addBook('Евгений Онегин');
lm.addBook('Мартин Иден');
// lm.addBook('Мартин Иден'); проверка исключений 


console.log(lm.hasBook('Анна Каренина'));
console.log(lm.hasBook('Братья Карамазовы'));


console.log(lm.allBooks); 
lm.removeBook('Гордость и предубеждение')
// lm.removeBook('Собор Парижской Богоматери') проверка исключений 
console.log(lm.allBooks); 


const books = ['Анна Каренина','Гордость и предубеждение','Евгений Онегин','Мартин Иден','Братья Карамазовы','Собор Парижской Богоматери','Ромео и Джульетта','Мастер и Маргарита','Финансист','1984'];
const lm1 = new LibraryManagement(books);
console.log(lm1.allBooks); 
const books2 = ['Анна Каренина','Гордость и предубеждение','Евгений Онегин','Мартин Иден','Братья Карамазовы','Собор Парижской Богоматери','Ромео и Джульетта','Мастер и Маргарита','Финансист','1984','1984'];
// const lm2 = new LibraryManagement(books2); проверка исключений 
// console.log(lm2.allBooks);


// Задание 2
// Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные сообщения, вы решаете установить некоторые ограничения.

// Создайте HTML-структуру с текстовым полем для ввода отзыва, кнопкой для отправки и контейнером, где будут отображаться отзывы.

// Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами. Однако если длина введенного отзыва менее 50 или более 500 символов, функция должна генерировать исключение.

// При добавлении отзыва, он должен отображаться на странице под предыдущими отзывами, а не заменять их.

const initialData = [
    {
    product: "Apple iPhone 13",
    reviews: [
    {
    id: "1",
    text: "Отличный телефон! Батарея держится долго.",
    },
    {
    id: "2",
    text: "Камера супер, фото выглядят просто потрясающе.",
    },
    ],
    },
    {
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
    {
    id: "3",
    text: "Интересный дизайн, но дорогой.",
    },
    ],
    },
    {
    product: "Sony PlayStation 5",
    reviews: [
    {
    id: "4",
    text: "Люблю играть на PS5, графика на высоте.",
    },
    ],
    },
    ];
    function idNumber(initialData) {
        let id = 1;
        initialData.forEach(element => {
            id = id + element.reviews.length;
        });
        return String(id);
    }

    function commentsSet(listComm) {
        const comm = document.querySelector('.comments');
        comm.innerHTML = ' ';
        listComm.forEach(element => {
            element.reviews.forEach(elem =>{
                const div = document.createElement('div');
                div.classList.add("commentId"+elem.id);
                div.classList.add("commentId");

                const p1 = document.createElement('p');
                p1.textContent = 'Модель: ' + element.product;
                div.appendChild(p1);
                const p2 = document.createElement('p');
                p2.textContent = 'Комментарий: ' + elem.text;
                div.appendChild(p2);
                
                comm.appendChild(div);
            })
        });
    }

    commentsSet(initialData);

    document.querySelector('.buttonIn').addEventListener('click', function (e) {
        const model = document.querySelector('.model');
        const textComment = document.querySelector('.textComment');

        if (model.value.length == 0){
            alert('Введите модель');
        }
        else if (textComment.value.length < 50 || textComment.value.length > 500){
            alert('длина введенного отзыва не должна быть менее 50 или более 500 символов');
        }
        else{
                let flag = true;
                const idNum = idNumber(initialData);
                initialData.forEach(element => {
                    if(element.product.toLowerCase() == model.value.toLowerCase()){
                        element.reviews.push({id: idNum,
                            text: textComment.value
                        })
                        flag = false;
                    }
                });
                if(flag){
                    initialData.push(    {
                        product: String(model.value),
                        reviews: [
                        {
                        id: idNum,
                        text: textComment.value,
                        }
                        ]})
                }
        }
        console.log(initialData);
        commentsSet(initialData);
    });
    