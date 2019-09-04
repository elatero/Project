'use strict'

let menu = document.getElementsByClassName('menu')[0],
    menuItem = document.getElementsByClassName("menu-item"),
    title = document.getElementById("title"),
    adv = document.getElementsByClassName("adv")[0],
    promptforApple = document.querySelector("#prompt"),
    menuItemLi = document.createElement("li");

menu.insertBefore(menuItem[2], menuItem[1]); // меняем местами

menuItemLi.classList.add("menu-item");  // создаем новый пункт меню
menuItemLi.textContent = "Пятый элемент";
menu.appendChild(menuItemLi);

document.body.style.backgroundImage = "url('img/apple_true.jpg')"; // меняем фон

title.textContent = "Мы продаем только подлинную технику Apple";

adv.remove(); // удаляем рекламу со страницы

let yourOpinion = prompt("Ваше отношение к технике Apple?");   // Отношение к технике Apple
promptforApple.textContent = yourOpinion;
