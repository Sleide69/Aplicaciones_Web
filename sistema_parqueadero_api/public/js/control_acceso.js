document.addEventListener("DOMContentLoaded", function () {
    const accessForm = document.getElementById("accessForm");
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
        objectStore.createIndex("role", "role");
        console.log("IndexedDB creada y lista.");
    };

    request.onsuccess = function (event) {
        db = event.target.result;
        console.log("Conexión a IndexedDB exitosa.");
    };

    request.onerror = function () {
        console.log("Error al conectar a IndexedDB.");
    };

    // Función que escucha el envío del formulario
    accessForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita el envío automático

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const role = document.getElementById("role").value;

        // Validar correo electrónico
        if (!isValidEmail(email)) {
            alert("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        // Validar la contraseña (mínimo 8 caracteres, al menos una letra y un número)
        if (!isValidPassword(password)) {
            alert("La contraseña debe tener al menos 8 caracteres, una letra y un número.");
            return;
        }

        // Hashear la contraseña antes de guardarla
        const hashedPassword = hashPassword(password);

        // Guardar el usuario en IndexedDB
        saveUserAccess(email, hashedPassword, role);
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

    // Función para hashear la contraseña
    function hashPassword(password) {
        // Simulando el hash (deberías usar una librería de hash segura como bcrypt)
        return btoa(password); // Para efectos de este ejemplo, usando Base64
    }

    // Función para guardar los datos del usuario en IndexedDB
    function saveUserAccess(email, hashedPassword, role) {
        const transaction = db.transaction(["users"], "readwrite");
        const objectStore = transaction.objectStore("users");

        const user = {
            email: email,
            password: hashedPassword,
            role: role
        };

        const request = objectStore.add(user);

        request.onsuccess = function () {
            alert("Usuario guardado correctamente.");
        };

        request.onerror = function () {
            alert("Error al guardar el usuario. Es posible que el correo ya exista.");
        };
    }
});
