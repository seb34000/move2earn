/*
| Developed by Starton
| Filename : App.tsx
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import React, { useEffect, useState } from 'react'
// eslint-disable-next-line import/namespace
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme, Button } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'

import { HKInit } from './lib/healthkit/init'
import { HKgetStepFromToday } from './lib/healthkit/step'

function App(): JSX.Element {
	const isDarkMode = useColorScheme() === 'dark'

	const [HKauth, setHKauth] = useState(false)
	const [HKstep, setHKstep] = useState(-1)

	useEffect(() => {
		HKInit(setHKauth)
		getStep()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [HKauth])

	const getStep = () => {
		if (HKauth) {
			console.log('getStep')
			HKgetStepFromToday(setHKstep)
			console.log('HKstep', HKstep)
		}
	}

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	}

	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
			<Button title="Update Step Count" onPress={getStep} />
		</SafeAreaView>
	)
}

// const styles = StyleSheet.create({})

export default App
