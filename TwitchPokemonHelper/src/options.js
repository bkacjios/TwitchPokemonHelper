document.addEventListener("DOMContentLoaded", function(event) { 
    browser.runtime.sendMessage({action: "getActivate"}, setActivated);
    browser.runtime.sendMessage({action: "getVolume"}, setVolume);
    document.getElementById("activator").onclick = toggleActivate;
    document.getElementById("volume").onclick = volumeChanged;
});

function toggleActivate(){
    browser.runtime.sendMessage({action: "toggleActivate"}, setActivated);
}

function volumeChanged(){
    browser.runtime.sendMessage({action: "setVolume", volume: document.getElementById("volume").value}, setVolume);
}

function setActivated(value){
    var activator = document.getElementById("activator");
    if(value){
        activator.src = browser.runtime.getURL("media/icon-enabled.png");
        activator.title = "Sound Enabled";
    }
    else{
        activator.src = browser.runtime.getURL("media/icon-disabled.png");
        activator.title = "Sound Disabled";
    }
}

function setVolume(value){
    document.getElementById("volume").value = value;
}