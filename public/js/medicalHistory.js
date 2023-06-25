// Get the profile name from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const childId = urlParams.get("child_id");

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

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

if (dd < 10) {
  dd = "0" + dd;
}

if (mm < 10) {
  mm = "0" + mm;
}

today = yyyy + "-" + mm + "-" + dd;
document.getElementById("date").setAttribute("max", today);

const date = document.getElementById("date");
const age = document.getElementById("age");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const procedure = document.getElementById("procedure");
const note = document.getElementById("note");

formInputs = [date, weight, height, procedure, note];

const isRequired = (value) => (value === "" ? false : true);

date.input.addEventListener("input", (event) => {
  const selectedDate = event.target.value;
  if (isRequired(selectedDate)) {
    date.input.style.outlineColor = "hsl(145, 63%, 40%)";
  } else {
    date.input.style.outlineColor = "hsl(0, 100%, 34%)";
  }
});

age.input.addEventListener("input", () => {
  if (isRequired(age.input.value.trim())) {
    age.input.style.outlineColor = "hsl(145, 63%, 40%)";
  } else {
    age.input.style.outlineColor = "hsl(0, 100%, 34%)";
  }
});

weight.input.addEventListener("input", () => {
  if (isRequired(weight.input.value.trim())) {
    weight.input.style.outlineColor = "hsl(145, 63%, 40%)";
  } else {
    weight.input.style.outlineColor = "hsl(0, 100%, 34%)";
  }
});

height.input.addEventListener("input", () => {
  if (isRequired(height.input.value.trim())) {
    height.input.style.outlineColor = "hsl(145, 63%, 40%)";
  } else {
    height.input.style.outlineColor = "hsl(0, 100%, 34%)";
  }
});

procedure.input.addEventListener("input", () => {
  if (isRequired(procedure.input.value.trim())) {
    procedure.input.style.outlineColor = "hsl(145, 63%, 40%)";
  } else {
    procedure.input.style.outlineColor = "hsl(0, 100%, 34%)";
  }
});

note.input.addEventListener("input", () => {
  if (isRequired(note.input.value.trim())) {
    note.input.style.outlineColor = "hsl(145, 63%, 40%)";
  } else {
    note.input.style.outlineColor = "hsl(0, 100%, 34%)";
  }
});

function addChildrenMedicalHistoryInDB() {
  const medicalHistoryData = {
    child_id: childId,
    age: age.value,
    date: date.value,
    weight: weight.value,
    height: height.value,
    procedure: procedure.value,
    note: note.value,
  };

  fetch("./medicalHistory", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(medicalHistoryData),
  })
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        console.log("succes");
      } else if (res.status == 401) {
        console.log("bad request");
      }
    })
    .catch((err) => {
      console.log("error");
    });

  document.getElementById("details").reset();
  location.reload();
}
// Update the header with the profile name
const header = document.getElementById("profileNameHeader");
header.textContent = profileName;

async function getMedicalHistoryData() {
  let medicalHistoryEntries = await fetch(
    `./showMedicalHistory?child_id=${childId}`
  );
  medicalHistoryEntries = await medicalHistoryEntries.json();
  console.log("medicalHistory", medicalHistoryEntries);
  return medicalHistoryEntries;
}

function deleteRow(btn) {
  var row = btn.parentNode.parentNode.rowIndex;
  var entryToDelete = document.getElementsByTagName("tr")[row].id;
  console.log(entryToDelete);
  document.getElementById("medicalHistoryTable").deleteRow(row);
}

async function addDataToTable() {
  const medicalHistoryData = await getMedicalHistoryData();

  const table = document.getElementById("medicalHistoryTable");

  medicalHistoryData.forEach((data) => {
    const row = table.insertRow(-1);
    row.setAttribute("id", data.id);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    const cell6 = row.insertCell(5);
    const cell7 = row.insertCell(6);

    cell1.innerHTML = data.date.substring(0, 10);
    cell2.innerHTML = data.age;
    cell3.innerHTML = data.weight;
    cell4.innerHTML = data.height;
    cell5.innerHTML = data.medical_procedure;
    cell6.innerHTML = data.additional_information;
    cell7.innerHTML = '<button onclick="deleteRow(this)">Delete</button>';
  });
}

function tableToCSV() {
  var csv_data = [];

  var rows = document.getElementsByTagName("tr");
  for (var i = 0; i < rows.length; i++) {
    var cols = rows[i].querySelectorAll("td,th");

    var csvrow = [];
    for (var j = 0; j < cols.length-1; j++) {
      csvrow.push(cols[j].innerHTML);
    }

    csv_data.push(csvrow.join(","));
  }

  csv_data = csv_data.join("\n");

  downloadCSVFile(csv_data);
}

function downloadCSVFile(csv_data) {
  CSVFile = new Blob([csv_data], {
    type: "text/csv",
  });

  var temp_link = document.createElement("a");

  // Download csv file
  temp_link.download = "ExportedMedicalHistory.csv";
  var url = window.URL.createObjectURL(CSVFile);
  temp_link.href = url;

  temp_link.style.display = "none";
  document.body.appendChild(temp_link);

  temp_link.click();
  document.body.removeChild(temp_link);
}
