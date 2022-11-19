if (!sessionStorage.getItem("username")) {
    location.href = "login.html";
}

const BASE_URL="http://localhost:3000/";
let myIFrame, myIframeDocument, ctrlPlayBtn, ctrlPrevBtn, ctrlNextBtn,
    ctrlRepeatShuffleBtn, currentSongId, currentPlaylist, currentIndex,
    ctrlProgressBar, ctrlProgress, nameOfSongP, playingModeSpan;
    let shuffledIndexArr, playModes = [0];
let myAudio = new Audio();

/**playModes= [0,1,2,3] wiht 0-not repeat/shuffle, 1-repeat one song, 
 * 2-repeat playlist one to one, 3-shuffle playlist */


window.onload = function () {

    init();

    //iframe
    myIFrame =  document.querySelector("#musicplayer");
    myIframeDocument = myIFrame.contentDocument;

    //control-play button
    ctrlPlayBtn = myIframeDocument.querySelector(".ctrlPlayBtn");

    //control-Previous Button
    ctrlPrevBtn = myIframeDocument.querySelector(".ctrlPrevBtn");

    //control-Next Button
    ctrlNextBtn = myIframeDocument.querySelector(".ctrlNextBtn");

    //control-Repeat-shuffle button
    ctrlRepeatShuffleBtn = myIframeDocument.querySelector(".ctrlRepeatShuffleBtn");

    //progress bar(container)
    ctrlProgressBar = myIframeDocument.querySelector(".progress-bar");

    //progress
    ctrlProgress = myIframeDocument.querySelector(".progress");

    //name of song P
    nameOfSongP = myIframeDocument.querySelector(".nameOfSong");

    //playing mode span
    playingModeSpan = myIframeDocument.querySelector(".playModeSpan");

    //add event listeners
    ctrlPlayBtn.addEventListener("click", () => {
        isAudioPlaying()? pauseMyAudio() : playMyAudio();
    })

    myAudio.addEventListener("timeupdate", updateProgressBar);

    ctrlProgressBar.addEventListener("click", updateProgressBarPlayPosition);

    ctrlNextBtn.addEventListener("click", playNextSong);

    ctrlPrevBtn.addEventListener("click", playPrevSong);

    ctrlRepeatShuffleBtn.addEventListener("click", playRepeatShuffleSong);
}

function init() {

    document.querySelector(".welcome").innerHTML = `Hello ${sessionStorage.getItem("username")}`;    
    document.querySelector("#searchBtn").onclick = fetchSearchSongs;    
    fetchAllSongs();
    fetchPlaylist();    
}

function logout(event) {
    event.preventDefault();
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    localStorage.removeItem("currentUsername");
    location.href = './login.html';
}

async function fetchAllSongs() {
    let response = await fetch(`${BASE_URL}api/music`, {
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    });
    let songs = await response.json();
    //console.log(songs);
    for (let i = 0; i < songs.length; i++) {
        let myNewRow = document.createElement("tr");
        document.querySelector("#interestedList").appendChild(myNewRow);
        let newRowHTML = `
        <tr class='addedRowInterest'>
            <td>${i + 1}</td>        
            <td>${songs[i].title}</td>
            <td>${songs[i].releaseDate}</td>
            <td><img class="addBtn" src="./images/add.png " alt="" style="width:20px; height: 20px" onclick='addToList("${songs[i].id}")'></td>
        </tr>`
        myNewRow.outerHTML = newRowHTML;
    }
}

async function fetchPlaylist() {
    await fetch(`${BASE_URL}api/playlist`, {
        headers: {

            'Authorization': `Bearer ${sessionStorage.getItem("token")}`
        }
    }).then( response => {
        if (!response.ok) {
            throw new Error("Network reponse was not ok.");
        }
        return response.json();
    }).then(data => currentPlaylist = data)
        .catch(error => console.log(error));
    currentPlaylist.forEach(song => {
        let myNewRow = document.createElement("tr");
        document.querySelector("#playlist").appendChild(myNewRow);
        let newRowHTML = `
        <tr class='addedRowPlaylist'>
            <td>${song.orderId}</td>        
            <td>${song.title}</td>            
            <td>
                <img class="deleteBtn" onclick='deleteFromPlaylist("${song.songId}")' src="./images/delete.png " alt="" style="width:20px; height: 20px; margin-right: 10px;">
                <img class="playBtn" onclick='initAudioPlay("${song.songId}")' src="./images/icons8-play-button-circled-30.png" alt="" style="width:25px; height: 25px;">
            </td>
        </tr>`;
        myNewRow.outerHTML = newRowHTML;
    });
}

async function fetchSearchSongs(event) {
    event.preventDefault();
    const searchStr = document.querySelector("#searchBox").value.trim();
    await fetch(`${BASE_URL}api/music?search=${searchStr}`, {
        headers: {

            'Authorization': `Bearer ${sessionStorage.getItem("token")}`
        }
    }).then(response => {
        if(!response.ok) {
            throw new Error("Network response was not Ok.");
        } 
        return response.json();
    }).then (songs => {
        const addedRows = document.querySelectorAll(".addedRowInterest");
        if (addedRows) {
            addedRows.forEach(row => row.remove());
        }
        document.querySelector("#interestedHeading").style.visibility = "hidden";
        document.querySelector("#searchHeading").style.visibility = "visible";
        for (let i = 0; i < songs.length; i++) {
            let myNewRow = document.createElement("tr");
            document.querySelector("#interestedList").appendChild(myNewRow);
            let newRowHTML = `
        <tr class='addedRowInterest'>
            <td>${i + 1}</td>        
            <td>${songs[i].title}</td>
            <td>${songs[i].releaseDate}</td>
            <td><img class="addBtn" src="./images/add.png " alt="" style="width:20px; height: 20px" onclick='addToList("${songs[i].id}")'></td>
        </tr>`;
            myNewRow.outerHTML = newRowHTML;
        }
    }).catch(error => console.log(error));
}

async function addToList(id) {

    await fetch(`${BASE_URL}api/playlist/add`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/JSON",
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify({
            "songId": id
        })
    }).then (response => {
        if (!response.ok) {
            throw new Error("Network response was not OK");
        }
        return response.json();
    }).then(data => currentPlaylist = data)
        .catch(error => console.log(error));
    location.reload();
}


async function deleteFromPlaylist(id) {

    await fetch(`${BASE_URL}api/playlist/remove`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/JSON",
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify({
            "songId": id
        })
    }).then(response => {
        if (! response.ok) {
            throw new Error("Network response was not OK");
        }
        return response.json();
    }) .then(data => currentPlaylist = data )
        .catch(error => console.log(error)); 
    location.reload();
}

//this function is called as click on play button from playlist
async function initAudioPlay(id) {
    
    currentSongId = id;
    let urlPath;
    for (let song of currentPlaylist) {
        if (song.songId === id) {
            urlPath = song.urlPath;
            currentIndex = parseInt( song.orderId ) - 1;
            break;
        }
    }
    myAudio.src = `${BASE_URL}${urlPath}`;
    playMyAudio();    
}

function playMyAudio() {
    showPlayingMode();
    myIFrame.classList.add("playing");
    ctrlPlayBtn.classList.add("fa-pause");
    ctrlPlayBtn.classList.remove("fa-play");
    const length = playModes.length;
    const mode =  playModes[length - 1];
    if( mode === 0) {//normal mode, not repeat/shuffle
        myAudio.removeEventListener("ended", playRemainingSongsFromList);
        myAudio.removeEventListener("ended", playRemainingSongsOfShuffledList);
        nameOfSongP.innerHTML = `${currentPlaylist[currentIndex].title}`;
        myAudio.currentTime = 0;
        myAudio.play();
    } else if( mode === 1) {//repeat one song
        nameOfSongP.innerHTML = `${currentPlaylist[currentIndex].title}`;
        myAudio.currentTime = 0;
        myAudio.play();
        myAudio.loop = true;
    } else if( mode === 2) {      
        myAudio.loop = false;  
        let urlPath = currentPlaylist[currentIndex].urlPath;
        myAudio.src = `${BASE_URL}${urlPath}`;
        myAudio.currentTime = 0;
        myAudio.play();
        nameOfSongP.innerHTML = `${currentPlaylist[currentIndex].title}`;
        myAudio.addEventListener("ended", playRemainingSongsFromList);

    } else if (mode === 3) {//shuffle the playlist      
            myAudio.loop = false;          
            let shuffledIndex = 0;
            currentIndex = shuffledIndexArr[shuffledIndex];
            let urlPath = currentPlaylist[currentIndex].urlPath;
            myAudio.src = `${BASE_URL}${urlPath}`;
            myAudio.currentTime = 0;
            myAudio.play();
            nameOfSongP.innerHTML = `${currentPlaylist[currentIndex].title}`;
            myAudio.addEventListener("ended", playRemainingSongsOfShuffledList);                         
    }                    
}

function pauseMyAudio() {
    myIFrame.classList.remove("playing");
    ctrlPlayBtn.classList.remove("fa-pause");
    ctrlPlayBtn.classList.add("fa-play")
    myAudio.pause();
}

function isAudioPlaying() {
    return myIFrame.classList.contains("playing");
}

function updateProgressBar(e) {
    const {duration, currentTime} = e.srcElement;
    const durationSpanEle = myIframeDocument.querySelector(".duration");
    const currentTimeSpanEle = myIframeDocument.querySelector(".currentTime");
    durationSpanEle.innerHTML = formatSecondsAsTime( duration );
    currentTimeSpanEle.innerHTML = formatSecondsAsTime( currentTime );
    const progressPercentage = (currentTime / duration) * 100;    
    ctrlProgress.style.width = `${progressPercentage}%`;
}

function formatSecondsAsTime(secs) {
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600)) / 60);
    var sec = Math.floor(secs - (hr * 3600) - (min * 60));

    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }

    return min + ':' + sec;
}

function updateProgressBarPlayPosition(e) {
    var percent = e.offsetX / this.offsetWidth;
    myAudio.currentTime = percent * myAudio.duration;
    ctrlProgressBar.value = percent / 100;
}

function playNextSong() {   
    const length = playModes.length;
    const mode =  playModes[length - 1];
    if ( mode === 0 || mode === 2) {
        if( currentIndex === (currentPlaylist.length - 1) ) {
            currentIndex = 0;
        } else currentIndex += 1;
        let urlPath = currentPlaylist[currentIndex].urlPath;
        myAudio.src = `${BASE_URL}${urlPath}`;
        myAudio.currentTime = 0;
        myAudio.play();
        nameOfSongP.innerHTML = `${currentPlaylist[currentIndex].title}`;
    } else if (mode === 1) {
        myAudio.currentTime = 0;
        myAudio.play();
    } else if (mode === 3){    
        let shuffledIndex = shuffledIndexArr.findIndex(ele => ele === currentIndex);
        if (currentIndex === shuffledIndexArr[shuffledIndexArr.length - 1]) {
            currentIndex = shuffledIndexArr[0];
        }
        else
            currentIndex = shuffledIndexArr[++shuffledIndex];

        let urlPath = currentPlaylist[currentIndex].urlPath;
        myAudio.src = `${BASE_URL}${urlPath}`;
        myAudio.currentTime = 0;
        myAudio.play();
        nameOfSongP.innerHTML = `${currentPlaylist[currentIndex].title}`;
    }    
}

function playPrevSong() {

    const length = playModes.length;
    const mode =  playModes[length - 1];
    if ( mode === 0 || mode === 2) {
        if( currentIndex === 0 ) {
            currentIndex = currentPlaylist.length - 1;
        } else currentIndex -= 1;
        let urlPath = currentPlaylist[currentIndex].urlPath;
        myAudio.currentTime = 0;
        myAudio.src = `${BASE_URL}${urlPath}`;
        myAudio.play();        
        nameOfSongP.innerHTML = `${currentPlaylist[currentIndex].title}`;
    } else if ( mode === 1) {
        myAudio.currentTime = 0;
        myAudio.play();
    } else if( mode === 3) {
        let shuffledIndex = shuffledIndexArr.findIndex(ele => ele === currentIndex);
        if (currentIndex === shuffledIndexArr[0]) {
            currentIndex =  shuffledIndexArr[shuffledIndexArr.length - 1];
        } else
            currentIndex = shuffledIndexArr[--shuffledIndex];

        let urlPath = currentPlaylist[currentIndex].urlPath;
        myAudio.src = `${BASE_URL}${urlPath}`;
        myAudio.currentTime = 0;
        myAudio.play();
        nameOfSongP.innerHTML = `${currentPlaylist[currentIndex].title}`;;
    }
}

function playRepeatShuffleSong () { 

    if(playModes.length == 1) {//repeat one song
        playModes.push(1);  
        myAudio.loop = true;      
    } else if(playModes.length === 2) {//repeat playlist
        playModes.push(2);
        playingModeSpan.innerHTML = "repeat playlist";       
    } else if(playModes.length === 3){//shuffle playlist
        playModes.push(3);
        playingModeSpan.innerHTML = "shuffle playlist";  
        let indexArr = createIndexArr(currentPlaylist.length);
        shuffledIndexArr = createShuffledArray(indexArr);
        currentIndex = shuffledIndexArr[0];    
    } else {
        myAudio.loop = false;
        playModes = [0];//click repeat-shuflle button fouth time -> mode repeat 1 song        
    }
    console.log("playmodes array after clicking: ",playModes);
   playMyAudio();
}

function createShuffledArray(arr) {
    let currentIndex = arr.length, randomIndex;

    //while there remain elements to shuffle
    while( currentIndex != 0 ) {
        //pick a remaining element
        randomIndex = Math.floor( Math.random() * currentIndex );
        currentIndex --;
        //swap it with the current element
        [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]]
    } 
    return arr;
}

 function createIndexArr(length) {
    let result = [];
    for ( let i = 0; i < length; i ++) {
        result.push(i);
    }
    return result;
 }
function showPlayingMode() {
    const mode = playModes[playModes.length - 1];
    console.log("play mode is:", mode);
    switch (mode) {
        case 0:
            playingModeSpan.innerHTML = "normal mode";  
            break;
        case 1:
            playingModeSpan.innerHTML = "repeat one song";  
            break;
        case 2:
            playingModeSpan.innerHTML = "repeat playlist";  
            break;
        case 3:
            playingModeSpan.innerHTML = "suffle playlist";  
            break;
    }
}

function playRemainingSongsFromList(event, mode) {

        if (currentIndex === currentPlaylist.length - 1) {
            currentIndex = 0;
        } else
            currentIndex = currentIndex + 1;        
    let urlPath = currentPlaylist[currentIndex].urlPath;
    event.target.src = `${BASE_URL}${urlPath}`;
    event.target.currentTime = 0;
    event.target.play();
    nameOfSongP.innerHTML = `${currentPlaylist[currentIndex].title}`;
}

function playRemainingSongsOfShuffledList() {
    let shuffledIndex = shuffledIndexArr.findIndex(ele => ele === currentIndex);
    if (currentIndex === shuffledIndexArr[shuffledIndexArr.length - 1]) {
        currentIndex = shuffledIndexArr[0];
    }
    else
        currentIndex = shuffledIndexArr[++shuffledIndex];

    let urlPath = currentPlaylist[currentIndex].urlPath;
    myAudio.src = `${BASE_URL}${urlPath}`;
    myAudio.currentTime = 0;
    myAudio.play();
    nameOfSongP.innerHTML = `${currentPlaylist[currentIndex].title}`;
}
