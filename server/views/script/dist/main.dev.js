"use strict";

window.onload = function () {
  var indexbtn = document.getElementById("goindexbtn");
  indexbtn.addEventListener("click", function () {
    window.location = '/chadlly';
  });
  var filterbtn = document.getElementById("gofilterbtn");
  filterbtn.addEventListener("click", function () {
    window.location = '/chadlly/filter';
  });
  var coursebtn = document.getElementById("gocoursebtn");
  coursebtn.addEventListener("click", function () {
    window.location = '/chadlly/course';
  });
};