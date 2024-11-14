// Función para guardar en JSON enviando a la API
function saveJSON(reservationData) {
    fetch('http://localhost:3000/api/reservas/json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
    })
    .then(response => {
        if (!response.ok) throw new Error('Error al enviar datos en formato JSON');
        return response.json();
    })
    .then(data => {
        console.log('Reserva en JSON guardada exitosamente:', data);
        alert("Reserva guardada en el servidor (JSON)");
    })
    .catch(error => console.error('Error en saveJSON:', error));
}

// Función para guardar en XML enviando a la API
function saveXML(reservationData) {
    // Convertimos el objeto en XML
    const xmlData = `
    <reserva>
        <usuario>${reservationData.usuario}</usuario>
        <espacio>${reservationData.espacio}</espacio>
        <fecha>${reservationData.fecha}</fecha>
    </reserva>`;

    fetch('http://localhost:3000/api/reservas/xml', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/xml',
        },
        body: xmlData,
    })
    .then(response => {
        if (!response.ok) throw new Error('Error al enviar datos en formato XML');
        return response.text();
    })
    .then(data => {
        console.log('Reserva en XML guardada exitosamente:', data);
        alert("Reserva guardada en el servidor (XML)");
    })
    .catch(error => console.error('Error en saveXML:', error));
}

// Función principal para crear la reserva en el formato seleccionado
function createReservation(reservationData, format) {
    if (format === "json") {
        saveJSON(reservationData);
    } else if (format === "xml") {
        saveXML(reservationData);
    }
}

// document.getElementById("reservationForm").addEventListener("submit", function(event) {
//     event.preventDefault();

//     const format = document.getElementById("dataFormat").value;
//     const parkingSpot = document.getElementById("parkingSpot").value;
//     const reservationDate = document.getElementById("reservationDate").value;
//     const userEmail = localStorage.getItem("userEmail");

//     const reservationData = [
//         {
//             usuario: userEmail,  // Aquí deberia obtener el usuario logueado
//             espacio: parkingSpot,
//             fecha: reservationDate
//         }
//     ];

//     // Guardar en el formato seleccionado
//     if (format === "json") {
//         saveJSON("reservas.json", reservationData);
//     } else if (format === "xml") {
//         saveXML("reservas.xml", reservationData);
//     }

//     alert("Reserva realizada con éxito en formato " + format.toUpperCase());

//     // Función para crear la reserva en el formato deseado
//     function createReservation(data, format) {
//         if (format === "json") {
//             saveJSON("reserva", data);
//         } else if (format === "xml") {
//             saveXML("reserva", data);
//         }
//     }

//     // Función para guardar la reserva en formato JSON
//     function saveJSON(filename, data) {
//         const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
//         const link = document.createElement('a');
//         link.href = URL.createObjectURL(blob);
//         link.download = `${filename}.json`;
//         link.click();
//     }

//     // Función para guardar la reserva en formato XML
//     function saveXML(filename, data) {
//         const xmlContent = `
//             <reserva>
//                 <usuario>${data.usuario}</usuario>
//                 <espacio>${data.espacio}</espacio>
//                 <fecha>${data.fecha}</fecha>
//             </reserva>
//         `;
//         const blob = new Blob([xmlContent], { type: 'application/xml' });
//         const link = document.createElement('a');
//         link.href = URL.createObjectURL(blob);
//         link.download = `${filename}.xml`;
//         link.click();
//     }

// });
