import { recognition } from '/src/logic/speech'
import { text } from '/src/logic/elements'

if (recognition.error) {
	console.warn(recognition.error)
	text.textContent = recognition.error
} else {
	recognition.start()
}
