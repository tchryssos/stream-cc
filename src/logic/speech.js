import { warningText } from './elements'
import {
	text,
	textWrapper,
	textContainer,
	xIcon,
	checkIcon,
	warningWrapper,
	settingsButton,
	settingsPannel,
} from '/src/logic/elements'

const SpeechRecognition =
	window.SpeechRecognition ||
	window.webkitSpeechRecognition ||
	window.mozSpeechRecognition ||
	window.msSpeechRecognition ||
	window.oSpeechRecognition

export let recognition
let autorestart = true

const setErrorState = (allowRestart) => {
	autorestart = !!allowRestart
	xIcon.style.display = 'block'
	checkIcon.style.display = 'none'
	textContainer.style.display = 'none'
	settingsButton.style.display = 'none'
	warningWrapper.style.display = 'block'
	settingsPannel.style.display = 'none'
}

if (typeof SpeechRecognition === 'undefined') {
	recognition = { start: () => {} }
	setErrorState()
	warningText.textContent =
		'This browser does not support the Speech Recognition API. Please switch to Google Chrome and try again.'
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

recognition.onerror = (e) => {
	switch (e.error) {
		case 'no-speech':
			break
		case 'not-allowed':
		case 'service-not-allowed':
			setErrorState()
			warningText.textContent =
				'Stream CC needs permission to access your microphone. Please enable microphone access and reload this page.'
			break
		case 'network':
			// @TODO Networking error should lead to a reconnect once network connection is detected
			setErrorState()
			warningText.textContent =
				'Stream CC cannot connect to the internet. Please check your connection and reload the page.'
			break
		default:
			console.warn(`${e.error}. You can report this error with reproduction steps to https://github.com/tchryssos/stream-cc/issues`)
	}
}
