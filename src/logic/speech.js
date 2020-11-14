import { text, textWrapper } from '/src/logic/elements'

const SpeechRecognition =
	window.SpeechRecognition ||
	window.webkitSpeechRecognition ||
	window.mozSpeechRecognition ||
	window.msSpeechRecognition ||
	window.oSpeechRecognition

export let recognition

if (typeof SpeechRecognition === 'undefined') {
	recognition = {
		error:
			'This browser does not support speech recognition. Please open this app in Google Chrome.',
	}
} else {
	recognition = new SpeechRecognition()
}

// Recognition config
recognition.continuous = true

recognition.interimResults = true

recognition.onresult = (e) => {
	const resultArray = Array.from(e.results)
	const string = resultArray.map((r) => r[0].transcript).join('')
	text.textContent = string
	textWrapper.scroll(0, textWrapper.scrollHeight)
}

recognition.onend = () => {
	// Speech Recognition ends every few seconds of inactivity
	// but we want to keep it alive while the user is on the page
	recognition.start()
}
