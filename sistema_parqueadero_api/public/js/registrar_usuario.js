document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    // Recuperar usuarios desde localStorage o inicializar como un array vacío si no existe
    function getUsers() {
        const users = localStorage.getItem("usersData");
        return users ? JSON.parse(users) : [];
    }

    // Guardar usuarios en localStorage
    function saveUsers(users) {
        localStorage.setItem("usersData", JSON.stringify(users));
    }

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita el envío del formulario hasta que se verifiquen los datos

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        
        // Validar correo electrónico
        if (!isValidEmail(email)) {
            alert("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        // Validar contraseña (mínimo 8 caracteres, al menos una letra y un número)
        if (!isValidPassword(password)) {
            alert("La contraseña debe tener al menos 8 caracteres, una letra y un número.");
            return;
        }

        // Guardar los datos en JSON local (localStorage)
        saveUserData(email, password);
    });

    // Función para validar el formato del correo electrónico
    function isValidEmail(email) {
        const emailRegex = /^[0-9]+@live\.uleam\.edu\.ec$/;
        return emailRegex.test(email);
    }


    // Función para validar la contraseña (mínimo 8 caracteres, al menos una letra y un número)
    function isValidPassword(password) {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
    }

    // Función para guardar los datos del usuario en localStorage
    function saveUserData(email, password) {
        const users = getUsers();

        // Verifica si el usuario ya existe
        if (users.some(user => user.email === email)) {
            alert("El usuario ya está registrado.");
            return;
        }

        const hashedPassword = password; // Aquí se puede añadir una función de hash si es necesario

        const user = {
            email: email,
            password: hashedPassword,
            rol: "user" //es el rol que se le designa automaticamente al registrarse y no puede ser modificado por los usuarios
        };

        users.push(user); // Agrega el nuevo usuario a la lista
        saveUsers(users); // Guarda la lista actualizada en localStorage
        alert("Usuario registrado correctamente.");
        
        // Redirigir a otra página si es necesario
        window.location.href = "login.html";
    }

    // Guardar el correo del usuario en localStorage al iniciar sesión
    localStorage.setItem("userEmail", email);
});
