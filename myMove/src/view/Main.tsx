/*
| Developed by Starton
| Filename : Main.tsx
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import React from 'react'

import { StyleSheet, View } from 'react-native'

import api from '../lib/api/api'
import WalletLogo from '../lib/logo/WalletLogo'
import { checkAddress } from '../lib/utils/checkAddress'
import { alert } from '../lib/utils/alert'

import CView from '../component/view/CView'
import Title from '../component/title/Title'
import { Input } from '../component/input/Input'
import Button from '../component/button/Button'

import { MainViewProps } from '../types/typeMainView'

/*
|--------------------------------------------------------------------------
| Main View
|--------------------------------------------------------------------------
*/
export function Main(props: MainViewProps): JSX.Element {
	const [token, setToken] = React.useState<number>(0)

	const onChangeText = (text: string) => {
		props.setAddress(text)
	}

	const onClickGetStep = async () => {
		props.getStep()
		if (checkAddress(props.address)) {
			const token = await api.eligibility(props.address, props.deviceId, props.step)
			setToken(token)
		} else {
			setToken(props.step / 1000)
		}
	}

	const claim = async () => {
		if (!checkAddress(props.address)) {
			alert({
				title: 'Error',
				message: 'Invalid address',
				buttons: [{ text: 'OK', onPress: () => console.log('OK'), style: 'cancel' }],
			})
			return
		}
		if (props.step < 1000) {
			alert({
				title: 'Claim Token',
				message: 'You need to walk at least 1000 steps to claim your token',
				buttons: [{ text: 'OK', onPress: () => console.log('OK'), style: 'cancel' }],
			})
		} else {
			await api.claim(props.address, props.deviceId, props.step).then((res) => {
				if (res.status === 200) {
					alert({
						title: 'Claim Token',
						message: 'Your token has been claimed',
						buttons: [{ text: 'OK', onPress: () => console.log('OK'), style: 'cancel' }],
					})
				} else {
					alert({
						title: 'Claim Token',
						message: 'An error occured',
						buttons: [{ text: 'OK', onPress: () => console.log('OK'), style: 'cancel' }],
					})
				}
			})
		}
	}

	return (
		<View style={styles.wrapper}>
			<Title title='Welcome to my move' />
			<Button title='Get step for today' onPress={onClickGetStep} />
			<CView title={props.step.toString() + " today's step"} />
			<CView title={token.toPrecision(1).toString() + ' token eligible to claim'} />
			<Input
				placeholder='Your wallet address'
				onChangeText={onChangeText}
				value={props.address}
				icon={<WalletLogo />}
			/>
			<Button title='Claim token' onPress={claim} />
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
})
