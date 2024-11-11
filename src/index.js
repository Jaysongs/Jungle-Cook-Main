import * as $ from "jquery";
import { signUserUp, signUserOut, signUserIn } from "./model.js"

function initListeners() {
    $("#submit").on("click", () => {
        const firstName = $("#fName").val();
        const lastName = $("#lName").val();
        const email = $("#email").val();
        const password = $("#password").val();

        signUserUp(firstName, lastName, email, password);
    });

    $("#so").on("click", () => {
        signUserOut();
    });

    $("#siSubmit").on("click", () => {
        let siEmail = $("#siEmail").val();
        let siPassword = $("#siPassword").val();
        signUserIn(siEmail, siPassword);
    });
}
 
$(document).ready(function () {
initListeners();
});



const hamburgerMenu = document.querySelector(".hamburger-menu");
const nav = document.querySelector(".nav");

hamburgerMenu.addEventListener("click", () => {
    nav.classList.toggle("active");
});

function initListeners() {
    $("nav a").on("click", function (e) {
        let id = e.currentTarget.id;
        console.log(id);
        $("#app").html(id);
        nav.classList.toggle("active");
    });

}
 
$(document).ready(function () {
initListeners();
});






import { changePage } from "src/model.js";

function route() {
    let hashTag = window.location.hash;
    let pageID = hashTag.replace("#", "");
    console.log("route", pageID);
    changePage(pageID);
}

function initSite() {
    $(window).on("hashchange", route);
    route();
}

 
$(document).ready(function () {
initSite();
});
