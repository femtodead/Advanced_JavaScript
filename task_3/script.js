import {idNumber} from "./bd.js";

// Страница добавления отзыва:

// Поле для ввода названия продукта.
// Текстовое поле для самого отзыва.
// Кнопка "Добавить отзыв", которая сохраняет отзыв о продукте в LocalStorage.

// Страница просмотра отзывов:

// Показывает список всех продуктов, о которых были оставлены отзывы.
// При клике на название продукта отображается список всех отзывов по этому продукту.
// Возможность удаления отзыва (при нажатии на кнопку "Удалить" рядом с отзывом, данный отзыв удаляется из LocalStorage).
// localStorage.clear();
console.log(localStorage.length);




            
            const button = document.querySelector('.buttonIn')
            
            button.addEventListener('click', function (e) {
                const model = document.querySelector('.model');
                const textComment = document.querySelector('.textComment');
                
                if (model.value.length == 0){
                    alert('Введите модель');
                }
                else if (textComment.value.length < 50 || textComment.value.length > 500){
                    alert('длина введенного отзыва не должна быть менее 50 или более 500 символов');
                }
                else if(model.value/1){
                    alert('модель не может быть числом')
                }
                else{
                    const idNum = idNumber();// вытягивает все елементы из bd.js (типо старые отзывы)
                    localStorage.setItem(idNum+1,[model.value +'//\\@3'+ textComment.value +'//\\@3'+ 'yuo'])// //\\@3 это разделитель на будущее



                    }

                });
                
