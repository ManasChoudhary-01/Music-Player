const musicData = [
    {
        title: "Faded",
        description: "Alan Walker",
        imgSrc: "assets/image/img1.jpg",
        audioSrc: "assets/song/song1.m4a"
    },
    {
        title: "Faded",
        description: "Alan Walker",
        imgSrc: "assets/image/img1.jpg",
        audioSrc: "assets/song/song1.m4a"
    },

];

let currentIndex = 0;

let likedSongs = JSON.parse(localStorage.getItem('likedSongs')) || [];

const musicContainer = document.getElementById('musicContainer');

function displayCard(index) {
    musicContainer.innerHTML = '';

    const music = musicData[index];
    const isLiked = likedSongs.includes(index);

    const musicCard = document.createElement('div');
    musicCard.className = 'musicCard';

    musicCard.innerHTML = `
        <nav>
            <div class="circle" onclick="toggleLike(${index})">
                <i id="heartIcon-${index}" class='fa${isLiked ? 's' : 'r'} fa-heart' style='color: ${isLiked ? 'red' : 'transparent'}'></i>
            </div>
            <div class="circle">
                <i class='bx bx-menu'></i>
            </div>
        </nav>
        <div class="imageContainer" id="imageContainer-${index}">
            <img src="${music.imgSrc}" alt="${music.title}">
        </div>
        <div class="details">
            <h1>${music.title}</h1>
            <p>${music.description}</p>
        </div>
        <audio id="song-${index}">
            <source src="${music.audioSrc}">
        </audio>
        <input type="range" value="0" class="progress" id="progress-${index}">
        <div id="duration-${index}" class="duration">00:00</div>
        <div class="controls">
            <i class="fa-solid fa-backward" onclick="showPrevious()"></i>
            <div onclick="playPause(${index})"><i id="ctrlIcon-${index}" class="fa-solid fa-play"></i></div>
            <i class="fa-solid fa-forward" onclick="showNext()"></i>
        </div>
    `;

    musicContainer.appendChild(musicCard);

    const song = document.getElementById(`song-${index}`);
    const progress = document.getElementById(`progress-${index}`);
    const durationDiv = document.getElementById(`duration-${index}`);
    const imageContainer = document.getElementById(`imageContainer-${index}`);

    // Update progress bar and duration on audio loaded metadata
    song.onloadedmetadata = function () {
        progress.max = song.duration;
        durationDiv.textContent = formatTime(song.duration); // Display total duration
    };

    // Update progress bar and duration on time update
    song.ontimeupdate = function () {
        progress.value = song.currentTime;
        durationDiv.textContent = formatTime(song.currentTime);
    };
    
    // song.onloadedmetadata = function () {
    //     progress.max = song.duration;
    //     progress.value = song.currentTime;
    //     durationDiv.textContent = formatTime(song.currentTime);
    // };

    // song.ontimeupdate = function () {
    //     progress.value = song.currentTime;
    //     durationDiv.textContent = formatTime(song.currentTime);
    // };

    progress.addEventListener('input', function() {
        song.currentTime = progress.value;
    });

    song.onplay = function () {
        imageContainer.classList.add('rotating');
    };

    song.onpause = function () {
        imageContainer.classList.remove('rotating');
    };
}

function showNext() {
    currentIndex = (currentIndex + 1) % musicData.length;
    displayCard(currentIndex);
}

function showPrevious() {
    currentIndex = (currentIndex - 1 + musicData.length) % musicData.length;
    displayCard(currentIndex);
}

function playPause(index) {
    const song = document.getElementById(`song-${index}`);
    const ctrlIcon = document.getElementById(`ctrlIcon-${index}`);

    if (ctrlIcon.classList.contains("fa-pause")) {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    } else {
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    }
}

function toggleLike(index) {
    const heartIcon = document.getElementById(`heartIcon-${index}`);
    
    if (likedSongs.includes(index)) {
        likedSongs = likedSongs.filter(i => i !== index);
        heartIcon.classList.remove('fa');
        heartIcon.classList.add('far');
        heartIcon.style.backgroundColor = 'transparent';
    } else {
        likedSongs.push(index);
        heartIcon.classList.remove('far');
        heartIcon.classList.add('fa');
        heartIcon.style.backgroundColor = 'red';
    }

    localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

displayCard(currentIndex);


function displayCard(index) {
    musicContainer.innerHTML = '';

    const music = musicData[index];
    const isLiked = likedSongs.includes(index);

    const musicCard = document.createElement('div');
    musicCard.className = 'musicCard';

    musicCard.innerHTML = `
        <nav>
            <div class="circle" onclick="toggleLike(${index})">
                <i id="heartIcon-${index}" class='fa${isLiked ? 's' : 'r'} fa-heart' style='color: ${isLiked ? 'red' : 'transparent'}'></i>
            </div>
            <div class="circle">
                <i class='bx bx-menu'></i>
            </div>
        </nav>
        <div class="imageContainer" id="imageContainer-${index}">
            <img src="${music.imgSrc}" alt="${music.title}">
        </div>
        <div class="details">
            <h1>${music.title}</h1>
            <p>${music.description}</p>
        </div>
        <audio id="song-${index}">
            <source src="${music.audioSrc}">
        </audio>
        <input type="range" value="0" class="progress" id="progress-${index}">
        <div id="duration-${index}" class="duration">00:00</div>
        <div class="controls">
            <i class="fa-solid fa-backward" onclick="showPrevious()"></i>
            <div onclick="playPause(${index})"><i id="ctrlIcon-${index}" class="fa-solid fa-play"></i></div>
            <i class="fa-solid fa-forward" onclick="showNext()"></i>
        </div>
    `;

    musicContainer.appendChild(musicCard);

    const song = document.getElementById(`song-${index}`);
    const progress = document.getElementById(`progress-${index}`);
    const durationDiv = document.getElementById(`duration-${index}`);
    const imageContainer = document.getElementById(`imageContainer-${index}`);

    // Update progress bar and duration on audio loaded metadata
    song.onloadedmetadata = function () {
        progress.max = song.duration;
        durationDiv.textContent = formatTime(song.duration); // Display total duration
    };

    // Update progress bar and duration on time update
    song.ontimeupdate = function () {
        progress.value = song.currentTime;
        durationDiv.textContent = formatTime(song.currentTime);
    };

    progress.addEventListener('input', function() {
        song.currentTime = progress.value;
    });

    song.onplay = function () {
        imageContainer.classList.add('rotating');
    };

    song.onpause = function () {
        imageContainer.classList.remove('rotating');
    };
}

// Other functions like showNext, showPrevious, playPause, toggleLike, and formatTime remain unchanged

displayCard(currentIndex);
