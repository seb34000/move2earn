/*
| Developed by Starton
| Filename : Input.tsx
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import React from 'react'

import { TextInput, View, StyleSheet } from 'react-native'

import { getColors } from '../../lib/asset/colors'
import { customInputProps } from './typeInput'

export default function Input({ placeholder, onChangeText, value, icon }: customInputProps) {
	const colors = getColors()
	return (
		<View
			style={[
				styles.wrapperCustom,
				{
					backgroundColor: colors.input.background,
					shadowColor: colors.shadow,
				},
			]}
		>
			{icon}
			<TextInput
				style={[styles.input]}
				maxLength={42}
				placeholder={placeholder}
				onChangeText={onChangeText}
				value={value}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapperCustom: {
		paddingTop: 5,
		paddingBottom: 5,
		borderRadius: 25,
		margin: 5,
		width: '90%',
		flexDirection: 'row',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
	},

	input: {},
})
