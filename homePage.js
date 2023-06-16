function addProfile() {
    const slideshowContainer = document.getElementById('slideshowContainer');
    const profileCount = slideshowContainer.getElementsByClassName('slide').length + 1;
  
    const newSlide = document.createElement('div');
    newSlide.classList.add('slide');
  
    const profilePhoto = document.createElement('img');
    profilePhoto.src = 'logo.png'; // Replace with the actual photo URL
    profilePhoto.alt = `Kid's ${profileCount} Photo`;
  
    const profileName = document.createElement('div');
    profileName.textContent = `Kid's ${profileCount} Name`;
  
    newSlide.appendChild(profilePhoto);
    newSlide.appendChild(profileName);
  
    slideshowContainer.appendChild(newSlide);
  }
  
  const addProfileButton = document.getElementById('addProfileButton');
  addProfileButton.addEventListener('click', addProfile);
  
  // Event delegation for clicking on profiles
  const slideshowContainer = document.getElementById('slideshowContainer');
  slideshowContainer.addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('slide')) {
      const profileCount = Array.from(slideshowContainer.getElementsByClassName('slide')).indexOf(target) + 1;
      window.location.href = `fsSchedule.html?profile=${profileCount}`;
    }
  });
  