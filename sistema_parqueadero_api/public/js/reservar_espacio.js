document.addEventListener("DOMContentLoaded", function () {
    const reservationForm = document.getElementById("reservationForm");
    const vehicleSelect = document.getElementById("vehicleSelect");

    // Función para obtener los vehículos registrados del usuario
    function getUserVehicles() {
        const vehiclesData = JSON.parse(localStorage.getItem("vehiclesData")) || [];
        const userEmail = localStorage.getItem("userEmail");
        return vehiclesData.filter(vehicle => vehicle.email === userEmail);
    }

    // Función para cargar los vehículos en el <select>
    function loadUserVehicles() {
        const userVehicles = getUserVehicles();

        if (userVehicles.length === 0) {
            vehicleSelect.innerHTML = "<option value=''>No tienes vehículos registrados</option>";
            return;
        }

        userVehicles.forEach(vehicle => {
            const option = document.createElement("option");
            option.value = vehicle.placa; // Puedes usar la placa como identificador
            option.textContent = `${vehicle.marca} ${vehicle.modelo} (${vehicle.placa})`;
            vehicleSelect.appendChild(option);
        });
    }

    // Cargar vehículos del usuario al cargar la página
    loadUserVehicles();

    // Función para guardar reservas en localStorage
    function getReservations() {
        const reservations = localStorage.getItem("parkingReservations");
        return reservations ? JSON.parse(reservations) : [];
    }

    function saveReservations(reservations) {
        localStorage.setItem("parkingReservations", JSON.stringify(reservations));
    }

    // Manejar el envío del formulario de reserva
    reservationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtener los valores del formulario
        const selectedVehiclePlate = vehicleSelect.value;
        const parkingSpot = document.getElementById("parkingSpot").value;
        const reservationDate = document.getElementById("reservationDate").value;
        const userEmail = localStorage.getItem("userEmail");

        if (!userEmail) {
            alert("No se ha detectado un usuario logueado. Inicie sesión nuevamente.");
            return;
        }

        if (!selectedVehiclePlate) {
            alert("Seleccione un vehículo.");
            return;
        }

        // Obtener el vehículo seleccionado del usuario
        const userVehicles = getUserVehicles();
        const selectedVehicle = userVehicles.find(vehicle => vehicle.placa === selectedVehiclePlate);

        // Crear el objeto de reserva
        const newReservation = {
            id: Date.now(),
            email: userEmail,
            parkingSpot: parkingSpot,
            reservationDate: reservationDate,
            vehiculo: selectedVehicle
        };

        // Guardar la reserva
        const reservations = getReservations();
        reservations.push(newReservation);
        saveReservations(reservations);

        alert("Reserva guardada exitosamente.");
        reservationForm.reset(); // Limpiar el formulario
    });
});
