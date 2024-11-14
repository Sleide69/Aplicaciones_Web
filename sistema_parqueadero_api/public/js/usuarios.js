document.addEventListener("DOMContentLoaded", function() {
    let db;

    const request = indexedDB.open("UserDataBase", 1);

    request.onsuccess = function(event) {
        db = event.target.result;
        loadUsers();
    };

    request.onerror = function(event) {
        console.log("Error al abrir la base de datos:", event.target.errorCode);
    };

    // Cargar la lista de usuarios
    function loadUsers() {
        const transaction = db.transaction(["users"], "readonly");
        const store = transaction.objectStore("users");
        const request = store.getAll();

        request.onsuccess = function(event) {
            const users = event.target.result;
            const tbody = document.querySelector("#userTable tbody");
            tbody.innerHTML = '';

            users.forEach(user => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                    <td>
                        <button class="delete-btn" data-id="${user.id}">Eliminar</button>
                    </td>
                `;

                tbody.appendChild(row);
            });

            // Agregar evento de eliminación
            const deleteButtons = document.querySelectorAll(".delete-btn");
            deleteButtons.forEach(button => {
                button.addEventListener("click", function() {
                    const userId = parseInt(this.getAttribute("data-id"));
                    deleteUser(userId);
                });
            });
        };
    }

    // Eliminar un usuario
    function deleteUser(id) {
        const transaction = db.transaction(["users"], "readwrite");
        const store = transaction.objectStore("users");
        const request = store.delete(id);

        request.onsuccess = function() {
            alert("Usuario eliminado correctamente.");
            loadUsers();
        };

        request.onerror = function(event) {
            console.log("Error al eliminar el usuario:", event.target.errorCode);
        };
    }
});
