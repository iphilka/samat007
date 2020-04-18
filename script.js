"use strict";

let vkLogin = document.querySelector("#vkLogin");
console.log(vkLogin);

let user;

vkLogin.addEventListener('click', function () {
 
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
      console.log(user.first_name);
      console.log(user.last_name);
      alert("Hello" + user.first_name + " " + user.last_name);
  });

  