document.addEventListener("DOMContentLoaded", function () {
    const reservasContainer = document.getElementById("reservasContainer");

    // Función para obtener las reservas desde localStorage
    function getReservations() {
        const reservations = localStorage.getItem("parkingReservations");
        return reservations ? JSON.parse(reservations) : [];
    }

    // Función para mostrar las reservas en la página
    function displayReservations() {
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
            reservasContainer.innerHTML = "<p>No hay usuario logueado. Por favor, inicie sesión.</p>";
            return;
        }

        const reservations = getReservations();

        // Filtrar las reservas del usuario logueado
        const userReservations = reservations.filter(reserva => reserva.email === userEmail);

        if (userReservations.length === 0) {
            reservasContainer.innerHTML = "<p>No tienes reservas registradas.</p>";
            return;
        }

        // Crear los elementos HTML para cada reserva
        userReservations.forEach(reserva => {
            const reservaDiv = document.createElement("div");
            reservaDiv.classList.add("reserva");

            reservaDiv.innerHTML = `
                <p><strong>Placa:</strong> ${reserva.vehiculo.placa}</p>
                <p><strong>Marca:</strong> ${reserva.vehiculo.marca}</p>
                <p><strong>Modelo:</strong> ${reserva.vehiculo.modelo}</p>
                <p><strong>Color:</strong> ${reserva.vehiculo.color}</p>
                <p><strong>Fecha de Reserva:</strong> ${new Date(reserva.fechaReserva).toLocaleDateString()}</p>
                <p><strong>Espacio de Parqueo:</strong> ${reserva.parkingSpot}</p>
            `;

            reservasContainer.appendChild(reservaDiv);
        });
    }

    // Llamar a la función para mostrar las reservas
    displayReservations();
});
