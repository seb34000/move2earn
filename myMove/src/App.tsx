/*
| Developed by Starton
| Filename : App.tsx
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import React, { useCallback, useEffect, useState } from 'react'
// eslint-disable-next-line import/namespace
import { SafeAreaView, ActivityIndicator } from 'react-native'

import Input from './component/input/Input'
import Button from './component/button/Button'

import { HKInit } from './lib/healthkit/init'
import { HKgetStepFromToday } from './lib/healthkit/step'
import { getColors } from './lib/asset/colors'

import WalletLogo from './lib/logo/WalletLogo'

function App(): JSX.Element {
	const colors = getColors()

	const [HKauth, setHKauth] = useState(false)
	const [HKstep, setHKstep] = useState(-1)

	const [address, setAddress] = useState('')

	useEffect(() => {
		HKInit(setHKauth)
	}, [])

	const getStep = useCallback(() => {
		console.log('getStep')
		HKgetStepFromToday(setHKstep)
		console.log('HKstep', HKstep)
	}, [HKstep])

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
				<>
					<Button title="Get step for today" onPress={getStep} />
					<Input
						placeholder="Your wallet address"
						onChangeText={setAddress}
						value={address}
						icon={<WalletLogo />}
					/>
				</>
			) : (
				<ActivityIndicator size="large" color="#0000ff" />
			)}
		</SafeAreaView>
	)
}

export default App
