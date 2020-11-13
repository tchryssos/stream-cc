import { recognition } from '/src/logic/speech'
import { text, textWrapper } from '/src/logic/elements'

if (recognition.error) {
	console.warn(recognition.error)
	text.textContent = recognition.error
} else {
	recognition.start()
	recognition.onresult = (e) => {
		const resultArray = Array.from(e.results)
		const string = resultArray.map(
			r => r[0].transcript
		).join('')
		text.textContent = string
		textWrapper.scroll(0, textWrapper.scrollHeight)
	}
}