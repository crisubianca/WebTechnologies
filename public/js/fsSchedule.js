// Get the profile name from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const childId = urlParams.get("child_id");
console.log("childId- fs", childId);

const fsScheduleButton = document.getElementById("fsSchedule");
const medicalHistoryButton = document.getElementById("medicalHistory");
const timelineButton = document.getElementById("timeline");

fsScheduleButton.addEventListener("click", () => {
  window.location.href = `./fsSchedule?child_id=${childId}`;
});

medicalHistoryButton.addEventListener("click", () => {
    window.location.href = `./medicalHistory?child_id=${childId}`;
  });

timelineButton.addEventListener("click", () => {
    window.location.href = `./timeline?child_id=${childId}`;
});
// Update the header with the profile name
const header = document.getElementById("profileNameHeader");
header.textContent = profileName;

function addRow() {
  // Get values from form inputs
  var time = document.getElementById("time").value;
  var activity = document.getElementById("activity").value;
  var info = document.getElementById("info").value;

  // Get current date in dd:mm:yyyy format
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  var currentDate = dd + ":" + mm + ":" + yyyy;

  // Insert new row into table
  var table = document
    .getElementById("myTable")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow();

  // Insert cells with form input values and current date
  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);
  var cell4 = newRow.insertCell(3);
  var cell5 = newRow.insertCell(4);
  cell1.innerHTML = time;
  cell2.innerHTML = activity;
  cell3.innerHTML = info;
  cell4.innerHTML = currentDate;
  cell5.innerHTML = '<button onclick="deleteRow(this)">Delete</button>';

  // Reset form inputs
  document.getElementById("time").value = "";
  document.getElementById("activity").value = "";
  document.getElementById("info").value = "";
}

function deleteRow(btn) {
  // Get the row to be deleted
  var row = btn.parentNode.parentNode;

  // Remove the row from the table
  row.parentNode.removeChild(row);
}

// function deleteRow(button) {
//     // Get the row to be deleted
//     const row = button.parentNode.parentNode;

//     // Remove the row from the table
//     const tableBody = document.querySelector("#myTable tbody");
//     tableBody.removeChild(row);

//     // Remove the data from the array
//     const rowIndex = row.rowIndex - 1;
//     tableData.splice(rowIndex, 1);

//     // Remove the data from the history table
//     const historyTable = document.querySelector("#historyTable tbody");
//     const historyRow = historyTable.childNodes[rowIndex];
//     historyTable.removeChild(historyRow);

// }

// function showHistory() {
//     window.location.href = "history.html";
// }
