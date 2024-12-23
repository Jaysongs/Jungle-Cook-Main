import * as $ from "jquery";
import { createUserWithEmailAndPassword, getAuth, signOut, signInWithEmailLink, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebaseConfig";


const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is signed in");
        $("#your-recipes").css("display", "block");
    } else {
        console.log("User is signed out");
        $("#your-recipes").css("display", "none");
    }
});


export function signUserUp(firstName, lastName, email, password) {
    console.log("model sign in")
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
        console.log("User created");

        alert(`Welcome, ${firstName}! Your account has been created successfully.`);
    })
    .catch((error) => {
        console.log(error);
    });


}

export function changePage(pageName) {
    console.log("pageName", pageName);

    if (pageName == "") {
        $.get("pages/home.html", (data) => {
            $("#app").html(data);

            $("#your-recipes").css("display", "none");
            $("#so").css("display", "none");
        }).fail((error) => {
            console.log("error", error);
        });
    } else {
        $.get(`pages/${pageName}.html`, (data) => {
            $("#app").html(data);
            if (pageName == "login") {
                addLoginListener();
            }

            if (pageName == "create-recipe") {
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
        }).fail((error) => {
            console.log("error", error);
        });
    }
}



export function signUserOut() {
    signOut(auth)
    .then(() => {
        console.log("User signed out");

    })
    .catch((error) => {
        console.log("Error" + error);
    });
}

export function signUserIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
        console.log("User signed in");

    })
    .catch((error) => {
        console.log(error);
    });
}

function initializeApp() {
    $("#your-recipes").css("display", "none");
    $("#so").css("display", "none");
}

function addLoginListener() {
    $("#submit").on("click", () => {
        const firstName = $("#fName").val();
        const lastName = $("#lName").val();
        const email = $("#email").val();
        const password = $("#password").val();



        signUserUp(firstName, lastName, email, password);

        $("#your-recipes").css("display", "block");
        $("#so").css("display", "block");
    });

    $("#siSubmit").on("click", () => {
        let siEmail = $("#siEmail").val();
        let siPassword = $("#siPassword").val();

        alert(`You are signed in with: ${siEmail}`);

        signUserIn(siEmail, siPassword);

        $("#your-recipes").css("display", "block");
        $("#so").css("display", "block");

    });

    $("#so").on("click", () => {
        signUserOut();

        $("#your-recipes").css("display", "none");
        $("#so").css("display", "none");
    });
}

let recipes = JSON.parse(localStorage.getItem("recipes")) || []; 

export function saveRecipe(recipe) {
    recipes.push(recipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));
}

export function getRecipes() {
    return JSON.parse(localStorage.getItem("recipes")) || [];
}

$(document).ready(() => {
    initializeApp();
});
