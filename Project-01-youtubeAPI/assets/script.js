let player = document.getElementById("player");

const API_KEY = 'AIzaSyAef2luYscByCqPUlmPrktuCaFsHkVgL08';
const playListId = 'PLaRCh1VgIzthPvpaXIsDwshR7tm4W-Y83';



function getAPIData() {
    fetch(`https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&part=contentDetails, snippet&playlistId=${playListId}`)
        .then(res => res.json()).then(data => {

            showAPIdata(data);
        });
}


getAPIData();
function showAPIdata(data) {
    console.log(data);
    var apiData = data.items.id;
    console.log(apiData);
    var apiItemIndex = data.items;
    console.log(apiItemIndex);

    for (i = 0; i <= apiItemIndex.length; i++) {
        console.log(i);
        var vidID = data.items[i].contentDetails.videoId;
        var vidTitle = data.items[i].snippet.title;
        var vidOwner = data.items[i].snippet.videoOwnerChannelTitle;
        console.log(vidTitle);
        var vidList = document.createElement('iframe');
        vidList.setAttribute('allowFullScreen', '');
        vidList.setAttribute('src', `https://www.youtube.com/embed/${vidID}`)
        vidList.setAttribute('title', `${vidTitle}`)
        vidList.setAttribute('width', '400');
        vidList.setAttribute('height', '300');
        vidList.setAttribute('id', 'video-player')
        var vidTitleDom = document.createElement('p');
        vidTitleDom.innerHTML = `Title:${vidTitle} <br>Video Owner: ${vidOwner}`;
        console.log(vidList);
        player.appendChild(vidTitleDom);
        player.appendChild(vidList);
    }

}