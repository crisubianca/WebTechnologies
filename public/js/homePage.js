// Sample profile data
let profiles = [{ id: 1, name: "{Kids Name}", image: "logo.png" }];

// Function to generate profile cards
function generateProfileCards() {
  const profileList = document.getElementById("profileList");
  profileList.innerHTML = "";

  profiles.forEach((profile) => {
    const profileCard = document.createElement("div");
    profileCard.classList.add("profile-card");
    profileCard.innerHTML = `
      <img src="${profile.image}" alt="${profile.name}">
      <h3>${profile.name}</h3>
      <button class="delete-profile-button" data-profile-id="${profile.id}">Delete</button>
      <button class="upload-image-button" data-profile-id="${profile.id}">Upload Image</button>
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

const name = document.getElementById("name");
const surname = document.getElementById("surname");
const birthdate = document.getElementById("birthdate");
const gender = document.getElementById("gender");

document.getElementById("addChild").onclick = function () {
  console.log(surname.value);
};

// Generate profile cards on page load
generateProfileCards();

// function includeHTML() {
//   var z, i, elmnt, file, xhttp;
//   /* Loop through a collection of all HTML elements: */
//   z = document.getElementsByTagName("*");
//   for (i = 0; i < z.length; i++) {
//     elmnt = z[i];
//     /*search for elements with a certain atrribute:*/
//     file = elmnt.getAttribute("w3-include-html");
//     if (file) {
//       /* Make an HTTP request using the attribute value as the file name: */
//       xhttp = new XMLHttpRequest();
//       xhttp.onreadystatechange = function() {
//         if (this.readyState == 4) {
//           if (this.status == 200) {elmnt.innerHTML = this.responseText;}
//           if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
//           /* Remove the attribute, and call this function once more: */
//           elmnt.removeAttribute("w3-include-html");
//           includeHTML();
//         }
//       }
//       xhttp.open("GET", file, true);
//       xhttp.send();
//       /* Exit the function: */
//       return;
//     }
//   }
// }
