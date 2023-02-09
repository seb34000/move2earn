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
import AppleHealthKit, { HealthKitPermissions } from 'react-native-health'

export const HKpermission = {
	permissions: {
		read: [AppleHealthKit.Constants.Permissions.Steps, AppleHealthKit.Constants.Permissions.StepCount],
		write: [AppleHealthKit.Constants.Permissions.Steps, AppleHealthKit.Constants.Permissions.StepCount],
	},
} as HealthKitPermissions
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
