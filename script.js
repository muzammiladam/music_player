// script.js
const songs = [
    { title: "Song 1", src: "song1.mp3" },
    { title: "Song 2", src: "song2.mp3" },
    { title: "Song 3", src: "song3.mp3" },
    { title: "Song 4", src: "song4.mp3" }
  ];
  
  let currentIndex = 0;
  let isPlaying = false;
  let isShuffling = false;
  let isRepeating = false;
  const audio = new Audio();
  const playPauseBtn = document.getElementById("play-pause");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const progressBar = document.getElementById("progress-bar");
  const volumeControl = document.getElementById("volume");
  const songTitle = document.getElementById("song-title");
  const timeDisplay = document.getElementById("time-display");
  const songList = document.getElementById("song-list");
  const shuffleBtn = document.getElementById("shuffle");
  const repeatBtn = document.getElementById("repeat");
  
  // Load current song
  function loadSong(index) {
    audio.src = songs[index].src;
    songTitle.textContent = songs[index].title;
    progressBar.value = 0;
    audio.load();
    updateSongList();
  }
  
  // Play or pause the music
  function togglePlayPause() {
    if (isPlaying) {
      audio.pause();
      playPauseBtn.textContent = "▶";
    } else {
      audio.play();
      playPauseBtn.textContent = "⏸";
    }
    isPlaying = !isPlaying;
  }
  
  // Update progress bar
  audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    const currentTime = formatTime(audio.currentTime);
    const duration = formatTime(audio.duration);
    timeDisplay.textContent = `${currentTime} / ${duration}`;
  });
  
  // Format time to mm:ss
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes < 10 ? "0" + minutes : minutes}:${secs < 10 ? "0" + secs : secs}`;
  }
  
  // Seek
  progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
  });
  
  // Volume control
  volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
  });
  
  // Next song
  function nextSong() {
    currentIndex = isShuffling ? Math.floor(Math.random() * songs.length) : (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    if (isPlaying) audio.play();
  }
  
  // Previous song
  function prevSong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    if (isPlaying) audio.play();
  }
  
  // Shuffle
  shuffleBtn.addEventListener("click", () => {
    isShuffling = !isShuffling;
    shuffleBtn.style.color = isShuffling ? "#00f2fe" : "white";
    if (isShuffling) nextSong();
  });
  
  // Repeat
  repeatBtn.addEventListener("click", () => {
    isRepeating = !isRepeating;
    repeatBtn.style.color = isRepeating ? "#00f2fe" : "white";
    if (isRepeating) audio.loop = true;
    else audio.loop = false;
  });
  
  // Song click event (from list)
  songList.addEventListener("click", (e) => {
    const index = Array.from(songList.children).indexOf(e.target);
    if (index >= 0) {
      currentIndex = index;
      loadSong(currentIndex);
      if (isPlaying) audio.play();
    }
  });
  
  // Update the song list
  function updateSongList() {
    songList.innerHTML = "";
    songs.forEach((song, index) => {
      const li = document.createElement("li");
      li.textContent = song.title;
      songList.appendChild(li);
    });
  }
  
  // Initial load
  loadSong(currentIndex);
  
  // Attach event listeners
  playPauseBtn.addEventListener("click", togglePlayPause);
  nextBtn.addEventListener("click", nextSong);
  prevBtn.addEventListener("click", prevSong);
  