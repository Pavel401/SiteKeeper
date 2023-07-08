document.addEventListener('DOMContentLoaded', function() {
  var bookmarkForm = document.getElementById('bookmarkForm');
  bookmarkForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    var titleInput = document.getElementById('titleInput');
    var descriptionInput = document.getElementById('descriptionInput');
    var tagsInput = document.getElementById('tagsInput');

    var bookmark = {
      title: titleInput.value,
      description: descriptionInput.value,
      tags: tagsInput.value,
      url: ''
    };

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var currentTab = tabs[0];
      bookmark.url = currentTab.url;

      chrome.storage.sync.get({ bookmarks: [] }, function(result) {
        var bookmarks = result.bookmarks;
        bookmarks.push(bookmark);

        chrome.storage.sync.set({ bookmarks: bookmarks }, function() {
          displayBookmarks(bookmarks);
        });
      });
    });

    // Reset form inputs
    titleInput.value = '';
    descriptionInput.value = '';
    tagsInput.value = '';
    refreshBookmarksTable();

  });

  // Retrieve bookmarks from sync local storage and display them
  chrome.storage.sync.get({ bookmarks: [] }, function(result) {
    var bookmarks = result.bookmarks;
    displayBookmarks(bookmarks);
  });

  refreshBookmarksTable();

});

// Function to display bookmarks in a list view
function displayBookmarks(bookmarks) {
  // var bookmarksList = document.getElementById('bookmarksList');
  // bookmarksList.innerHTML = '';

  bookmarks.forEach(function(bookmark) {
    var listItem = document.createElement('li');
    var link = document.createElement('a');
    link.href = bookmark.url;
    link.textContent = bookmark.title;
    link.target = '_blank';

    listItem.appendChild(link);
    bookmarksList.appendChild(listItem);
  });
}

// Function to refresh the bookmarks table
function refreshBookmarksTable() {
  chrome.storage.sync.get({ bookmarks: [] }, function(result) {
    var bookmarks = result.bookmarks;
    var tableBody = document.querySelector('#bookmarksTable tbody');
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
      tagsCell.textContent = bookmark.tags;
      row.appendChild(tagsCell);

      tableBody.appendChild(row);
    });
  });
}



