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

    $("#ingredBTN").on("click", function () {
        if ($(".input-ingred").length) {
            const numOfIngreds = $(".input-ingred input[type='text']").length;
            const newIngred = $(`<input type="text" placeholder="Ingredient #${numOfIngreds + 1}">`);
            $(".input-ingred").append(newIngred);
        } else {
            console.error("Ingredient container not found!");
        }
    });

    $("#instBTN").on("click", function () {
        if ($(".input-instruct").length) {
            const numOfInstrs = $(".input-instruct input[type='text']").length;
            const newInstr = $(`<input type="text" placeholder="Instruction #${numOfInstrs + 1}">`);
            $(".input-instruct").append(newInstr);
        } else {
            console.error("Instruction container not found!");
        }
    });

    
}

$(document).ready(function () {
    initSite();
     addListeners();
    });

   