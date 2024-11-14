function calculatePayment(daysFromToday) {
    const baseRate = 5; // Tarifa base en dólares
    return baseRate + daysFromToday; // Aumenta $1 por cada día adicional
}

function createPayment(paymentData, format = 'json') {
    if (format === 'json') {
        loadJSON('data_examples/pagos.json', data => {
            data.pagos.push(paymentData);
            saveJSON('pagos', data);
        });
    } else if (format === 'xml') {
        loadXML('data_examples/pagos.xml', xml => {
            const newPago = xml.createElement("pago");

            Object.keys(paymentData).forEach(key => {
                const elem = xml.createElement(key);
                elem.textContent = paymentData[key];
                newPago.appendChild(elem);
            });

            xml.documentElement.appendChild(newPago);
            saveXML('pagos', xml);
        });
    }
}
