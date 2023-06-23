// Sample profile data
// let profiles = [{ id: 1, name: "{Kids Name}", image: "logo.png" }];

async function getChildrenData() {
  let profiles = await fetch("./showProfiles");
  profiles = await profiles.json();
  // console.log(jsonData);
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
      <button class="upload-image-button" data-profile-id="${profile.child_id}">Upload Image</button>
    `;

    // Add event listener for profile card click
    profileCard.addEventListener("click", () => {
      redirectToProfilePage(profile.id);
    });

    // Add event listener for delete profile button
    const deleteButton = profileCard.querySelector(".delete-profile-button");
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const profileId = parseInt(deleteButton.dataset.profileId);
      deleteProfile(profileId);
    });

    // Add event listener for upload image button
    const uploadButton = profileCard.querySelector(".upload-image-button");
    uploadButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const profileId = parseInt(uploadButton.dataset.profileId);
      handleImageUpload(profileId);
    });

    profileList.appendChild(profileCard);
  });
}

// Function to delete a profile
function deleteProfile(profileId) {
  profiles = profiles.filter((profile) => profile.id !== profileId);
  generateProfileCards();
}

// Function to handle image upload
function handleImageUpload(profileId) {
  const input = document.getElementById("imageUploadInput");
  input.click();

  input.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const imageSrc = e.target.result;
      updateProfileImage(profileId, imageSrc);
    };

    reader.readAsDataURL(file);
  });
}

// Function to update profile image
function updateProfileImage(profileId, imageSrc) {
  const profile = profiles.find((profile) => profile.id === profileId);
  if (profile) {
    profile.image = imageSrc;
    generateProfileCards();
  }
}

// Function to redirect to profile-specific HTML page
function redirectToProfilePage(profileId) {
  // Find the profile by ID
  const profile = profiles.find((profile) => profile.id === profileId);
  if (profile) {
    // Replace 'fsSchedule.html' with your actual profile-specific HTML page
    const profilePageUrl = `fsSchedule.html?name=${encodeURIComponent(
      profile.name
    )}`;
    window.location.href = profilePageUrl;
  }
}

// Function to handle add profile button click
// document.getElementById('addProfileButton').addEventListener('click', () => {
//   const profileName = prompt('Enter profile name:');
//   const profileId = profiles.length + 1;
//   const newProfile = { id: profileId, name: profileName, image: '' };
//   profiles.push(newProfile);
//   generateProfileCards();
// });

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

firstname.input.addEventListener("input", () => {
  if (isRequired(firstname.input.value.trim())) {
    firstname.input.style.outlineColor = "hsl(145, 63%, 40%)";
  } else {
    firstname.input.style.outlineColor = "hsl(0, 100%, 34%)";
  }
});

surname.input.addEventListener("input", () => {
  if (isRequired(surname.input.value.trim())) {
    surname.input.style.outlineColor = "hsl(145, 63%, 40%)";
  } else {
    surname.input.style.outlineColor = "hsl(0, 100%, 34%)";
  }
});

birthdate.input.addEventListener("input", (event) => {
  const selectedDate = event.target.value;
  if (isRequired(selectedDate)) {
    birthdate.input.style.outlineColor = "hsl(145, 63%, 40%)";
  } else {
    birthdate.input.style.outlineColor = "hsl(0, 100%, 34%)";
  }
});

gender.input.addEventListener("change", (event) => {
  const selectedGender = event.target.value;
  if (isRequired(selectedGender)) {
    gender.input.style.outlineColor = "hsl(145, 63%, 40%)";
  } else {
    gender.input.style.outlineColor = "hsl(0, 100%, 34%)";
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
  
  generateProfileCards();
}
// Generate profile cards on page load
generateProfileCards();
