function submit(event) {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    fetch('https://careful-wasp-tunic.cyclic.app/addContact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, phoneNumber })
    })
        .then(response => response.json())
        .then(contact => {
            addContactToTable(contact);
            document.getElementById('contactForm').reset(); // Reset the form fields
        });
};

function loadContacts() {
    fetch('https://careful-wasp-tunic.cyclic.app/getContact')
        .then(response => response.json())
        .then(contacts => {
            const tableBody = document.getElementById('contactTable');
            tableBody.innerHTML = ''; // Clear existing entries
            console.log(contacts)
            contacts.forEach(addContactToTable);
        });
}

function addContactToTable(contact) {
    const tableBody = document.getElementById('contactTable');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${contact.firstName}</td>
      <td>${contact.lastName}</td>
      <td>${contact.phoneNumber}</td>
      <td><button onclick="deleteContact('${contact._id}', this)">Delete</button>
      <button onclick="updateContact('${contact._id}', this)">Update</button></td>
    `;
    tableBody.appendChild(row);
}

function deleteContact(contactId, button) {
    fetch(`https://careful-wasp-tunic.cyclic.app/deleteContact/${contactId}`, {
        method: 'DELETE'
    })
        .then(() => {
            button.closest('tr').remove(); // Remove the table row on successful deletion
        });
}

function updateContact(contactId, button) {

    let row = button.parentNode.parentNode;
    let updFirstName = row.children[0].textContent;
    let updLastName = row.children[1].textContent;
    let updPhoneNumber = row.children[2].textContent;
    document.getElementById('firstName').value = updFirstName;
    document.getElementById('lastName').value = updLastName;
    document.getElementById('phoneNumber').value = updPhoneNumber;
    document.getElementById("addBtn").style.display = 'none';
    document.getElementById("updateBtn").style.display = 'inline';
    document.getElementById("updateBtn").setAttribute("onclick", `updateContact2('${contactId}')`)
}

function updateContact2(contactId) {
    let firstName2 = document.getElementById('firstName').value;
    let lastName2 = document.getElementById('lastName').value;
    let phoneNumber2 = document.getElementById('phoneNumber').value;

    fetch(`https://careful-wasp-tunic.cyclic.app/updateContact/${contactId}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: firstName2, lastName: lastName2, phoneNumber: phoneNumber2 })
    })
    .then(response => {
        return response.json();
    })
    .then(contact => {
        console.log(contact);
        loadContacts(); // Reload contacts after updating
    })
    document.getElementById('firstName').value = "";
    document.getElementById('lastName').value = "";
    document.getElementById('phoneNumber').value = "";
}



loadContacts(); // Initial load of contacts
