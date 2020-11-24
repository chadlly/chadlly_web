window.onload = () => {

    let indexbtn = document.getElementById("goindexbtn");
    indexbtn.addEventListener("click", function(){

        window.location = '/chadlly'
    });

    let filterbtn = document.getElementById("gofilterbtn");
    filterbtn.addEventListener("click", function(){

        window.location = '/chadlly/filter'
    });

    let coursebtn = document.getElementById("gocoursebtn");
    coursebtn.addEventListener("click", function(){

        window.location = '/chadlly/course'
    });
}