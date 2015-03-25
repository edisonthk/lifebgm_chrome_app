var connectionId = -1;

function onReceive(receiveInfo) {
  if (receiveInfo.connectionId !== connectionId)
    return;

  // data received
  // convert received ArrayBuff data to ascii string
  var a = String.fromCharCode.apply(null, new Uint8Array(receiveInfo.data));
  var data = a.split(",");

  var people = data[0];
  var bright = data[1];
  var temperature = data[2];

  var people_ele = document.getElementById("home");
  var bright_ele = document.getElementById("light");
  if(people == "1"){
    // 人が部屋にいる
    addClass(people_ele, "show");
  }else{
    // 人が部屋にいない
    removeClass(people_ele, "show");
  }

  if(bright == "1"){
    // 明るい
    addClass(bright_ele, "show");
  }else{
    // 暗い
    removeClass(bright_ele, "show");
  }

  

  document.getElementById("temperature").innerHTML = temperature + "°C";

};

function addClass(elem,className){
  if(elem.className.indexOf(className) >= 0){return true;}elem.className += ' '+className;
}
function removeClass(elem,className){
  var c = elem.className;var p = new RegExp('(^| )'+className+'( |$)');c = c.replace(p,' ').replace(/  /g,' ');elem.className = c;
}


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

function initialTimer() {
  var timer = document.getElementById("time");
  var suffix_ele = document.getElementById("am_pm");
  var date_ele = document.getElementById("date");

  setInterval(function() {
    var currentTime = new Date()
        var hours = currentTime.getHours()
        var minutes = currentTime.getMinutes()

        if (minutes < 10)
            minutes = "0" + minutes;

        var suffix = "AM";
        if (hours >= 12) {
            suffix = "PM";
        
        }
        
        var weeks = new Array('日','月','火','水','木','金','土');
        timer.innerHTML = hours + ":" + minutes;
        suffix_ele.innerHTML = suffix;
        date_ele.innerHTML = currentTime.getFullYear()+"年"+pad(currentTime.getMonth() + 1,  2)+"月"+pad(currentTime.getDate(), 2) + "日 (" +  weeks[currentTime.getDay()] + ")";

  },1000);

}

function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}

onload = function() {
  
  initialTimer();
  
  chrome.serial.getDevices(function(ports) {
    // Connect to the serial port /dev/ttyS01
    chrome.serial.connect("/dev/tty.usbmodem1412", {bitrate: 9600}, onConnect);  
  });
};

