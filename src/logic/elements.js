export const text = document.getElementById('text')
export const textWrapper = document.getElementById('textWrapper')
export const pageSizeWarningText = document.getElementById(
	'pageSizeWarningText',
)

const getStyle = (element, styleProp) => element.style[styleProp] || getComputedStyle(element)[styleProp]
const getNumericalValue = (text) => {
	const regex = /\d+/g
	return parseInt(text.match(regex)[0])
}

export const settingsPannel = document.getElementById('settingsPannel')
export const settingsButton = document.getElementById('settingsButton')
export const settingsIcon = document.getElementById('settingsIcon')
export const settingsForm = document.getElementById('settingsForm')
const formInputs = Array.from(document.querySelectorAll('.input'))

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
		let onChange
		switch (name) {
			case 'textColor':
				readValue = getStyle(text, 'color')
				onChange = (e) => {
					const v = e.target.value
					text.style.color = v
					formInputs.forEach(i => i.style.color = v)
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
			case 'lineCount': {
				const height = getNumericalValue(getStyle(textWrapper, 'height'))
				const lineHeight = getNumericalValue(getStyle(text, 'line-height'))
				readValue = height / lineHeight
				onChange = (e) => {
					const fontSize = getNumericalValue(getStyle(text, 'font-size'))
					const lineHeight = fontSize + 8
					const height = lineHeight * e.target.value
					textWrapper.style.height = `${height}px`
					text.style.lineHeight = `${lineHeight}px`
				}
				break
			}
			case 'fontSize':
				readValue = getNumericalValue(getStyle(text, 'font-size'))
				break
			default:
				return
		}
		input.value = readValue
		input.addEventListener('change', onChange)
	}
)