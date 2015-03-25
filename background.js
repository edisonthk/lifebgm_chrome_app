chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('main.html', {
    'innerBounds': {
      'width': 620,
      'height': 620,
      'minWidth': 620,
      'minHeight': 620,
      'left': 100,
      'top': 100
    }
    // state: "fullscreen",
  });
});
