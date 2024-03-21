const speechRecognition =
  window.speechRecognition || window.webkitSpeechRecognition;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const record = document.getElementById("record");
const colorBox = document.querySelector(".color");
const diagnostic = document.querySelector(".output");

const recognition = new speechRecognition();

recognition.continuous = false;
recognition.lang = "en";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

function getLocalStream() {
  navigator.mediaDevices
    .getUserMedia({ video: false, audio: true })
    .then((stream) => {
      window.localStream = stream;
    })
    .catch((err) => {
      console.error(`you got an error: ${err}`);
    });
}

record.addEventListener("click", () => {
  getLocalStream();
  recognition.start();
  console.log("Ready to receieve color name");
});
document.addEventListener("keydown", (e) => {
  if (e.key == " ") {
    getLocalStream();
    recognition.start();
    console.log("Ready to receieve color name");
  }
});

recognition.onresult = function (e) {
  const color = e.results[0][0].transcript.replace(".", "");
  document.body.style.backgroundColor = color;
  colorBox.textContent = color;
  console.log(color);
};

recognition.onspeechend = function () {
  recognition.stop();
};

recognition.onnomatch = (event) => {
  diagnostic.textContent = "I didn't recognize that color.";
};

recognition.onerror = (event) => {
  diagnostic.textContent = `Error occurred in recognition: ${event.error}`;
};
