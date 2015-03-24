var connectionId = -1;

function onReceive(receiveInfo) {
  if (receiveInfo.connectionId !== connectionId)
    return;

  // data received
  // convert received ArrayBuff data to ascii string
  var a = String.fromCharCode.apply(null, new Uint8Array(receiveInfo.data));

  console.log(a);
};

function onError(errorInfo) {
  console.warn("Receive error on serial connection: " + errorInfo.error);
};

function onConnect(connectionInfo) {
   // The serial port has been opened. Save its id to use later.
  connectionId = connectionInfo.connectionId;
  // Do whatever you need to do with the opened port.
  console.log("onConnect");
}

// action
function disconnect(){
  console.log("disconnect");
  if (connectionId != -1) {
    chrome.serial.disconnect(connectionId);
    return;
  }
}

chrome.serial.onReceive.addListener(onReceive);
chrome.serial.onReceiveError.addListener(onError);


onload = function() {
  console.log("onload");
  
  chrome.serial.getDevices(function(ports) {
    // Connect to the serial port /dev/ttyS01
    chrome.serial.connect("/dev/tty.usbmodem1412", {bitrate: 9600}, onConnect);  
  });
};