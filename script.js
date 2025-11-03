const tracks = [
  { title: "Paar Chanaa De", artist: "Coke Studio Season 9", src: "songs_pakistani_Coke Studio Season 9_Paar Chanaa De  (NowSongs.com).mp3" },
  { title: "Kashmir Main Tu Kanyakumari", artist: "KoshalWorld", src: "Kashmir Main Tu Kanyakumari(KoshalWorld.Com).mp3" },
  { title: "Sample Song 1", artist: "Demo Artist", src: "sample1.mp3" },
  { title: "Sample Song 2", artist: "Demo Artist", src: "sample2.mp3" }
];

let currentTrack = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");
const player = document.querySelector(".player");

function loadTrack(index) {
  const track = tracks[index];
  title.textContent = track.title;
  artist.textContent = track.artist;
  audio.src = track.src;
  updatePlaylistHighlight();
}

function updatePlaylistHighlight() {
  playlist.innerHTML = "";
  tracks.forEach((track, i) => {
    const li = document.createElement("li");
    li.textContent = `${track.title} - ${track.artist}`;
    if (i === currentTrack) li.classList.add("active");
    li.onclick = () => {
      currentTrack = i;
      loadTrack(i);
      playSong();
    };
    playlist.appendChild(li);
  });
}

function playSong() {
  audio.play();
  playBtn.textContent = "⏸";
  player.classList.add("playing");
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶️";
  player.classList.remove("playing");
}

playBtn.onclick = () => audio.paused ? playSong() : pauseSong();
prevBtn.onclick = () => {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrack);
  playSong();
};
nextBtn.onclick = () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
  playSong();
};

audio.addEventListener("timeupdate", () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const curMins = Math.floor(audio.currentTime / 60);
  const curSecs = Math.floor(audio.currentTime % 60);
  const durMins = Math.floor(audio.duration / 60) || 0;
  const durSecs = Math.floor(audio.duration % 60) || 0;

  currentTimeEl.textContent = `${curMins}:${curSecs < 10 ? "0" : ""}${curSecs}`;
  durationEl.textContent = `${durMins}:${durSecs < 10 ? "0" : ""}${durSecs}`;
});

progressContainer.onclick = (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
};

volume.oninput = (e) => {
  audio.volume = e.target.value;
};

audio.onended = () => {
  nextBtn.click();
};

// Load and auto-play first track 🎶
loadTrack(currentTrack);
playSong();
