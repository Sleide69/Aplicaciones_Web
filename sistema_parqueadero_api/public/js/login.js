document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const usersData = JSON.parse(localStorage.getItem("usersData")) || [];
        const user = usersData.find(user => user.email === email && user.password === password);

        if (user) {
            alert("Inicio de sesión exitoso.");
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userEmail", email); // Guardar el correo electrónico del usuario logueado
            window.location.href = "dashboard.html";
        } else {
            alert("Correo electrónico o contraseña incorrectos.");
        }
    });
});


// document.addEventListener("DOMContentLoaded", function () {
//     const loginForm = document.getElementById("loginForm");

//     // Manejar el envío del formulario de inicio de sesión
//     loginForm.addEventListener("submit", function (event) {
//         event.preventDefault();

//         const email = document.getElementById("email").value;
//         const password = document.getElementById("password").value;

//         // Obtener los datos de los usuarios guardados en localStorage
//         const usersData = JSON.parse(localStorage.getItem("usersData")) || [];

//         // Verificar si algún usuario coincide con el correo y la contraseña ingresados
//         const user = usersData.find(user => user.email === email && user.password === password);

//         if (user) {
//             alert("Inicio de sesión exitoso.");
//             // Guardar el estado de inicio de sesión en localStorage
//             localStorage.setItem("isLoggedIn", "true");
//             // Redirigir al dashboard
//             window.location.href = "dashboard.html";
//         } else {
//             alert("Correo electrónico o contraseña incorrectos.");
//         }
//     });
// });