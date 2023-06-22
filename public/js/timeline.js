// Get the profile name from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const profileName = urlParams.get('name');

// Update the header with the profile name
const header = document.getElementById('profileNameHeader');
header.textContent = profileName;