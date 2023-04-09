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