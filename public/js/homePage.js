
function deleteChildProfile(childId) {
  fetch(`./deleteChildProfile?child_id=${childId}`, {
    method: "DELETE",
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

  generateProfileCards();
}

async function getChildrenData() {
  let profiles = await fetch("./showProfiles");
  profiles = await profiles.json();
  console.log("profiles", profiles);
  return profiles;
}

// Function to generate profile cards
async function generateProfileCards() {
  const profileList = document.getElementById("profileList");

  let profiles = await getChildrenData();

  profileList.innerHTML = "";

  profiles.forEach((profile) => {
    const profileCard = document.createElement("div");
    profileCard.classList.add("profile-card");
    profileCard.innerHTML = `
      <img src="${profile.image}" alt="${profile.name}">
      <h3>${profile.first_name}</h3>
      <button class="delete-profile-button" data-profile-id="${profile.child_id}">Delete</button>
      <button class="edit-name-button" data-profile-id="${profile.child_id}">Edit Name</button>
    `;

    profileCard.addEventListener("click", () => {
      redirectToProfilePage(profile.child_id);
    });
    
    function redirectToProfilePage(child_id) {
      
      console.log("data-profile-id:", child_id);
      window.location.href = `./fsSchedule?child_id=${child_id}`;
    }

    const deleteButton = profileCard.querySelector(".delete-profile-button");
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const profileId = parseInt(deleteButton.dataset.profileId);
      console.log("deleteprofileid", profileId);
      deleteChildProfile(profileId);
    });

    profileList.appendChild(profileCard);
  });
}

// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("addProfileButton");
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

const firstname = document.getElementById("name");
const surname = document.getElementById("surname");
const birthdate = document.getElementById("birthdate");
const gender = document.getElementById("gender");

formInputs = [firstname, surname, birthdate, gender];

const isRequired = (value) => (value === "" ? false : true);

firstname.addEventListener("input", () => {
  if (isRequired(firstname.value.trim())) {
    firstname.style.outlineColor = "hsl(145, 63%, 40%)";
  } else {
    firstname.style.outlineColor = "hsl(0, 100%, 34%)";
  }
});

surname.addEventListener("input", () => {
  if (isRequired(surname.value.trim())) {
    surname.style.outlineColor = "hsl(145, 63%, 40%)";
  } else {
    surname.style.outlineColor = "hsl(0, 100%, 34%)";
  }
});

birthdate.addEventListener("input", (event) => {
  const selectedDate = event.target.value;
  if (isRequired(selectedDate)) {
    birthdate.style.outlineColor = "hsl(145, 63%, 40%)";
  } else {
    birthdate.style.outlineColor = "hsl(0, 100%, 34%)";
  }
});

gender.addEventListener("change", (event) => {
  const selectedGender = event.target.value;
  if (isRequired(selectedGender)) {
    gender.style.outlineColor = "hsl(145, 63%, 40%)";
  } else {
    gender.style.outlineColor = "hsl(0, 100%, 34%)";
  }
});

function addChildInDB() {
  const childData = {
    firstname: firstname.value,
    surname: surname.value,
    birthdate: birthdate.value,
    gender: gender.value,
  };

  fetch("./homePage", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(childData),
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

  document.getElementById("modal-form").reset();
  generateProfileCards();
}

