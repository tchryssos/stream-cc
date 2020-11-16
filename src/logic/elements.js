// START - ELEMENTS - START
const formInputs = Array.from(document.querySelectorAll('.input'))
export const text = document.getElementById('text')
export const textWrapper = document.getElementById('textWrapper')
export const textContainer = document.getElementById('textContainer')

export const warningWrapper = document.getElementById('warningWrapper')
export const warningText = document.getElementById('warningText')

export const settingsPannel = document.getElementById('settingsPannel')
export const settingsButton = document.getElementById('settingsButton')
export const settingsIcon = document.getElementById('settingsIcon')
export const settingsForm = document.getElementById('settingsForm')

export const xIcon = document.querySelector('.xIcon')
export const checkIcon = document.querySelector('.checkIcon')
export const exclamationIcon = document.querySelector('.exclamationIcon')
// END - ELEMENTS - END

// START - UTILS - START
const getStyle = (element, styleProp) =>
	element.style[styleProp] || getComputedStyle(element)[styleProp]

const getNumericalValue = (text) => {
	const regex = /\d+/g
	return parseInt(text.match(regex)[0])
}
// END - UTILS - END

// START - EVENT LISTENERS - START
settingsButton.addEventListener('click', () => {
	const settingsDisplay = getStyle(settingsPannel, 'display')

	if (settingsDisplay === 'none') {
		settingsPannel.style.display = 'block'
		settingsIcon.style.opacity = 1
	} else {
		settingsPannel.style.display = 'none'
		settingsIcon.style.opacity = 0.7
	}
})

formInputs.forEach((input) => {
	const { name } = input
	let readValue
	let onChange
	switch (name) {
		case 'textColor':
			readValue = getStyle(text, 'color')

			onChange = (e) => {
				const v = e.target.value
				text.style.color = v
				formInputs.forEach((i) => (i.style.color = v))
				settingsPannel.style.color = v
			}
			break
		case 'backgroundColor':
			readValue = getStyle(document.body, 'background-color')

			onChange = (e) => {
				const v = e.target.value
				document.body.style.backgroundColor = v
				document.documentElement.style.backgroundColor = v
			}
			break
		case 'fontSize':
			readValue = getNumericalValue(getStyle(text, 'font-size'))

			onChange = (e) => {
				const v = Math.round(e.target.value)

				const height = getNumericalValue(getStyle(textWrapper, 'height'))
				const lineHeight = getNumericalValue(getStyle(text, 'line-height'))
				const lineCount = height / lineHeight

				const nextLineHeight = Math.round(v + 8)
				const nextHeight = Math.round(nextLineHeight * lineCount)

				input.value = v
				text.style.fontSize = `${v}px`
				text.style.lineHeight = `${nextLineHeight}px`
				textWrapper.style.height = `${nextHeight}px`
			}
			break
		case 'lineCount': {
			const height = getNumericalValue(getStyle(textWrapper, 'height'))
			const lineHeight = getNumericalValue(getStyle(text, 'line-height'))
			readValue = height / lineHeight

			onChange = (e) => {
				const v = Math.round(e.target.value)
				const fontSize = getNumericalValue(getStyle(text, 'font-size'))
				const lineHeight = Math.round(fontSize + 8)
				const height = Math.round(lineHeight * v)
				textWrapper.style.height = `${height}px`
				text.style.lineHeight = `${lineHeight}px`
				input.value = v
			}
			break
		}
		default:
			return
	}
	input.value = readValue
	input.addEventListener('change', onChange)
})
// END - EVENT LISTENERS - END
