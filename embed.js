console.log("Embeded script loaded.");

let initialized = false;
document.addEventListener('DOMContentLoaded', function () {
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

  video.addEventListener('progress', (event) => {
    const playedSeconds = Math.floor(event.target.currentTime);
console.log(playedSeconds);
    if(playedSeconds%5 === 0 || playedSeconds === 0){
      console.log(playedSeconds);
    }
  });

  video. onseeking = function(event) {
    console.log("seeking", event.target.currentTime);
  }
  
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const data = urlParams.get('traffic_data');
  console.log(JSON.parse(atob(data)));
}, false);
