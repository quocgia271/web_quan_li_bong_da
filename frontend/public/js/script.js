let navbar = document.querySelector('.header .flex .navbar');
let profile = document.querySelector('.header .flex .profile');


function loader(){
   document.querySelector('.loader').style.display = 'none';
}

function fadeOut(){
   setInterval(loader, 100);
}

window.onload = fadeOut;

document.addEventListener("DOMContentLoaded", function () {
   fetch("/view/common/khachhang/header/menu.html")
      .then(response => response.text())
      .then(data => {
         document.getElementById("menu").innerHTML = data;

         // Đợi nội dung load xong rồi gán sự kiện
         let navbar = document.querySelector('.header .flex .navbar');
         let profile = document.querySelector('.header .flex .profile');

         document.querySelector('#menu-btn').onclick = () => {
            navbar.classList.toggle('active');
            profile.classList.remove('active');
         }

         document.querySelector('#user-btn').onclick = () => {
            profile.classList.toggle('active');
            navbar.classList.remove('active');
         }

         window.onscroll = () => {
            profile.classList.remove('active');
            navbar.classList.remove('active');
         }
      })
      .catch(error => console.error("Error loading menu:", error));
});






