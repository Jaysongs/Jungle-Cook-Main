import * as $ from "jquery";
import { signUserUp, signUserOut, signUserIn , changePage} from "./model.js"

const hamburgerMenu = document.querySelector(".hamburger-menu");
const nav = document.querySelector(".nav");

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

function addListeners() {
   
    
    hamburgerMenu.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

    $("nav a").on("click", function (e) {
        let id = e.currentTarget.id;
        console.log(id);
        $("#app").html(id);
        nav.classList.toggle("active");
    });
}

$(document).ready(function () {
    initSite();
     addListeners();
    });














 

