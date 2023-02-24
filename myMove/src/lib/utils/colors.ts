/*
| Developed by Starton
| Filename : colors.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import { useColorScheme } from 'react-native'

/*
|--------------------------------------------------------------------------
| Define colors for dark mode
|--------------------------------------------------------------------------
*/
const colorsDark = {
	background: '#242B2E',
	text: '#CAD5E2',
	shadow: '#F1F1F1',
	button: {
		background: '#758283',
		text: '#E2E2E2',
		pressed: '#626A6E',
	},
	input: {
		background: '#333',
		text: '#CAD5E2',
		placeholder: '#758283',
	},
	view: {
		background: '#333',
		text: '#CAD5E2',
	},
}

/*
|--------------------------------------------------------------------------
| Define colors for light mode
|--------------------------------------------------------------------------
*/
const colorsLight = {
	background: '#CAD5E2',
	text: '#242B2E',
	shadow: '#758283',
	button: {
		background: '#F1F1F1',
		text: '#333',
		pressed: '#E6E6E6',
	},
	input: {
		background: '#E2E2E2',
		text: '#333',
		placeholder: '#758283',
	},
	view: {
		background: '#E2E2E2',
		text: '#333',
	},
}

/*
|--------------------------------------------------------------------------
| Function to get colors depending on the color scheme
|--------------------------------------------------------------------------
*/
export const getColors = () => {
	const isDark = useColorScheme() === 'dark'
	return isDark ? colorsDark : colorsLight
}
