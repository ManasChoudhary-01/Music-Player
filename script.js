// INITIALIZING AOS ANIMATION ON START
AOS.init();

const musicData = [
    {
        title: "Faded",
        description: "Alan Walker",
        imgSrc: "assets/image/img1.jpg",
        audioSrc: "assets/song/song1.m4a"
    },
    {
        title: "Into Your Arms",
        description: "Ava Max and Witt Lowry",
        imgSrc: "assets/image/img2.jpg",
        audioSrc: "assets/song/song2.m4a"
    },
    {
        title: "The Weeknd",
        description: "Abel Makkonen Tesfaye",
        imgSrc: "assets/image/img3.jpg",
        audioSrc: "assets/song/song3.m4a"
    },
    {
        title: "Shape of You",
        description: "Ed Sheeran",
        imgSrc: "assets/image/img4.jpg",
        audioSrc: "assets/song/song4.m4a"
    },
    {
        title: "Closer",
        description: "The Chainsmokers",
        imgSrc: "assets/image/img5.jpg",
        audioSrc: "assets/song/song5.m4a"
    },
    {
        title: "Love Me Like You Do",
        description: "Ellie Goulding",
        imgSrc: "assets/image/img6.jpg",
        audioSrc: "assets/song/song6.m4a"
    },
    {
        title: "Do Din",
        description: "Darshan Raval",
        imgSrc: "assets/image/img7.jpg",
        audioSrc: "assets/song/song7.m4a"
    },
    {
        title: "Chhod Diya",
        description: "Arijit Singh, Kanika Kapoor",
        imgSrc: "assets/image/img8.jpg",
        audioSrc: "assets/song/song8.m4a"
    },
    {
        title: "Janiye",
        description: "Vishal Mishra",
        imgSrc: "assets/image/img9.jpg",
        audioSrc: "assets/song/song9.m4a"
    },
    {
        title: "Dhundhala",
        description: "Yashraj, Talwiinder",
        imgSrc: "assets/image/img10.jpg",
        audioSrc: "assets/song/song10.m4a"
    },
];

let currentIndex = 0;

let likedSongs = JSON.parse(localStorage.getItem('likedSongs')) || [];

window.onload = () => {
    displayCard(currentIndex);
};

const musicContainer = document.getElementById('musicContainer');

function displayCard(index) {
    musicContainer.innerHTML = '';

    const music = musicData[index];
    const isLiked = likedSongs.includes(index);

    const musicCard = document.createElement('div');
    musicCard.className = 'musicCard';
    musicCard.setAttribute('data-aos', 'zoom-in');

    musicCard.innerHTML = `
        <nav>
            <div class="circle" onclick="toggleLike(${index})">
                <i id="heartIcon-${index}" class="fa-regular fa-heart"></i>
            </div>
            <p>Playing Now..</p>
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
    const heartIcon = document.getElementById(`heartIcon-${index}`);

    if (isLiked) {
        heartIcon.classList.remove('far');
        heartIcon.classList.add('fas');
        heartIcon.style.color = 'red';
    } else {
        heartIcon.classList.remove('fas');
        heartIcon.classList.add('far');
        heartIcon.style.color = '#86898c';
    }

    song.onloadedmetadata = function () {
        progress.max = song.duration;
        durationDiv.textContent = formatTime(song.duration); // Display total duration
    };

    song.ontimeupdate = function () {
        progress.value = song.currentTime;
        durationDiv.textContent = formatTime(song.duration - song.currentTime); // Display remaining time
        updateProgressBackground(progress);
    };

    progress.addEventListener('input', function() {
        song.currentTime = progress.value;
        updateProgressBackground(progress);
    });

    song.onplay = function () {
        imageContainer.classList.add('rotating');
    };

    song.onpause = function () {
        imageContainer.classList.remove('rotating');
    };

    song.onended = function () {
        showNext(true);
    };
}

function showNext(autoPlay = false) {
    currentIndex = (currentIndex + 1) % musicData.length;
    displayCard(currentIndex);
    if (autoPlay) {
        const song = document.getElementById(`song-${currentIndex}`);
        const ctrlIcon = document.getElementById(`ctrlIcon-${currentIndex}`);
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    }
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
        heartIcon.classList.remove('fas');
        heartIcon.classList.add('far');
        heartIcon.style.color = '#86898c';
    } else {
        likedSongs.push(index);
        heartIcon.classList.remove('far');
        heartIcon.classList.add('fas');
        heartIcon.style.color = 'red';
    }

    localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateProgressBackground(progress) {
    const percentage = (progress.value / progress.max) * 100;
    progress.style.setProperty('--progress', percentage + '%');
    progress.style.setProperty('background', `linear-gradient(to right, #bf2311 ${percentage}%, var(--bg04) ${percentage}%)`);
}

displayCard(currentIndex);
