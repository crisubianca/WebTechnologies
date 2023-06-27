const fsScheduleButton = document.getElementById("fsSchedule");
const medicalHistoryButton = document.getElementById("medicalHistory");
const timelineButton = document.getElementById("timelineHeader");

fsScheduleButton.addEventListener("click", () => {
  window.location.href = `./fsSchedule?child_id=${childId}`;
});

medicalHistoryButton.addEventListener("click", () => {
  window.location.href = `./medicalHistory?child_id=${childId}`;
});

timelineButton.addEventListener("click", () => {
  window.location.href = `./timeline?child_id=${childId}`;
});

// Get the modal
var modal = document.getElementById("timelineModal");
// Get the button that opens the modal
var btn = document.getElementById("addTimelineButton");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const urlParams = new URLSearchParams(window.location.search);
const childId = urlParams.get("child_id");

const date = document.getElementById("date");
const timelineTitle = document.getElementById("timeline-title");
const timelineInfo = document.getElementById("timeline-info");

formInputs = [date, timelineInfo, timelineTitle];

const isRequired = (value) => (value === "" ? false : true);

date.addEventListener("input", (event) => {
  const selectedDate = event.target.value;
  if (isRequired(selectedDate)) {
    date.style.outlineColor = "hsl(145, 63%, 40%)";
  } else {
    date.style.outlineColor = "hsl(0, 100%, 34%)";
  }
});

timelineTitle.addEventListener("input", () => {
  if (isRequired(timelineTitle.value.trim())) {
    timelineTitle.style.outlineColor = "hsl(145, 63%, 40%)";
  } else {
    timelineTitle.input.style.outlineColor = "hsl(0, 100%, 34%)";
  }
});

timelineInfo.addEventListener("input", () => {
  if (isRequired(timelineInfo.value.trim())) {
    timelineInfo.style.outlineColor = "hsl(145, 63%, 40%)";
  } else {
    timelineInfo.style.outlineColor = "hsl(0, 100%, 34%)";
  }
});

function addTimelineEntryInDB() {
  const entryData = {
    child_id: childId,
    date: date.value,
    timelineTitle: timelineTitle.value,
    timelineInfo: timelineInfo.value,
  };

  console.log("entryData", entryData);

  fetch("./timeline", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entryData),
  })
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        console.log("succes");
        window.location.href = "./homePage";
      } else if (res.status == 401) {
        console.log("bad request");
      }
    })
    .catch((err) => {
      console.log("error");
    });
  modal.style.display = "none";

  document.getElementById("timelineModal").reset;
  location.reload();
  // addDataToTimeline()();
}

function convertDateForShowing(date){
    const data = date.substring(0, 10);
    let monthName = "";
    const month = data.split("-")[1];
    const day = data.split("-")[2];

    switch (month){
        case "01":
            monthName = "JAN";
            break;
        case "02":
            monthName = "FEB";
            break;
        case "03":
            monthName = "MAR";
            break;
        case "04":
            monthName = "APR";
            break;
        case "05":
            monthName = "MAY";
            break;
        case "06":
            monthName = "JUNE";
            break;
        case "07":
            monthName = "JULY";
            break;
        case "08":
            monthName = "AUG";
            break;
        case "09":
            monthName = "SEP";
            break;
        case "10":
            monthName = "OCT";
            break;
        case "11":
            monthName = "NOV";
            break;
        case "12":
            monthName = "DEC";
            break;
    }
    const returnDate = day + ' ' + monthName;
    return returnDate;
}

async function getTimelineData() {
  let timelineEntries = await fetch(`./showTimeline?child_id=${childId}`);
  timelineEntries = await timelineEntries.json();
  console.log("timelineEntries", timelineEntries);
  return timelineEntries;
}

async function addDataToTimeline() {
  const timelineData = await getTimelineData();

  const timeline = document.getElementById("timeline");
  let index = 0;

  timeline.innerHTML = "";

  timelineData.forEach((data) => {
    const showDate = convertDateForShowing(data.date);
    const container = document.createElement("div");
    container.classList.add("container");

    if (index % 2 == 0) {
      container.classList.add("container-left");
      index++;
    } else {
      container.classList.add("container-right");
      index++;
    }
    container.innerHTML = `
        <div class="date">${showDate}</div>
          <div class="content">
            <h2>${data.timeline_title}</h2>
            <p>${data.timeline_info}</p>
          </div>`;
    timeline.appendChild(container);
  });
}
