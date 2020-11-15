import { warningText } from './elements'
import {
	text,
	textWrapper,
	textContainer,
	xIcon,
	checkIcon,
	warningWrapper,
	settingsButton,
} from '/src/logic/elements'

const SpeechRecognition =
	window.SpeechRecognition ||
	window.webkitSpeechRecognition ||
	window.mozSpeechRecognition ||
	window.msSpeechRecognition ||
	window.oSpeechRecognition

export let recognition
let autorestart = true

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
	if (autorestart) {
		recognition.start()
	}
}

const setErrorState = () => {
	autorestart = false
	xIcon.style.display = 'block'
	checkIcon.style.display = 'none'
	textContainer.style.display = 'none'
	settingsButton.style.display = 'none'
	warningWrapper.style.display = 'block'
}
recognition.onerror = (e) => {
	switch (e.error) {
		case 'no-speech':
			break
		case 'not-allowed':
		case 'service-not-allowed':
			setErrorState()
			warningText.textContent = 'Stream CC needs permission to access your microphone. Please enable microphone access and reload this page.'
			break
		default:
			setErrorState()
			warningText.textContent = e.error
	}
}
