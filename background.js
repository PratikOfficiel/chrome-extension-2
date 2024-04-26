chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'downloadFile') {
      
      chrome.downloads.download({ url: message.url }, function(downloadId) {
        if (chrome.runtime.lastError) {
          console.error('Error downloading file:', chrome.runtime.lastError.message);
        } else {
          console.log('File download initiated with ID:', downloadId);
        }
      });
    }
  });
  