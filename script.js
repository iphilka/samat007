"use strict";

//Моки эмулирующие работу сервера
let games = ["Minecraft", "Ведьмак 3"];

let vkLogin = document.querySelector("#vkLogin");
let buyButtons = document.querySelectorAll(".button");
// console.log(vkLogin);


let user;


let DonwloadButtonHendler = function(button){
  button.addEventListener("click", function(evt) {
    evt.preventDefault();
    alert("Скачивание Началось");
  });
};

let BuyButtonHendler = function(button){
    button.addEventListener("click", function(evt) {
    evt.preventDefault();
    if(confirm("Хотите купить игру?") == true){
      button.style.background = "rgb(37, 63, 210)";
      button.href = "download.html";
      button.textContent = "Скачать";
  }
  });
};

let AutorizationFunction = function(){
  vkLogin.style.cssText = "font-size: 10px";
  vkLogin.style.cssText = "color: rgb(37, 210, 37)";
  vkLogin.textContent = "Привет, " + user.first_name + " " + user.last_name;
};

let pageUpgrade = function () {
  outer: for (let i = 0; i < buyButtons.length; i++) {
    
    //Проверить куплена ли игра 
    let parentButton = buyButtons[i].parentNode.querySelector(".gameTitle").textContent;

    for (let j = 0; j < games.length; j++) {
      
      if (parentButton == games[j]){
        buyButtons[i].style.background = "rgb(37, 63, 210)";
        buyButtons[i].href = "download.html";
        buyButtons[i].textContent = "Скачать";
        //вызываем функцию которая вешает обработчик на кнопку Скачать
        DonwloadButtonHendler(buyButtons[i]);
        continue outer;
      }
      else{
        buyButtons[i].style.background = "rgb(37, 210, 37)";
        buyButtons[i].href = "link.html";
        //вызываем функцию которая вешает обработчик на кнопку купить
        BuyButtonHendler(buyButtons[i]);
        continue outer;
      }
      
    }
  }
};

vkLogin.addEventListener('click', function (evt) {
    evt.preventDefault();
    // Авторизация
    VK.Auth.login(
      // callback-функция, которая будет вызвана после авторизации
      function (response) {
 
        console.log(response)
 
        if (response.status === 'connected') { // авторизация прошла успешно
 
          user = response.session.user; //  информация о пользователе

            /*
             user.first_name - имя;
             user.last_name - фамилия;
             user.href - ссылка на страницу в формате https://vk.com/domain;
             user.id  - идентификатор пользователя;
             user.nickname -  отчество или никнейм (если указано);
             */
 
        } else if (response.status === 'not_authorized') { // пользователь авторизован в ВКонтакте, но не разрешил доступ приложению;
        } else if (response.status === 'unknown') { // пользователь не авторизован ВКонтакте.
        }
 
      },
      // права доступа (integer)
      // допустимые значения:
      // AUDIO:8
      // FRIENDS:2
      // MATCHES:32
      // PHOTOS:4
      // QUESTIONS:64
      // VIDEO:16
      // WIKI:128
      VK.access.PHOTOS
    );
    //   console.log(user.first_name);
    //   console.log(user.last_name);
    setTimeout(AutorizationFunction, 2000);
  });

 