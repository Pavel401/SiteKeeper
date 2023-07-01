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
        tagsCell.textContent = bookmark.tags;
        row.appendChild(tagsCell);
  
        tableBody.appendChild(row);
      });
    });
  }
  