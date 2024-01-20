const fileInput = document.getElementById('fileInput');
const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('playPause');
const nextButton = document.getElementById('next');
const loopSingleButton = document.getElementById('loopSingle');
const loopLinearButton = document.getElementById('loopLinear');
const loopRandomButton = document.getElementById('loopRandom');
const currentSongInfo = document.getElementById('currentSong');


let loopMode = 'none'; // Possible values: 'none', 'single', 'linear', 'random'
let songList = [];
let currentSongIndex = 0;
let isPlaying = false;
let isLoopSingle = false;
let isLoopLinear = false;
let isLoopRandom = false;






nextButton.addEventListener('click', function () {
  playNextSong();
});

function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % songList.length;
  const nextObjectURL = URL.createObjectURL(songList[currentSongIndex]);
  audio.src = nextObjectURL;
  audio.play();
  updateSongInfo();
}



// Function to toggle play/pause
function togglePlayPause() {
  const audio = document.getElementById('audio');
  const playPauseIcon = document.getElementById('playPauseIcon');

  if (isPlaying) {
    audio.pause();
    playPauseIcon.classList.remove('fa-pause');
    playPauseIcon.classList.add('fa-play');
  } else {
    audio.play();
    playPauseIcon.classList.remove('fa-play');
    playPauseIcon.classList.add('fa-pause');
  }

  // Toggle the play/pause state
  isPlaying = !isPlaying;
}


// Function to toggle loop modes
function toggleLoop(mode) {
  isLoopSingle = mode === 'single';
  isLoopLinear = mode === 'linear';
  isLoopRandom = mode === 'random';

  loopSingleButton.style.color = isLoopSingle ? 'green' : 'black';
  loopLinearButton.style.color = isLoopLinear ? 'green' : 'black';
  loopRandomButton.style.color = isLoopRandom ? 'green' : 'black';
}

loopSingleButton.addEventListener('click', function () {
  toggleLoop('single');
});

loopLinearButton.addEventListener('click', function () {
  toggleLoop('linear');
});

loopRandomButton.addEventListener('click', function () {
  toggleLoop('random');
});


// Function to update current song information
function updateCurrentSongInfo(index) {
  currentSongIndex = index;
  currentSongInfo.textContent = `Now Playing: Song ${currentSongIndex + 1}`;
}
// Event listener for file input change
fileInput.addEventListener('change', () => {
  songList = Array.from(fileInput.files);
  if (songList.length > 0) {
    updateSongList();
    playSelectedSong(0); // Play the first song automatically
  }
});

// Add a variable to track the play/pause state


audio.addEventListener('ended', function () {
  switch (loopMode) {
    case 'single':
      // Repeat the same song
      audio.play();
      break;
    case 'linear':
      // Play the next song in a linear order
      playNextSong();
      break;
    case 'random':
      // Play a random song
      playRandomSong();
      break;
    default:
      // No loop, play the next song in a linear order
      playNextSong();
      break;
  }
});

function playRandomSong() {
  const randomIndex = Math.floor(Math.random() * songList.length);
  currentSongIndex = randomIndex;
  const randomObjectURL = URL.createObjectURL(songList[randomIndex]);
  audio.src = randomObjectURL;
  audio.play();
  updateSongInfo();
}


// Function to handle song button click
function playSelectedSong(index) {
  if (index >= 0 && index < songList.length) {
    audio.src = URL.createObjectURL(songList[index]);
    audio.play();
    updateCurrentSongInfo(index);
  }
}

// Update the song list in the scroll box with clickable buttons
function updateSongList() {
  const songListElement = document.getElementById('songList');
  songListElement.innerHTML = ''; // Clear the existing list

  for (let i = 0; i < songList.length; i++) {
    const listItem = document.createElement('li');
    const songButton = document.createElement('button');
    const songName = songList[i].name; // Get the name of the song
    songButton.textContent = songName || `Song ${i + 1}`; // Use the song name if available, else use a default
    songButton.addEventListener('click', () => playSelectedSong(i));
    listItem.appendChild(songButton);
    songListElement.appendChild(listItem);
  }
}
function updateSongInfo() {
  currentSongInfo.textContent = songList[currentSongIndex]?.name || 'No song selected';
}

fileInput.addEventListener('change', function () {
  songList = Array.from(this.files);
  currentSongIndex = 0;

  if (songList.length > 0) {
    const objectURL = URL.createObjectURL(songList[currentSongIndex]);
    audio.src = objectURL;
    audio.play();
    playPauseButton.textContent = 'Pause';
  } else {
    audio.src = '';
    currentSongElement.textContent = 'No song selected';
    playPauseButton.textContent = 'Play';
  }

  // Update the song list display
  songListElement.innerHTML = '';
  songList.forEach((song, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${song.name}`;
    songListElement.appendChild(listItem);
  });

  
  audio.addEventListener('ended', function () {
    // Play the next song when the current one ends
    currentSongIndex = (currentSongIndex + 1) % songList.length;
    const objectURL = URL.createObjectURL(songList[currentSongIndex]);
    audio.src = objectURL;
    audio.play();
    updateSongInfo();
  });
  const songListContainer = document.querySelector('.song-list-container');
  
  // Function to update the song list in the scroll box
  function updateSongList() {
    const songListElement = document.getElementById('songList');
    songListElement.innerHTML = ''; // Clear the existing list
  
    for (let i = 0; i < songList.length; i++) {
      const listItem = document.createElement('li');
      listItem.textContent = `Song ${i + 1}`; // Update this to show the actual song details
      songListElement.appendChild(listItem);
    }
  }
  updateSongInfo();
});


// Function to handle song button click
function playSelectedSong(index) {
  if (index >= 0 && index < songList.length) {
    audio.src = URL.createObjectURL(songList[index]);
    audio.play();
    updateCurrentSongInfo(index);
  }
}

// Update the song list in the scroll box with clickable buttons
function updateSongList() {
  const songListElement = document.getElementById('songList');
  songListElement.innerHTML = ''; // Clear the existing list

  for (let i = 0; i < songList.length; i++) {
    const listItem = document.createElement('li');
    const songButton = document.createElement('button');
    songButton.textContent = `Song ${i + 1}`; // Update this to show the actual song details
    songButton.addEventListener('click', () => playSelectedSong(i));
    listItem.appendChild(songButton);
    songListElement.appendChild(listItem);
  }
}
updateSongList();
