/*
| Developed by Starton
| Filename : Title.tsx
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import React from 'react'

import { Text } from 'react-native'

import { getColors } from '../../lib/utils/colors'
import { customTitleProps } from './typeTitle'

export default function Title(props: customTitleProps) {
	return (
		<Text
			style={{
				fontSize: 20,
				fontWeight: 'bold',
				marginBottom: 10,
				color: getColors().text,
				shadowColor: getColors().shadow,
				shadowOffset: {
					width: 0,
					height: 1,
				},
				shadowOpacity: 0.22,
				shadowRadius: 2.22,
				elevation: 3,
			}}
		>
			{props.title}
		</Text>
	)
}
