// Get the profile name from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const profileName = urlParams.get('name');

// Update the header with the profile name
const header = document.getElementById('profileNameHeader');
header.textContent = profileName;

function addRow() {

    var date = document.getElementById("date").value;
    var procedure = document.getElementById("procedure").value;
    var note = document.getElementById("note").value;

    var table = document.getElementById("medicalHistoryTable").getElementsByTagName("tbody")[0];
    var row = table.insertRow();

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = date;
    cell2.innerHTML = procedure;
    cell3.innerHTML = note;
    cell4.innerHTML = '<button onclick="deleteRow(this)">Delete</button>';

    document.getElementById("date").value = ""; 
    document.getElementById("procedure").value = "";
    document.getElementById("note").value = "";

}

function deleteRow(btn) {
    var row = btn.parentNode.parentNode.rowIndex;

    document.getElementById("medicalHistoryTable").deleteRow(row);
}

function addDataToTable() {
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;
    const age = document.getElementById("age").value;
    const dob = document.getElementById("dob").value;
    const gender = document.getElementById("gender").value;
    const treatment = document.getElementById("treatment").value;
    const medication = document.getElementById("medication").value;
    const allergies = document.getElementById("allergies").value;
    const heartconditions = document.getElementById("heartconditions").value;

    const table = document.getElementById("dataTable");
    const row = table.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    const cell6 = row.insertCell(5);
    const cell7 = row.insertCell(6);
    const cell8 = row.insertCell(7);
    const cell9 = row.insertCell(8);

    cell1.innerHTML = weight;
    cell2.innerHTML = height;
    cell3.innerHTML = age;
    cell4.innerHTML = dob;
    cell5.innerHTML = gender;
    cell6.innerHTML = treatment;
    cell7.innerHTML = medication;
    cell8.innerHTML = allergies;
    cell9.innerHTML = heartconditions;
}
