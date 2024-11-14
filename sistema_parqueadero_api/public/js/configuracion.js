document.addEventListener("DOMContentLoaded", function () {
    const configForm = document.getElementById("configForm");

    // Obtener configuración actual desde localStorage
    function getConfig() {
        const config = localStorage.getItem("userConfig");
        return config ? JSON.parse(config) : { notifications: "enabled" };
    }

    // Guardar configuración en localStorage
    function saveConfig(config) {
        localStorage.setItem("userConfig", JSON.stringify(config));
    }

    // Renderizar configuración inicial
    function renderConfig() {
        const config = getConfig();
        document.getElementById("notifications").value = config.notifications || "enabled";
    }

    // Manejar el envío del formulario de configuración
    configForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const currentPassword = document.getElementById("currentPassword").value;
        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const notifications = document.getElementById("notifications").value;

        // Verificar si la contraseña actual coincide
        const storedPassword = localStorage.getItem("userPassword");
        if (currentPassword !== storedPassword) {
            alert("La contraseña actual es incorrecta.");
            return;
        }

        // Validar la nueva contraseña
        if (newPassword.length < 8 || !/\d/.test(newPassword) || !/[A-Za-z]/.test(newPassword)) {
            alert("La nueva contraseña debe tener al menos 8 caracteres, una letra y un número.");
            return;
        }

        // Confirmar la nueva contraseña
        if (newPassword !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        // Guardar la nueva configuración
        const config = getConfig();
        config.notifications = notifications;

        // Guardar la nueva contraseña y configuración en localStorage
        localStorage.setItem("userPassword", newPassword);
        saveConfig(config);

        alert("Configuración actualizada correctamente.");
        configForm.reset();
    });

    // Renderizar la configuración al cargar la página
    renderConfig();
});
  
