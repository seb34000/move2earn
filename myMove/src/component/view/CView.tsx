/*
| Developed by Starton
| Filename : CView.tsx
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import React from 'react'

import { View, StyleSheet, Text } from 'react-native'

import { getColors } from '../../lib/utils/colors'
import { customCViewProps } from './typeCView'

/*
|--------------------------------------------------------------------------
| Component CView
|--------------------------------------------------------------------------
*/
export default function CView({ title }: customCViewProps) {
	const { background, text } = getColors().view
	return (
		<View
			style={[
				styles.wrapperCustom,
				{
					backgroundColor: background,
					shadowColor: getColors().shadow,
				},
			]}
		>
			<Text
				style={[
					styles.text,
					{
						color: text,
						textShadowColor: getColors().shadow,
					},
				]}
			>
				{title}
			</Text>
		</View>
	)
}

/*
|--------------------------------------------------------------------------
| Style CView
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
		// fontWeight: 'bold',
		textAlign: 'center',
		textShadowOffset: {
			width: 0,
			height: 0,
		},
		textShadowRadius: 0.5,
	},
})
