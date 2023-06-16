// Sample profile data
const profiles = [
  { id: 1, name: '{Kids Name}', image: 'logo.png' },
  { id: 2, name: '{Kids Name}', image: 'logo.png' },
  { id: 3, name: '{Kids Name}', image: 'logo.png' }
];

// Function to generate profile cards
function generateProfileCards() {
  const profileList = document.getElementById('profileList');
  profileList.innerHTML = '';

  profiles.forEach((profile) => {
    const profileCard = document.createElement('div');
    profileCard.classList.add('profile-card');
    profileCard.innerHTML = `
      <img src="${profile.image}" alt="${profile.name}">
      <h3>${profile.name}</h3>
    `;

    // Add event listener for profile card click
    profileCard.addEventListener('click', () => {
      redirectToProfilePage(profile.id);
    });

    profileList.appendChild(profileCard);
  });
}

// Function to redirect to profile-specific HTML page
function redirectToProfilePage(profileId) {
  // Replace 'profile.html' with your actual profile-specific HTML page
  const profilePageUrl = `fsSchedule.html`;
  window.location.href = profilePageUrl;
}

// Event listener for 'Add Profile' button
const addProfileButton = document.getElementById('addProfileButton');
addProfileButton.addEventListener('click', () => {
  const newProfileName = prompt('Enter the name of the new profile:');
  if (newProfileName) {
    const newProfile = {
      id: profiles.length + 1,
      name: newProfileName,
      image: 'logo.png'
    };
    profiles.push(newProfile);
    generateProfileCards();
  }
});

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
  