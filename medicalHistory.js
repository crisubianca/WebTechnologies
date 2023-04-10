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
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const age = document.getElementById("age").value;
    const dob = document.getElementById("dob").value;
    const gender = document.getElementById("gender").value;
    const doctorname = document.getElementById("doctorname").value;
    const doctorsurname = document.getElementById("doctorsurname").value;
    const doctorphone = document.getElementById("doctorphone").value;
    const doctorhospital = document.getElementById("doctorhospital").value;
    const treatment = document.getElementById("treatment").value;
    const medication = document.getElementById("medication").value;
    const illness = document.getElementById("illness").value;
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
    const cell10 = row.insertCell(9);
    const cell11 = row.insertCell(10);
    const cell12 = row.insertCell(11);
    const cell13 = row.insertCell(12);
    const cell14 = row.insertCell(13);

    cell1.innerHTML = name;
    cell2.innerHTML = surname;
    cell3.innerHTML = age;
    cell4.innerHTML = dob;
    cell5.innerHTML = gender;
    cell6.innerHTML = doctorname;
    cell7.innerHTML = doctorsurname
    cell8.innerHTML = doctorphone;
    cell9.innerHTML = doctorhospital;
    cell10.innerHTML = treatment;
    cell11.innerHTML = medication;
    cell12.innerHTML = illness;
    cell13.innerHTML = allergies;
    cell14.innerHTML = heartconditions;
}
