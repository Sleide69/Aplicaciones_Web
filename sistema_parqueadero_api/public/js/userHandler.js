function validateUser(email, cedula) {
    const isAdmin = cedula.startsWith("a") && email.endsWith("@uleam.edu.ec");
    return isAdmin ? "administrador" : "usuario";
}

function registerUser(userData, format = 'json') {
    if (format === 'json') {
        loadJSON('data_examples/usuarios.json', data => {
            data.usuarios.push(userData);
            saveJSON('usuarios', data);
        });
    } else if (format === 'xml') {
        loadXML('data_examples/usuarios.xml', xml => {
            const newUser = xml.createElement("usuario");

            Object.keys(userData).forEach(key => {
                const elem = xml.createElement(key);
                elem.textContent = userData[key];
                newUser.appendChild(elem);
            });

            xml.documentElement.appendChild(newUser);
            saveXML('usuarios', xml);
        });
    }
}
