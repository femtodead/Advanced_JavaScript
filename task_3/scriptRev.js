import {idNumber} from "./bd.js";



let modelList = [];

idNumber(); // если отзыв был не оставлен вытягивает все елементы из bd.js (типо старые отзывы)




function commentsSet() {
            const comments = document.querySelector('.comments');
            for (let index = 1; index <= localStorage.length; index++) { // бегаем по элементам ls чтобы вырвать от туда модели и добавить в масив
                if(!modelList.includes(localStorage.getItem(String(index)).split('//\\@3')[0])){
                    modelList.push(localStorage.getItem(String(index)).split('//\\@3')[0]);
                }
            }
            let id = 0;
            modelList.forEach(element => { // бегаем по массиву с моделями чтобы добавить дитейлсы
                const det = document.createElement('details'); 
                det.classList.add(element.replace(/\s+/g, ''));

                const summ = document.createElement('summary');
                summ.textContent = element;

                const ul = document.createElement('ul');
                ul.id = id;
                id++;
                det.appendChild(summ);
                det.appendChild(ul);
                comments.appendChild(det);
            });
            for (let index = 1; index <= localStorage.length; index++) { // бегаем по ls чтобы добавить коментарии
                
                const comm = document.getElementById(modelList.indexOf(localStorage.getItem(String(index)).split('//\\@3')[0]));
                
                const li = document.createElement('li')
                li.textContent = localStorage.getItem(String(index)).split('//\\@3')[1]
                li.id = `com${index}`
                console.log(localStorage.getItem(String(index)).split('//\\@3').length > 2, localStorage.getItem(String(index)).split('//\\@3').length,localStorage.getItem(String(index)).split('//\\@3'));
                if (localStorage.getItem(String(index)).split('//\\@3').length > 2){ // если длинна ls елемента больше 2 после .split по  этому (//\\@3)  разделителю, а она больше если комментайрий был оставлен пользователем , то создаем кнопку удалить + приделываем событие на клик;  
                    const buttonDel = document.createElement('button');
                    buttonDel.classList.add(`butt${index}`)
                    buttonDel.textContent = 'удалить';
                    li.appendChild(buttonDel);
                    comm.appendChild(li);
                    document.querySelector(`.butt${index}`).addEventListener('click', function (e) {
                        const lidel = document.querySelector(`.butt${index}`).closest('li');
                        localStorage.removeItem(lidel.id[lidel.id.length-1]) //удаление из локал стореджа по id елемента точней по последней цифре
                        if(lidel.closest('details').children[1].firstChild ==  lidel){ // здесь мы вычисляем есть ли еще комментарии по данному продукту если их нет то удаляем весь дитейлс, если комментарии еще есть удаляем только оставленныый пользователем кмменит
                            lidel.closest('details').remove();
                        }else{
                            lidel.remove();
                        }
                        
                    });
                }else{
                    comm.appendChild(li);
                }
                
            }
            console.log(modelList);
            }

commentsSet();