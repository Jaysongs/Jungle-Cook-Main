import * as $ from "jquery";
import { signUserUp, signUserOut, signUserIn , changePage, saveRecipe, getRecipes} from "./model.js"

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

function addRecipeListeners() {
    $("#createBTN").on("click", () => {
        const name = $("input[placeholder='Recipe Name']").val();
        const description = $("input[placeholder='Recipe Description']").val();
        const totalTime = $("input[placeholder='Recipe Total Time']").val();
        const servingSize = $("input[placeholder='Recipe Serving Size']").val();

        const ingredients = [];
        $(".input-ingred input[type='text']").each(function () {
            ingredients.push($(this).val());
        });

        const instructions = [];
        $(".input-instruct input[type='text']").each(function () {
            instructions.push($(this).val());
        });

        const newRecipe = {
            name,
            description,
            totalTime,
            servingSize,
            ingredients,
            instructions,
        };

       
        saveRecipe(newRecipe);

        alert("Recipe created successfully!");

      
        window.location.hash = "view-recipes";
        renderRecipes(); 
    });
}

function renderRecipes() {
    const recipes = getRecipes(); 
    const recipesContainer = $(".recipes");
    recipesContainer.empty();

    recipes.forEach((recipe) => {
        const recipeHTML = `
            <div class="recipe-block">
                <div class="recipe-img">
                    <img src="../dist/assets/images/default-recipe.jpg" alt="${recipe.name}">
                </div>
                <div class="recipe">
                    <div class="details">
                        <h2>${recipe.name}</h2>
                        <p>${recipe.description}</p>
                        <span><img src="../dist/assets/images/timer.png" alt="timer"> ${recipe.totalTime}</span>
                        <span><img src="../dist/assets/images/silverplate.png" alt="servings"> ${recipe.servingSize} servings</span>
                        <p><strong>Ingredients:</strong></p>
                        <ul>${recipe.ingredients.map((item) => `<li>${item}</li>`).join("")}</ul>
                        <p><strong>Instructions:</strong></p>
                        <ol>${recipe.instructions.map((step) => `<li>${step}</li>`).join("")}</ol>
                    </div>
                </div>
            </div>
        `;
        recipesContainer.append(recipeHTML);
    });
}



$(document).ready(function () {
    initSite();
     addListeners();
    });

   