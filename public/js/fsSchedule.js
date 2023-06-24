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
// const header = document.getElementById("profileNameHeader");
// header.textContent = profileName;

async function getScheduleData() {
  let fsScheduleEntries = await fetch(
    `./fsSchedule?child_id=${childId}`
  );
  fsScheduleEntries = await fsScheduleEntries.json();
  return fsScheduleEntries;
}


async function addRow() {
  const fsScheduleData = await getScheduleData();

  const table = document.getElementById("myTable");

  fsScheduleData.forEach((data) => {
    const row = table.insertRow(-1);
    row.setAttribute("id", data.id);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    const cell6 = row.insertCell(5);

    cell1.innerHTML = data.time;
    cell2.innerHTML = data.activity;
    cell3.innerHTML = data.info;
    cell4.innerHTML = data.date;
    cell5.innerHTML = data.currentDate;
    cell6.innerHTML = '<button onclick="deleteRow(this)">Delete</button>';
  })
}

function deleteRow(btn) {
  // Get the row to be deleted
  var row = btn.parentNode.parentNode;

  // Remove the row from the table
  row.parentNode.removeChild(row);
}

const time = document.getElementById("time");
const date = document.getElementById("date");
const activity = document.getElementById("activity");
const info = document.getElementById("info");

formInputs = [time, date, activity, info];

const isRequired = (value) => (value === "" ? false : true);

time.input.addEventListener("input", () => {
  if (isRequired(time.input.value.trim())) {
    time.input.style.outlineColor = "hsl(145, 63%, 40%)";
  } else {
    time.input.style.outlineColor = "hsl(0, 100%, 34%)";
  }
});

date.input.addEventListener("input", () => {
  if (isRequired(date.input.value.trim())) {
    date.input.style.outlineColor = "hsl(145, 63%, 40%)";
  } else {
    date.input.style.outlineColor = "hsl(0, 100%, 34%)";
  }
});

activity.input.addEventListener("change", (event) => {
  const selectedActivity = event.target.value;
  if (isRequired(selectedActivity)) {
    activity.input.style.outlineColor = "hsl(145, 63%, 40%)";
  } else {
    activity.input.style.outlineColor = "hsl(0, 100%, 34%)";
  }
});

info.input.addEventListener("input", () => {
  if (isRequired(info.input.value.trim())) {
    info.input.style.outlineColor = "hsl(145, 63%, 40%)";
  } else {
    info.input.style.outlineColor = "hsl(0, 100%, 34%)";
  }
});

function addScheduleInDB() {
  const scheduleData = {
    time: time.value,
    date: date.value,
    activity: activity.value,
    information: info.value,
    child_id: childId,
  }

  fetch("./fsSchedule", {
    method: "POST",
    mode: "cors",
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify(scheduleData),
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

    // addRow();
}
