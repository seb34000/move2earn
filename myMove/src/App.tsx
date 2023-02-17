/*
| Developed by Starton
| Filename : App.tsx
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView, ActivityIndicator } from 'react-native'

import { getUniqueId } from 'react-native-device-info'
import { Main } from './view/Main'

import { HKInit } from './lib/healthkit/init'
import { HKgetStepFromToday } from './lib/healthkit/step'
import { getColors } from './lib/utils/colors'

function App(): JSX.Element {
	const colors = getColors()

	const [HKauth, setHKauth] = useState<boolean>(false)
	const [HKstep, setHKstep] = useState<number>(-1)

	const [deviceID, setDeviceID] = useState<string>('')

	const [address, setAddress] = useState<string>('')

	useEffect(() => {
		HKInit(setHKauth)
		HKgetStepFromToday(setHKstep)
		if (deviceID === '') {
			getUniqueId()
				.then((id) => setDeviceID(id))
				.catch((err) => console.log(err))
		}
	}, [])

	const getStep = useCallback(() => {
		HKgetStepFromToday(setHKstep)
	}, [])

	return (
		<SafeAreaView
			style={{
				backgroundColor: colors.background,
				justifyContent: 'center',
				alignItems: 'center',
				flex: 1,
			}}
		>
			{HKauth === true ? (
				<Main getStep={getStep} step={HKstep} setAddress={setAddress} address={address} deviceId={deviceID} />
			) : (
				<ActivityIndicator size="large" color="#0000ff" />
			)}
		</SafeAreaView>
	)
}

export default App
