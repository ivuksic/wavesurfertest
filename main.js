import WaveSurfer from "https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js";
import TimelinePlugin from "https://unpkg.com/wavesurfer.js@7/dist/plugins/timeline.esm.js";
import Hover from "https://unpkg.com/wavesurfer.js@7/dist/plugins/hover.esm.js";

let initialZoom = 5;
let currentZoom = initialZoom;

const topTimeline = TimelinePlugin.create({
  height: 24,
  insertPosition: "beforebegin",
  timeInterval: 20,
  primaryLabelInterval: 5,
  secondaryLabelInterval: 1,
  style: {
    fontSize: "20px",
    color: "#2D5B88",
  },
});

const bottomTimline = TimelinePlugin.create({
  height: 15,
  timeInterval: 15,
  primaryLabelInterval: 60,
  style: {
    fontSize: "5px",
    color: "#2d5b88",
  },
});

const hover = Hover.create({
  lineColor: "#2d5b88",
  lineWidth: 2,
  labelBackground: "#555",
  labelColor: "#fff",
  labelSize: "11px",
});

const wavesurfer = WaveSurfer.create({
  container: "#waveform",
  waveColor: "#fff",
  progressColor: "F1EAF5",
  url: "./media/PORCHES. - Airport Terminal.mp3",
  minPxPerSec: initialZoom,
  plugins: [topTimeline, bottomTimline, hover],
  barWidth: 3,
  barGap: 1,
  barRadius: 3,
});

wavesurfer.on("ready", (duration) => {
  var totalTime = wavesurfer.getDuration();
  document.getElementById("time-total").innerText = formatTime(totalTime);
});

const zoomIn = document.querySelector("#zoom-in");
const zoomOut = document.querySelector("#zoom-out");
const reset = document.querySelector("#reset");

reset.addEventListener("click", (e) => {
  wavesurfer.zoom(initialZoom);
  currentZoom = initialZoom;
});

zoomIn.addEventListener("click", (e) => {
  currentZoom = currentZoom * 5;
  wavesurfer.zoom(currentZoom);
});

zoomOut.addEventListener("click", (e) => {
  currentZoom = currentZoom / 5;
  if (currentZoom < initialZoom) {
    currentZoom = initialZoom;
  }
  wavesurfer.zoom(initialZoom);
});

document.querySelector("#waveform").addEventListener("click", (e) => {
  var currentTime = wavesurfer.getCurrentTime(),
    totalTime = wavesurfer.getDuration(),
    remainingTime = totalTime - currentTime;

  document.getElementById("time-current").innerText = formatTime(currentTime);
  document.getElementById("time-remaining").innerText =
    formatTime(remainingTime);
});

wavesurfer.on("audioprocess", function () {
  if (wavesurfer.isPlaying()) {
    var currentTime = wavesurfer.getCurrentTime(),
      totalTime = wavesurfer.getDuration(),
      remainingTime = totalTime - currentTime;

    document.getElementById("time-current").innerText = formatTime(currentTime);
    document.getElementById("time-remaining").innerText =
      formatTime(remainingTime);
  }
});

const playButton = document.querySelector("#play");

wavesurfer.once("decode", () => {
  document.querySelectorAll('input[type="checkbox"]').forEach((input) => {
    input.onchange = (e) => {
      wavesurfer.setOptions({
        [input.value]: e.target.checked,
      });
    };
  });

  const playPauseButton = document.querySelector("#play-pause");

  playPauseButton.addEventListener("click", (e) => {
    if (wavesurfer.isPlaying()) {
      wavesurfer.pause();
      playPauseButton.textContent = "Play";
    } else {
      wavesurfer.play();
      playPauseButton.textContent = "Pause";
    }
  });
});

const stopButton = document.querySelector("#stop");

stopButton.addEventListener("click", () => {
  wavesurfer.stop();
  document.getElementById("time-current").innerText = "0:00";
});

const volumeSlider = document.getElementById("volume-slider");

volumeSlider.addEventListener("input", (e) => {
  wavesurfer.setVolume(e.target.value);
});

function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}
wavesurfer.on("interaction", () => {
  wavesurfer.play();
});
