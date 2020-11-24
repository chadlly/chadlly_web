window.onload = () => {

    let backbtn = document.getElementById("gobackbtn");
    backbtn.addEventListener("click", function(){
        console.log("button clicked");
        window.location = '/chadlly/main'
    });
}