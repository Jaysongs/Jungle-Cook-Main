import * as $ from "jquery";
import { createUserWithEmailAndPassword, getAuth, signOut, signInWithEmailLink, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebaseConfig";


const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is signed in");
        $("#yourRecipesToggle").css("display", "block");
    } else {
        console.log("User is signed out");
        $("#yourRecipesToggle").css("display", "none");
    }
});


export function signUserUp(firstName, lastName, email, password) {
    console.log("model sign in")
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
        console.log("User created");
    })
    .catch((error) => {
        console.log(error);
    });


}

export function changePage(pageName) {
    console.log("pageName", pageName);
    if(pageName == "") {
        $.get("pages/home.html", (data) => {
            $("#app").html(data);
        }).fail((error) => {
            console.log("error", error);
        });
    } else {
        $.get(`pages/${pageName}.html`, (data) => {
            $("#app").html(data);
            if (pageName == "login") {
                addLoginListener();
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

function addLoginListener() {
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