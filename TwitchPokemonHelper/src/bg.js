var _playSound = true;
var _volume = 1;

function load(){
    browser.storage.local.get(["playSound", "volume"], function(value){
        if(value.playSound !== undefined){
            setPlaySound(value.playSound);
        }
        else {
            setPlaySound(true);
        }
        if(value.volume !== undefined){
            _volume = value.volume;
        }
        else{
            setVolume(1);
        }
    });
    browser.runtime.onMessage.addListener(onMessage);
}

function onMessage(request, sender, sendResponse){
    if (request.action == "badge"){
        if(!_playSound) return;
        play();
    }
    else if (request.action == "getActivate"){
        sendResponse(_playSound);
    }
    else if (request.action == "toggleActivate"){
        setPlaySound(!_playSound);
        sendResponse(_playSound);
    }
    else if (request.action == "getVolume"){
        sendResponse(_volume);
    }
    else if (request.action == "setVolume"){
        setVolume(request.volume);
        sendResponse(_volume);
    }
}

function extensionButtonClick(tab){
    setPlaySound(!_playSound);
}

function setPlaySound(value){
    _playSound = value;
    browser.storage.local.set({"playSound": value});
    if(_playSound){
        browser.browserAction.setIcon({"path" : "media/icon-enabled.png"});
    }
    else{
        browser.browserAction.setIcon({"path" : "media/icon-disabled.png"});
    }
}

function setVolume(value){
    _volume = value;
    browser.storage.local.set({"volume": value});
    play();
}

function play(){
    var audio = new Audio();
    audio.volume = _volume;
    audio.src = "media/badge_notification.mp3"
    audio.play();
}

load();