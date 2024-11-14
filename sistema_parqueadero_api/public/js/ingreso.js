document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const dbName = "UserDatabase";
    let db;

    // Abrir o crear la base de datos IndexedDB
    const request = indexedDB.open(dbName, 1);

    // Crear el esquema de la base de datos si es la primera vez que se accede
    request.onupgradeneeded = function (event) {
        db = event.target.result;
        const objectStore = db.createObjectStore("users", { keyPath: "email" });
        objectStore.createIndex("email", "email", { unique: true });
        objectStore.createIndex("password", "password");
        objectStore.createIndex("rol", "rol"); // Añadir índice para el rol
        console.log("IndexedDB creada y lista.");
    };

    request.onsuccess = function (event) {
        db = event.target.result;
        console.log("Conexión a IndexedDB exitosa.");
    };

    request.onerror = function () {
        console.log("Error al conectar a IndexedDB.");
    };

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

        // Comprobar si el usuario está registrado y tiene el rol adecuado
        authenticateUser(email, password);
    });

    // Función para validar el formato del correo electrónico
    function isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    // Función para validar la contraseña (mínimo 8 caracteres, al menos una letra y un número)
    function isValidPassword(password) {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
    }

    // Función para autenticar el usuario
    function authenticateUser(email, password) {
        const transaction = db.transaction(["users"], "readonly");
        const objectStore = transaction.objectStore("users");

        const request = objectStore.get(email); // Buscar al usuario por su email

        request.onsuccess = function (event) {
            const user = event.target.result;
            if (user) {
                if (user.password === password) {
                    alert("Inicio de sesión exitoso como " + user.rol + ".");
                    // Guardar el correo y el rol del usuario en localStorage al iniciar sesión
                    localStorage.setItem("userEmail", user.email);
                    localStorage.setItem("userRole", user.rol);
                    // Redirigir a dashboard
                    window.location.href = "dashboard.html";
                } else {
                    alert("Contraseña incorrecta.");
                }
            } else {
                alert("El usuario no está registrado.");
            }
        };

        request.onerror = function () {
            alert("Error al buscar los datos del usuario.");
        };
    }

    // Función para guardar los datos del usuario en IndexedDB con su rol
    function saveUserData(email, password) {
        const transaction = db.transaction(["users"], "readwrite");
        const objectStore = transaction.objectStore("users");

        const hashedPassword = password; // Aquí puedes añadir una función de hash si es necesario

        const user = {
            email: email,
            password: hashedPassword,
            rol: "user" // Aquí puedes cambiarlo a "admin" si es necesario
        };

        const request = objectStore.add(user);

        request.onsuccess = function () {
            alert("Usuario registrado correctamente.");
        };

        request.onerror = function () {
            alert("Error al guardar los datos del usuario.");
        };
    }
});
