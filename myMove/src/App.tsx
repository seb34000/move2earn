/*
| Developed by Starton
| Filename : App.tsx
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { SafeAreaView, ActivityIndicator, ScrollView, KeyboardAvoidingView } from 'react-native'

import { getUniqueId } from 'react-native-device-info'

import { Main } from './view/Main'

import { HKInit } from './lib/healthkit/init'
import { HKgetStepFromToday } from './lib/healthkit/step'
import { getColors } from './lib/utils/colors'

/*
|--------------------------------------------------------------------------
| App - Main Component
|--------------------------------------------------------------------------
*/
function App(): JSX.Element {
	const colors = getColors()

	const [HKauth, setHKauth] = useState<boolean>(false)
	const [HKstep, setHKstep] = useState<number>(-1)

	const [deviceID, setDeviceID] = useState<string>('')

	const [address, setAddress] = useState<string>('')

	useEffect(() => {
		HKInit(setHKauth)
	}, [])

	useEffect(() => {
		if (HKauth === true) {
			HKgetStepFromToday(setHKstep)
			if (deviceID === '') {
				getUniqueId()
					.then((id) => setDeviceID(id))
					.catch((err) => console.log(err))
			}
		}
	}, [HKauth, deviceID])

	const getStep = useCallback(() => {
		HKgetStepFromToday(setHKstep)
	}, [])

	const renderMain = useMemo(() => {
		return HKauth ? (
			<Main getStep={getStep} step={HKstep} setAddress={setAddress} address={address} deviceId={deviceID} />
		) : (
			<ActivityIndicator size='large' color='#0000ff' />
		)
	}, [HKauth, HKstep, getStep, address, deviceID])

	return (
		<SafeAreaView
			style={{
				backgroundColor: colors.background,
				justifyContent: 'center',
				alignItems: 'center',
				flex: 1,
			}}
		>
			<ScrollView style={{ height: '100%', width: '100%' }} stickyHeaderIndices={[0]}>
				<KeyboardAvoidingView
					style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
					behavior='padding'
				>
					{renderMain}
				</KeyboardAvoidingView>
			</ScrollView>
		</SafeAreaView>
	)
}

export default App
