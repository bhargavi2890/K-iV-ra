document.addEventListener("DOMContentLoaded", function() {
    // Function to toggle the visibility of the edit profile form
    window.toggleEditForm = function() {
        var form = document.getElementById('editProfileForm');
        form.style.display = (form.style.display === 'none' || form.style.display === '') ? 'block' : 'none';
    };

    // Function to handle the form submission
    window.saveProfile = function(event) {
        event.preventDefault();  // Prevent the default form submission

        // Fetching values from form fields
        var name = document.getElementById('profileName').value;
        var pronouns = document.getElementById('pronouns').value;
        var contact = document.getElementById('contact').value;
        var biography = document.getElementById('biography').value;
        var links = document.getElementById('links').value;

        // Saving values to localStorage
        localStorage.setItem('profileName', name);
        localStorage.setItem('pronouns', pronouns);
        localStorage.setItem('contact', contact);
        localStorage.setItem('biography', biography);
        localStorage.setItem('links', links);
        updateProfileDisplay(name, pronouns, contact, biography, links);
        toggleEditForm();
    };

    // Function to update the profile display
    function updateProfileDisplay(name, pronouns, contact, biography, links) {
        document.getElementById('profileFullName').innerText = name + ' (' + pronouns + ')';
        document.getElementById('profileContact').innerText = contact || "No registered services, you can add some on the settings page.";
        document.getElementById('profileBiography').innerText = biography || "No biography provided.";

        // Parse the links and create anchor elements
        var linksContainer = document.getElementById('profileLinks');
        linksContainer.innerHTML = '';  // Clear existing links
        if (links) {
            var linksArray = links.split(',').map(link => link.trim());
            linksArray.forEach(link => {
                var anchor = document.createElement('a');
                anchor.href = link;
                anchor.innerText = link;
                anchor.target = "_blank";  // Open link in a new tab
                linksContainer.appendChild(anchor);
                linksContainer.appendChild(document.createElement('br'));
            });
        } else {
            linksContainer.innerText = name + " hasn't added any links.";
        }
    }

loadProfileData();  // Initial load of profile data
});
   
