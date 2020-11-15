export const text = document.getElementById('text')
export const textWrapper = document.getElementById('textWrapper')
export const pageSizeWarningText = document.getElementById(
	'pageSizeWarningText',
)

const getStyle = (element, styleProp) => element.style[styleProp] || getComputedStyle(element)[styleProp]
const getNumericalValue = (text) => {
	const regex = /\d+/g
	return text.match(regex)[0]
}

export const settingsPannel = document.getElementById('settingsPannel')
export const settingsButton = document.getElementById('settingsButton')
export const settingsIcon = document.getElementById('settingsIcon')
export const settingsForm = document.getElementById('settingsForm')
const formInputs = Array.from(document.querySelectorAll('.input'))
console.log(formInputs)

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

formInputs.forEach(
	(input) => {
		const { name } = input
		let readValue
		switch (name) {
			case 'textColor':
				readValue = getStyle(text, 'color')
				break
			case 'backgroundColor':
				readValue = getStyle(document.body, 'background-color')
				break
			case 'lineCount': {
				const height = getNumericalValue(getStyle(textWrapper, 'height'))
				const lineHeight = getNumericalValue(getStyle(text, 'line-height'))
				readValue = height / lineHeight
				break
			}
			case 'fontSize':
				readValue = getNumericalValue(getStyle(text, 'font-size'))
				break
			default:
				return
		}
		input.value = readValue
	}
)