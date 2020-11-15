import { recognition } from '/src/logic/speech'
import { warningText } from '/src/logic/elements'

if (recognition.error) {
	console.warn(recognition.error)
	warningText.textContent = recognition.error
} else {
	recognition.start()
}
