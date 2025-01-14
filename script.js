let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");
let rateInput = document.getElementById("rate");
let pitchInput = document.getElementById("pitch");
let listenBtn = document.getElementById("listenBtn");
let recordBtn = document.getElementById("recordBtn");
let stopRecordBtn = document.getElementById("stopRecordBtn");
let recognition;

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[0];
  voices.forEach(
    (voice, i) => (voiceSelect.options[i] = new Option(voice.name, i))
  );
};

voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
});

listenBtn.addEventListener("click", () => {
  speech.text = document.querySelector("textarea").value;
  window.speechSynthesis.speak(speech);
});

recordBtn.addEventListener("click", startRecording);
stopRecordBtn.addEventListener("click", stopRecording);

function startRecording() {
  recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    const result = event.results[event.results.length - 1][0].transcript;
    document.querySelector("textarea").value = result;
  };

  recognition.onend = () => {
    console.log("Recording ended");
  };

  recognition.start();
}

function stopRecording() {
  if (recognition) {
    recognition.stop();
  }
}