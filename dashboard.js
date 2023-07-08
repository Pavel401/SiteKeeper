const body = document.querySelector("body");
const modeToggle = body.querySelector(".mode-toggle");
const sidebar = body.querySelector("nav");
const sidebarToggle = body.querySelector(".sidebar-toggle");

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
  body.classList.toggle("dark");
}

let getStatus = localStorage.getItem("status");
if (getStatus && getStatus === "close") {
  sidebar.classList.toggle("close");
}

modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    localStorage.setItem("mode", "dark");
  } else {
    localStorage.setItem("mode", "light");
  }
});

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
  if (sidebar.classList.contains("close")) {
    localStorage.setItem("status", "close");
  } else {
    localStorage.setItem("status", "open");
  }
});

document.addEventListener('DOMContentLoaded', function() {
  refreshBookmarksTable();
});

// Function to refresh the bookmarks table
function refreshBookmarksTable() {
  chrome.storage.sync.get({ bookmarks: [] }, function(result) {
    var bookmarks = result.bookmarks;
    var tableBody = document.getElementById('bookmarksTableBody');
    tableBody.innerHTML = '';

    bookmarks.forEach(function(bookmark) {
      var row = document.createElement('tr');

      var titleCell = document.createElement('td');
      titleCell.textContent = bookmark.title;
      row.appendChild(titleCell);

      var urlCell = document.createElement('td');
      var urlLink = document.createElement('a');
      urlLink.href = bookmark.url;
      urlLink.textContent = bookmark.url;
      urlLink.target = '_blank';
      urlCell.appendChild(urlLink);
      row.appendChild(urlCell);

      var descriptionCell = document.createElement('td');
      descriptionCell.textContent = bookmark.description;
      row.appendChild(descriptionCell);

      var timeCell = document.createElement('td');
      timeCell.textContent = new Date().toLocaleString();
      row.appendChild(timeCell);

      var tagsCell = document.createElement('td');
      var tags = bookmark.tags.split(','); // Assuming tags are separated by commas
      tags.forEach(function(tag) {
        var chip = document.createElement('span');
        chip.classList.add('tag-chip');
        chip.textContent = tag.trim();
        tagsCell.appendChild(chip);
      });
      row.appendChild(tagsCell);

      tableBody.appendChild(row);
    });
  });
}
