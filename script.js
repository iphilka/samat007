"use strict";

let vkLogin = document.querySelector("#vkLogin");
let buyButtons = document.querySelectorAll(".button");
// console.log(vkLogin);

let user;

let testFunction = function(){
  vkLogin.style.cssText = "font-size: 18px";
  vkLogin.style.cssText = "color: rgb(37, 210, 37)"
  vkLogin.textContent = "Привет, " + user.first_name + " " + user.last_name;
  for (let i = 0; i < buyButtons.length; i++) {
    buyButtons[i].style.background = "rgb(37, 210, 37)";
    buyButtons[i].href = "link.html";
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
    setTimeout(testFunction, 2000);
  });

 