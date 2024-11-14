document.addEventListener("DOMContentLoaded", function () {
    const vehicleForm = document.getElementById("vehicleForm");

    function getVehicles() {
        const vehicles = localStorage.getItem("vehiclesData");
        return vehicles ? JSON.parse(vehicles) : [];
    }

    function saveVehicles(vehicles) {
        localStorage.setItem("vehiclesData", JSON.stringify(vehicles));
    }

    vehicleForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const placa = document.getElementById("placa").value;
        const marca = document.getElementById("marca").value;
        const modelo = document.getElementById("modelo").value;
        const color = document.getElementById("color").value;

        const userEmail = localStorage.getItem("userEmail"); // Obtener el correo del usuario que inició sesión

        if (!userEmail) {
            alert("No se ha detectado un usuario logueado. Inicie sesión nuevamente.");
            return;
        }

        const vehicles = getVehicles();
        const newVehicle = {
            id: vehicles.length + 1,
            email: userEmail,
            placa: placa,
            marca: marca,
            modelo: modelo,
            color: color,
            registrationDate: new Date()
        };

        vehicles.push(newVehicle);
        saveVehicles(vehicles);

        alert("Vehículo registrado exitosamente.");
        vehicleForm.reset();
    });
});

// document.addEventListener("DOMContentLoaded", function () {
//     let db;

//     // Abrir la base de datos UserDataBase y crear un objectStore para los vehículos si no existe
//     const request = indexedDB.open("UserDataBase", 1);

//     request.onupgradeneeded = function (event) {
//         db = event.target.result;

//         // Si no existe el objectStore 'vehicles', lo creamos
//         if (!db.objectStoreNames.contains("vehiculos")) {
//             const vehicleStore = db.createObjectStore("vehiculos", {
//                 keyPath: "id",
//                 autoIncrement: true
//             });
//             vehicleStore.createIndex("email", "email", { unique: false });
//         }
//     };

//     request.onsuccess = function (event) {
//         db = event.target.result;
//     };

//     request.onerror = function (event) {
//         console.error("Error al abrir IndexedDB:", event.target.errorCode);
//     };

//     // Obtener el formulario de registro de vehículos
//     const vehicleForm = document.querySelector("form");

//     // Cuando se envía el formulario de registro
//     vehicleForm.addEventListener("submit", function (event) {
//         event.preventDefault();

//         // Obtener los datos del formulario
//         const placa = document.getElementById("placa").value;
//         const marca = document.getElementById("marca").value;
//         const modelo = document.getElementById("modelo").value;
//         const color = document.getElementById("color").value;

//         // Suponiendo que el correo del usuario se almacena en la sesión o localStorage al iniciar sesión
//         const userEmail = localStorage.getItem("userEmail"); // Obtener el correo del usuario que inició sesión

//         if (!userEmail) {
//             alert("No se ha detectado un usuario logueado. Inicie sesión nuevamente.");
//             return;
//         }

//         // Registrar el vehículo en la base de datos
//         const transaction = db.transaction(["vehiculos"], "readwrite");
//         const vehicleStore = transaction.objectStore("vehiculos");

//         const newVehicle = {
//             email: userEmail,  // Asociar el vehículo al usuario que inició sesión
//             placa: placa,
//             marca: marca,
//             modelo: modelo,
//             color: color,
//             registrationDate: new Date() // Fecha de registro del vehículo
//         };

//         const addRequest = vehicleStore.add(newVehicle);

//         addRequest.onsuccess = function () {
//             alert("Vehículo registrado exitosamente.");
//             vehicleForm.reset(); // Limpiar el formulario después de enviar los datos
//         };

//         addRequest.onerror = function (event) {
//             console.error("Error al registrar el vehículo:", event.target.errorCode);
//         };
//     });
// });
