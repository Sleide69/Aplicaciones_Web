document.addEventListener("DOMContentLoaded", function () {
    const reservationList = document.getElementById("reservationList");
    const reportList = document.getElementById("reportList");
    const totalAmountDisplay = document.getElementById("totalAmount");
    const paymentForm = document.getElementById("paymentForm");

    let totalAmount = 0;
    const pendingReservations = JSON.parse(localStorage.getItem("parkingReservations")) || [];
    const pendingReports = JSON.parse(localStorage.getItem("parkingReports")) || [];

    // Función para calcular la diferencia de días entre dos fechas
    function calculateDateDifference(reservationDate) {
        const today = new Date();
        const reservationDay = new Date(reservationDate);
        const differenceInTime = reservationDay.getTime() - today.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        return Math.max(differenceInDays, 0); // Si es 0 o negativo, lo dejamos en 0
    }

    // Cargar las reservaciones pendientes desde el localStorage con incremento en el costo
    pendingReservations.forEach((reservation) => {
        const daysAhead = calculateDateDifference(reservation.date);
        const additionalCost = daysAhead; // $1 por cada día
        const totalCost = reservation.baseAmount + additionalCost;

        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = totalCost;
        checkbox.dataset.id = reservation.id;
        checkbox.addEventListener("change", updateTotal);

        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(`${reservation.description} - Fecha: ${reservation.date} - $${totalCost.toFixed(2)}`));
        reservationList.appendChild(li);
    });

    // Cargar los reportes pendientes desde el localStorage sin incremento de días
    pendingReports.forEach((report) => {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = report.amount;
        checkbox.dataset.id = report.id;
        checkbox.addEventListener("change", updateTotal);

        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(`${report.description} - `));
        reportList.appendChild(li);
    });

    // Actualizar el total a pagar
    function updateTotal(event) {
        const amount = parseFloat(event.target.value);
        if (event.target.checked) {
            totalAmount += amount;
        } else {
            totalAmount -= amount;
        }
        totalAmountDisplay.textContent = totalAmount.toFixed(2);
    }

    // Manejar el envío del formulario de pago
    paymentForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        if (totalAmount === 0) {
            alert("Seleccione al menos una reservación o reporte para pagar.");
            return;
        }

        // Obtener los IDs seleccionados
        const selectedReservations = Array.from(reservationList.querySelectorAll("input:checked")).map(input => input.dataset.id);
        const selectedReports = Array.from(reportList.querySelectorAll("input:checked")).map(input => input.dataset.id);

        console.log("Reservaciones a pagar:", selectedReservations);
        console.log("Reportes a pagar:", selectedReports);
        console.log("Total a pagar: $" + totalAmount.toFixed(2));

        // Aquí podrías realizar la lógica de procesamiento de pago
        alert("Pago realizado exitosamente. Total: $" + totalAmount.toFixed(2));

        // Reiniciar el formulario y el total
        paymentForm.reset();
        totalAmount = 0;
        totalAmountDisplay.textContent = "0.00";
    });
});
