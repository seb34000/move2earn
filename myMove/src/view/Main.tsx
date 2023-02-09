/*
| Developed by Starton
| Filename : Main.tsx
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import React from 'react'

import { StyleSheet, View } from 'react-native'

import Title from '../component/title/Title'
import { Input } from '../component/input/Input'
import Button from '../component/button/Button'

import WalletLogo from '../lib/logo/WalletLogo'
import { checkAddress } from '../lib/utils/checkAddress'
import { alert } from '../lib/utils/alert'

interface MainViewProps {
	getStep: () => void
	step: number
	setAddress: (address: string) => void
	address: string
}

export function Main(props: MainViewProps): JSX.Element {
	const onChangeText = (text: string) => {
		checkAddress(text)
		props.setAddress(text)
	}

	return (
		<View style={styles.wrapper}>
			<Title title="Welcome to my move" />
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<Button title="Get step for today" onPress={props.getStep} />
				<Button
					title={props.step.toString()}
					onPress={() =>
						alert({ title: 'Today step', message: 'This is your number step eligible to claim for today' })
					}
				/>
				<Button
					title={(props.step / 100).toString()}
					onPress={() =>
						alert({
							title: 'Claim Token',
							message: 'This is your number of token eligible to claim for today',
							buttons: [
								{ text: 'Claim', onPress: () => console.log('Claimed'), style: 'cancel' },
								{ text: 'Cancel', onPress: () => console.log('Cancel'), style: 'destructive' },
							],
						})
					}
				/>
			</View>
			<Input
				placeholder="Your wallet address"
				onChangeText={onChangeText}
				value={props.address}
				icon={<WalletLogo />}
			/>
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
