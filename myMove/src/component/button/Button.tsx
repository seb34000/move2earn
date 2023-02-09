/*
| Developed by Starton
| Filename : Button.tsx
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import React from 'react'

// eslint-disable-next-line import/namespace
import { Pressable, StyleSheet, Text } from 'react-native'

import { getColors } from '../../lib/asset/colors'
import { customButtonProps } from './typeButton'

export default function Button({ title, onPress }: customButtonProps) {
	const colors = getColors()
	return (
		<Pressable
			style={({ pressed }) => [
				{
					backgroundColor: pressed ? colors.button.pressed : colors.button.background,
					shadowColor: colors.shadow,
				},
				styles.wrapperCustom,
			]}
			onPress={onPress}
		>
			<Text style={[styles.text, { color: colors.text, textShadowColor: colors.shadow }]}>{title}</Text>
		</Pressable>
	)
}

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
		textShadowRadius: 1,
	},
})
