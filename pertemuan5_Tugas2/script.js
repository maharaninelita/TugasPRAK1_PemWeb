let users = [];
let editIndex = null;

window.onload = function() {
    if (localStorage.getItem('users')) {
        users = JSON.parse(localStorage.getItem('users'));
        displayUsers();
    }
};


function addUser() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;

    if (name === "" || email === "" || phone === "") {
        alert("Please fill in all fields.");
        return;
    }

    if (editIndex !== null) {
        users[editIndex] = { name, email, phone };
        editIndex = null;
    } else {
        users.push({ name, email, phone });
    }

    localStorage.setItem('users', JSON.stringify(users));

   
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";

    displayUsers();
}

// read
function displayUsers() {
    let tableBody = document.querySelector("#userTable tbody");
    tableBody.innerHTML = "";

    users.forEach((user, index) => {
        let row = `<tr>
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="editUser(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">Delete</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// update
function editUser(index) {
    document.getElementById("name").value = users[index].name;
    document.getElementById("email").value = users[index].email;
    document.getElementById("phone").value = users[index].phone;
    editIndex = index;
}

// delete
function deleteUser(index) {
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    displayUsers();
}
