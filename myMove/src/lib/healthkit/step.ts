/*
| Developed by Starton
| Filename : step.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import AppleHealthKit, { HealthInputOptions } from 'react-native-health'

/*
|--------------------------------------------------------------------------
| Options for Healthkit
|--------------------------------------------------------------------------
*/
const HKoptions: HealthInputOptions = {
	date: new Date().toISOString(),
	includeManuallyAdded: true,
}

/*
|--------------------------------------------------------------------------
| Function Get Step Count from Today
|--------------------------------------------------------------------------
*/
export const HKgetStepFromToday = (setResult: (res: number) => void) => {
	try {
		AppleHealthKit.getStepCount(HKoptions, (err, results) => {
			if (err) {
				console.error('error getting steps from today: ', err)
				setResult(-1)
			} else {
				console.log('steps from today: ', results)
				setResult(results.value)
			}
		})
	} catch (error) {
		console.error('error getting steps from today: ', error)
		setResult(-1)
	}
}
