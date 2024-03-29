/*
| Developed by Starton
| Filename : Button.tsx
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import React from 'react'

import { Pressable, StyleSheet, Text } from 'react-native'

import { getColors } from '../../lib/utils/colors'
import { customButtonProps } from './typeButton'

/*
|--------------------------------------------------------------------------
| Component Button
|--------------------------------------------------------------------------
*/
export default function Button({ title, onPress }: customButtonProps) {
	const { background, pressed, text } = getColors().button
	return (
		<Pressable
			style={(_props) => [
				{
					backgroundColor: _props.pressed ? pressed : background,
					shadowColor: getColors().shadow,
				},
				styles.wrapperCustom,
			]}
			onPress={onPress}
		>
			<Text style={[{ color: text, textShadowColor: getColors().shadow }, styles.text]}>{title}</Text>
		</Pressable>
	)
}

/*
|--------------------------------------------------------------------------
| Styles Button
|--------------------------------------------------------------------------
*/
const styles = StyleSheet.create({
	wrapperCustom: {
		borderRadius: 8,
		padding: 10,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
		margin: 5,
	},
	text: {
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
		textShadowOffset: {
			width: 0,
			height: 0,
		},
		textShadowRadius: 0.5,
	},
})
