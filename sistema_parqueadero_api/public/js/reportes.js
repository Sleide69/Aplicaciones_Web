document.addEventListener("DOMContentLoaded", function () {
    const reportForm = document.getElementById("reportForm");
    const reportList = document.getElementById("reportList");

    // Obtener los reportes almacenados en localStorage
    function getReports() {
        const reports = localStorage.getItem("parkingReports");
        return reports ? JSON.parse(reports) : [];
    }

    // Guardar los reportes en localStorage
    function saveReports(reports) {
        localStorage.setItem("parkingReports", JSON.stringify(reports));
    }

    // Renderizar los reportes en la lista
    function renderReports() {
        const reports = getReports();
        reportList.innerHTML = "";

        reports.forEach(report => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <strong>Tipo:</strong> ${report.incidentType}<br>
                <strong>Espacio:</strong> ${report.parkingSpot}<br>
                <strong>Descripción:</strong> ${report.description}<br>
                <strong>Fecha:</strong> ${report.date}
            `;
            reportList.appendChild(listItem);
        });
    }

    // Manejar el envío del formulario de reporte
    reportForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const incidentType = document.getElementById("incidentType").value;
        const parkingSpot = document.getElementById("parkingSpot").value;
        const description = document.getElementById("reportDescription").value;

        // Crear un objeto de reporte
        const newReport = {
            id: Date.now(),  // Identificador único
            incidentType: incidentType,
            parkingSpot: parkingSpot,
            description: description,
            date: new Date().toLocaleString() // Fecha y hora actual
        };

        // Agregar el nuevo reporte a la lista de reportes y guardar
        const reports = getReports();
        reports.push(newReport);
        saveReports(reports);

        alert("Reporte registrado exitosamente.");
        reportForm.reset();
        renderReports();
    });

    // Renderizar los reportes al cargar la página
    renderReports();
});
