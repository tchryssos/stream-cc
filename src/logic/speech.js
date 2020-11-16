import throttle from 'lodash.throttle'

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
	exclamationIcon,
} from '/src/logic/elements'

// START - SPEECH RECOG SETUP - START
const SpeechRecognition =
	window.SpeechRecognition ||
	window.webkitSpeechRecognition ||
	window.mozSpeechRecognition ||
	window.msSpeechRecognition ||
	window.oSpeechRecognition

export let recognition
let autorestart = true
let warning = 0
const warningPulse = 3000
const keepAlivePulse = 1000

const setErrorState = (allowRestart) => {
	autorestart = !!allowRestart
	xIcon.style.display = 'block'
	checkIcon.style.display = 'none'
	textContainer.style.display = 'none'
	settingsButton.style.display = 'none'
	warningWrapper.style.display = 'block'
	settingsPannel.style.display = 'none'
}

const setWarningState = () => {
	checkIcon.style.display = 'none'
	exclamationIcon.style.display = 'block'
	warning = Date.now()
}

if (typeof SpeechRecognition === 'undefined') {
	recognition = { start: () => {} }
	setErrorState()
	warningText.textContent =
		'This browser does not support the Speech Recognition API. Please switch to Google Chrome and try again.'
} else {
	checkIcon.style.display = 'block'
	setInterval(() => {
		if (warning + warningPulse <= Date.now()) {
			checkIcon.style.display = 'block'
			exclamationIcon.style.display = 'none'
		}
	}, warningPulse)
	recognition = new SpeechRecognition()
}
// END - SPEECH RECOG SETUP - END

// START - SPEECH RECOG CONIG - START
recognition.continuous = true

recognition.interimResults = true

recognition.onresult = (e) => {
	const resultArray = Array.from(e.results)
	const string = resultArray.map((r) => r[0].transcript).join('')
	text.textContent = string
	textWrapper.scroll(0, textWrapper.scrollHeight)
}

const onEnd = throttle(() => {
	// Speech Recognition ends every few seconds of inactivity
	// but we want to keep it alive while the user is on the page
	if (autorestart) {
		recognition.start()
	}
}, keepAlivePulse)
recognition.onend = onEnd

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
		default:
			setWarningState()
			console.warn(
				`${e.error}${
					e.message ? `: ${e.message}` : ''
				}. You can report this error with reproduction steps to https://github.com/tchryssos/stream-cc/issues`,
			)
	}
}
// END - SPEECH RECOG CONFIG - END
