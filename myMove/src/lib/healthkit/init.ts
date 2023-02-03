/*
| Developed by Starton
| Filename : init.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import AppleHealthKit from 'react-native-health'

import { HKpermission } from './permission'

// eslint-disable-next-line @typescript-eslint/require-await
export const HKInit = (setResult: (is: boolean) => void) => {
	try {
		AppleHealthKit.initHealthKit(HKpermission, (err, results) => {
			if (err) {
				console.log('error initializing Healthkit: ', err)
				setResult(false)
			} else {
				console.log('Healthkit initialized: ', results)
				setResult(true)
			}
		})
	} catch (error) {
		console.log(JSON.stringify(error, null, 2))
		setResult(false)
	}
}
