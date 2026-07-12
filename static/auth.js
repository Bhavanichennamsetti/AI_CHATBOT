// auth.js

document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form");

    if (!form) return;

    form.addEventListener("submit", (e) => {

        const username = document.querySelector(
            'input[name="username"]'
        );

        const password = document.querySelector(
            'input[name="password"]'
        );

        if (username.value.trim() === "") {
            alert("Enter username.");
            username.focus();
            e.preventDefault();
            return;
        }

        if (password.value.trim() === "") {
            alert("Enter password.");
            password.focus();
            e.preventDefault();
            return;
        }

    });

});