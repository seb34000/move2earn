/*
| Developed by Starton
| Filename : Colors.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import { useColorScheme } from 'react-native'

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
}

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
}

export const getColors = () => {
	const isDark = useColorScheme() === 'dark'
	return isDark ? colorsDark : colorsLight
}
