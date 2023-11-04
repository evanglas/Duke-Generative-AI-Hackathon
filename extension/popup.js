// icon
const extensionIcon = document.createElement('img');
extensionIcon.src = chrome.runtime.getURL('images/reading_128.png');
extensionIcon.style.cssText = `
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 48px;
  height: 48px;
  cursor: pointer;
  z-index: 100000;
`;

// popup
const popup = document.createElement('div');
popup.style.cssText = `
  display: none;
  position: fixed;
  bottom: 60px;
  right: 10px;
  width: auto;
  height: auto;
  max-width: 340px; 
  background-color: #4CAF50; 
  color: #333; 
  border: 1px solid #ddd; 
  border-radius: 8px; 
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); 
  z-index: 100001;
  padding: 20px; 
  box-sizing: border-box; 
`;

// content
popup.innerHTML = `
    <div id="popup-container" style="text-align: center;">
    <label for="language-select" style="display: block; margin-bottom: 10px;">Select Your language:</label>
    <select id="language-select" style="width: 100%; margin-bottom: 20px;">
    <option value="English">English</option>
    <option value="Chinese">Chinese</option>
    <option value="Spanish">Spanish</option>
    <option value="French">French</option>
    <option value="Japanese">Japanese</option>
    <!-- Add more language options here -->
    </select>

    <label for="reading-level-select" style="display: block; margin-bottom: 10px;">Select Your Reading Level:</label>
    <select id="reading-level-select" style="width: 100%; margin-bottom: 20px;">
    <option value="Beginner">Beginner: Age 5 - 10</option>
    <option value="Intermediate">Intermediate: Age 11 - 15</option>
    <option value="Advanced">Advanced: Age 16 - 20</option>
    <!-- Add more reading level options here -->
    </select>
    </div>
`;

document.body.appendChild(extensionIcon);
document.body.appendChild(popup);

extensionIcon.addEventListener('click', function(event) {
  popup.style.display = (popup.style.display === 'none' ? 'block' : 'none');
  event.stopPropagation(); 
});

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('popup-close').addEventListener('click', function() {
    popup.style.display = 'none';
  });

  window.addEventListener('click', function(event) {
    if (!popup.contains(event.target) && !extensionIcon.contains(event.target)) {
      popup.style.display = 'none';
    }
  });

  popup.addEventListener('click', function(event) {
    event.stopPropagation();
  });
});



