
let initialized = false;
document.addEventListener('DOMContentLoaded', function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let data = urlParams.get('traffic_data');
  data = JSON.parse(atob(data));

  const video = document.querySelector("video");
  window.video = video;
  video.oncanplay = function() {
    const playctl = document.querySelector(".plyr__control");
    const newNode = document.createElement('div');
    newNode.classList.add('plyr__controls__item');
    newNode.textContent = '© Mahaguru';
    newNode.style.whiteSpace = "nowrap";
    newNode.style.fontSize = "small";

    if(!initialized){
      initialized = true;
      playctl.parentNode.insertBefore(newNode, playctl.nextSibling);
    }
  }

  let lastSync = 0;
  video.addEventListener('timeupdate', (event) => {
    const playedSeconds = Math.floor(event.target.currentTime);
    if(playedSeconds%5 === 0){
      if(playedSeconds !== lastSync){
        lastSync = playedSeconds;
        fetch(data.url, { method: "PUT", headers: { authorization: data.token, 'content-type': 'application/json' }, body: JSON.stringify({ duration: playedSeconds }) });
      }
    }
  });

  let seekingData = [];
  video. onseeking = function(event) {
    seekingData = [ ...seekingData, Math.floor(event.target.currentTime) ]
    fetch(data.url, { method: "PUT", headers: { authorization: data.token, 'content-type': 'application/json' }, body: JSON.stringify({ seekEvent: seekingData, duration: Math.floor(event.target.currentTime) }) });
  }
}, false);
