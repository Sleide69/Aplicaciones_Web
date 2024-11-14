document.getElementById("reservationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const format = document.getElementById("dataFormat").value;
    const parkingSpot = document.getElementById("parkingSpot").value;
    const reservationDate = document.getElementById("reservationDate").value;
    const userEmail = localStorage.getItem("userEmail");

    const reservationData = {
        usuario: userEmail, // Aquí se debería obtener el usuario logueado
        espacio: parkingSpot,
        fecha: reservationDate
    };

    // Llamada a la función createReservation
    createReservation(reservationData, format);
    alert("Reserva realizada con éxito en formato " + format.toUpperCase());
});