/*
| Developed by Starton
| Filename : step.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import AppleHealthKit, { HealthInputOptions } from 'react-native-health'

const HKoptions: HealthInputOptions = {
	date: new Date().toISOString(),
	includeManuallyAdded: true, // set to true if you want to include manually added health data in results
}

// eslint-disable-next-line @typescript-eslint/require-await
export const HKgetStepFromToday = (setResult: (res: number) => void) => {
	try {
		AppleHealthKit.getStepCount(HKoptions, (err, results) => {
			if (err) {
				console.log('error getting steps from today: ', err)
				setResult(-1)
			} else {
				console.log('steps from today: ', results)
				setResult(results.value)
			}
		})
	} catch (error) {
		console.log(JSON.stringify(error, null, 2))
		setResult(-1)
	}
}
