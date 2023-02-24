/*
| Developed by Starton
| Filename : permission.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import AppleHealthKit, { HealthKitPermissions } from 'react-native-health'

/*
|--------------------------------------------------------------------------
| Healthkit Permission
|--------------------------------------------------------------------------
*/
export const HKpermission = {
	permissions: {
		read: [AppleHealthKit.Constants.Permissions.Steps, AppleHealthKit.Constants.Permissions.StepCount],
		write: [AppleHealthKit.Constants.Permissions.Steps, AppleHealthKit.Constants.Permissions.StepCount],
	},
} as HealthKitPermissions
