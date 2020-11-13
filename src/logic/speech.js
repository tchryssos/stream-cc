const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
export let recognition
if (typeof SpeechRecognition === "undefined") {
	recognition = { error: 'This browser does not support speech recognition. Please open this app in Google Chrome.'}
} else {
	recognition = new SpeechRecognition()
}
recognition.continuous = true
recognition.interimResults = true