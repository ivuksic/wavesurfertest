window.onload = function () {
  var wavesurfer = WaveSurfer.create({
    container: "#waveform",
  });

  wavesurfer.load(
    "/Users/ivanvuksic/web/wizionary/wavesurfertest/media/PORCHES. - Airport Terminal.mp3"
  );
  wavesurfer.on("play", function () {
    document.querySelector(".play-pause").textContent = "Pause";
  });

  wavesurfer.on("pause", function () {
    document.querySelector(".play-pause").textContent = "Play";
  });
};
