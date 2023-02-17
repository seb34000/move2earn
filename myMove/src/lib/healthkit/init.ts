/*
| Developed by Starton
| Filename : init.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import AppleHealthKit from 'react-native-health'

import { HKpermission } from './permission'

export const HKInit = (setResult: (is: boolean) => void) => {
	try {
		AppleHealthKit.initHealthKit(HKpermission, (err, results) => {
			if (err) {
				setResult(false)
			} else {
				console.log('Healthkit initialized: ', results)
				setResult(true)
			}
		})
	} catch (error) {
		console.error('error initializing Healthkit: ', error)
		setResult(false)
	}
}
