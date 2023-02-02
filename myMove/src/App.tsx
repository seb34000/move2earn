/*
| Developed by Starton
| Filename : App.tsx
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import React, { useEffect } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'

import AppleHealthKit, {
	HealthValue,
	HealthKitPermissions,
  } from 'react-native-health'

import permissions from 'lib/permission/permission'

function App(): JSX.Element {
	const isDarkMode = useColorScheme() === 'dark'

	useEffect(() => {

	})

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	}

	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
	},
	highlight: {
		fontWeight: '700',
	},
})

export default App
