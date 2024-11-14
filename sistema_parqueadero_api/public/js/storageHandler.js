function loadJSON(file, callback) {
    fetch(file)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error("Error al cargar el archivo JSON:", error));
}

function loadXML(file, callback) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "application/xml");
            callback(xml);
        })
        .catch(error => console.error("Error al cargar el archivo XML:", error));
}

function saveJSON(filename, data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.json`;
    link.click();
}

function saveXML(filename, xmlData) {
    const serializer = new XMLSerializer();
    const xmlString = serializer.serializeToString(xmlData);
    const blob = new Blob([xmlString], { type: 'application/xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.xml`;
    link.click();
}

function parseXMLToJSON(xml) {
    const json = {};
    xml.childNodes.forEach(node => {
        if (node.nodeType === 1) { // Element Node
            const childJson = parseXMLToJSON(node);
            json[node.nodeName] = childJson;
        } else if (node.nodeType === 3) { // Text Node
            json.text = node.nodeValue.trim();
        }
    });
    return json;
}

function saveXML(filename, data) {
    // Crear un documento XML
    const xmlDoc = document.implementation.createDocument("", "", null);
    const root = xmlDoc.createElement("reservas");

    data.forEach((item) => {
        const reserva = xmlDoc.createElement("reserva");

        const usuario = xmlDoc.createElement("usuario");
        usuario.textContent = item.usuario;
        reserva.appendChild(usuario);

        const espacio = xmlDoc.createElement("espacio");
        espacio.textContent = item.espacio;
        reserva.appendChild(espacio);

        const fecha = xmlDoc.createElement("fecha");
        fecha.textContent = item.fecha;
        reserva.appendChild(fecha);

        root.appendChild(reserva);
    });

    xmlDoc.appendChild(root);

    // Convertir el XML en una cadena de texto
    const serializer = new XMLSerializer();
    const xmlString = serializer.serializeToString(xmlDoc);

    // Crear un Blob y descargarlo como archivo XML
    const blob = new Blob([xmlString], { type: "application/xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

function parseJSONToXML(json, rootElement) {
    const xmlDoc = document.implementation.createDocument("", rootElement, null);
    const root = xmlDoc.documentElement;

    function buildXML(json, parent) {
        Object.keys(json).forEach(key => {
            if (typeof json[key] === "object") {
                const child = xmlDoc.createElement(key);
                buildXML(json[key], child);
                parent.appendChild(child);
            } else {
                const element = xmlDoc.createElement(key);
                element.textContent = json[key];
                parent.appendChild(element);
            }
        });
    }

    buildXML(json, root);
    return xmlDoc;
}
