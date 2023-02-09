# Move2Earn App - by Starton

## Before you start
 - [Complete API Move2earn tutorial](https://github.com/seb34000/move2earn/blob/main/my-move-api/README.md)

## Launching the app
### Install dependencies
```bash
  npm install
  cd ios && pod install && cd ..
```
### Run the app

```bash
  yarn start
```


## Tutorial
### Setup the project
- [Complete API Move2earn tutorial](https://github.com/seb34000/move2earn/blob/main/my-move-api/README.md)

- [Create a new react native project without expo in this exemple we use typescipt but it's not mandatory](https://reactnative.dev/docs/environment-setup)

- [Install react native health](https://github.com/agencyenterprise/react-native-health)


### Let's code

- First create a new folder in the root of the project called `src` and move inside the `App.tsx` file to this folder.

- Now in the file called `index.js` in the root of the project, update the import of the `App.tsx` file to `./src/App.tsx`

```javascript
import App from './src/App'
```

- Now create a new file called `colors.ts` in the `src/lib/utils/colors.ts` folder and add the following code: 
  
```typescript
/*
  [./src/lib/utils/colors.ts]
  We use this file to manage all colors of the app, 
  with the dark mode and light mode
*/
import { useColorScheme } from 'react-native'

const colorsDark = {
	background: '#242B2E',
	text: '#CAD5E2',
	shadow: '#F1F1F1',
	button: {
		background: '#758283',
		text: '#E2E2E2',
		pressed: '#626A6E',
	},
	input: {
		background: '#333',
		text: '#CAD5E2',
		placeholder: '#758283',
	},
}

const colorsLight = {
	background: '#CAD5E2',
	text: '#242B2E',
	shadow: '#758283',
	button: {
		background: '#F1F1F1',
		text: '#333',
		pressed: '#E6E6E6',
	},
	input: {
		background: '#E2E2E2',
		text: '#333',
		placeholder: '#758283',
	},
}

export const getColors = () => {
	const isDark = useColorScheme() === 'dark'
	return isDark ? colorsDark : colorsLight
}
```

- Now create a file called `permission.ts` in the `src/lib/healthkit/permission.ts` folder and add the following code: 
  
```typescript
/*
  [./src/lib/healthkit/permission.ts]
  We use this file to manage
  the healthkit permission
*/
import AppleHealthKit, { HealthKitPermissions } from 'react-native-health'

export const HKpermission = {
	permissions: {
		read: [AppleHealthKit.Constants.Permissions.Steps, AppleHealthKit.Constants.Permissions.StepCount],
		write: [AppleHealthKit.Constants.Permissions.Steps, AppleHealthKit.Constants.Permissions.StepCount],
	},
} as HealthKitPermissions
```

- Now create a new file called `init.ts` in the `src/lib/healthkit/init.ts` folder and add the following code: 
  
```typescript
/*
  [./src/lib/healthkit/init.ts]
  We use this file to manage
  the healthkit initialization
*/
import AppleHealthKit from 'react-native-health'

import { HKpermission } from './permission'

export const HKInit = (setResult: (is: boolean) => void) => {
	try {
		AppleHealthKit.initHealthKit(HKpermission, (err, results) => {
			if (err) {
				console.error('error initializing Healthkit: ', err)
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
```

- Now create a new file called `steps.ts` in the `src/lib/healthkit/steps.ts` folder and add the following code: 
  
```typescript
/*
  [./src/lib/healthkit/steps.ts]
  We use this file to get the steps
  from the healthkit
*/
import AppleHealthKit, { HealthInputOptions } from 'react-native-health'

const HKoptions: HealthInputOptions = {
	date: new Date().toISOString(),
	includeManuallyAdded: true,
}

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
```

- Now create a new file called `Title.tsx` in the `src/components/Title.tsx` folder and add the following code: 
  
```typescript
/*
  [./src/components/Title.tsx]
  We use this file to component
  for the title of the app
*/

import React from 'react'

import { Text } from 'react-native'

import { getColors } from '../../lib/utils/colors'

export interface customTitleProps {
	title: string
}

export default function Title(props: customTitleProps) {
	return (
		<Text
			style={{
				fontSize: 20,
				fontWeight: 'bold',
				marginBottom: 10,
				color: getColors().text,
				shadowColor: getColors().shadow,
				shadowOffset: {
					width: 0,
					height: 1,
				},
				shadowOpacity: 0.22,
				shadowRadius: 2.22,
				elevation: 3,
			}}
		>
			{props.title}
		</Text>
	)
}
```
