export const text = document.getElementById('text')
export const textWrapper = document.getElementById('textWrapper')
export const pageSizeWarningText = document.getElementById('pageSizeWarningText')
export const settingsPannel = document.getElementById('settingsPannel')
export const settingsButton = document.getElementById('settingsButton')
export const settingsIcon = document.getElementById('settingsIcon')

settingsButton.addEventListener('click', () => {
	const settingsDisplay = settingsPannel.style.display
		|| getComputedStyle(settingsPannel).display

	if (settingsDisplay === 'none') {
		settingsPannel.style.display = 'block'
		settingsIcon.style.opacity = 1
	} else {
		settingsPannel.style.display = 'none'
		settingsIcon.style.opacity = 0.7
	}
})