/*
| Developed by Starton
| Filename : Input.tsx
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import React from 'react'

import { TextInput, View, StyleSheet } from 'react-native'

import { getColors } from '../../lib/utils/colors'
import { customInputProps } from './typeInput'

export const Input = React.forwardRef<TextInput, customInputProps>((props, ref) => {
	const inputColor = getColors().input
	return (
		<View
			ref={ref}
			style={[styles.wrapperCustom, { backgroundColor: inputColor.background, shadowColor: getColors().shadow }]}
		>
			{props.icon}
			<TextInput
				maxLength={42}
				placeholder={props.placeholder}
				onChangeText={props.onChangeText}
				value={props.value}
				style={{ width: '90%', padding: 5 }}
			/>
		</View>
	)
})

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
		alignItems: 'center',
	},
})
