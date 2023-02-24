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

- [Install react native dotenv](


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

const colorsDark = { // Colors used in dark mode
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
	view: {
		background: '#333',
		text: '#CAD5E2',
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
	view: {
		background: '#E2E2E2',
		text: '#333',
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

export const HKpermission = { // Here we define the permissions we want to use
	permissions: {
		read: [AppleHealthKit.Constants.Permissions.Steps, AppleHealthKit.Constants.Permissions.StepCount], // We want to read the steps
		write: [AppleHealthKit.Constants.Permissions.Steps, AppleHealthKit.Constants.Permissions.StepCount], // We want to write the steps (not used in this app)
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

export const HKInit = (setResult: (is: boolean) => void) => { // We use this function to initialize the healthkit
	try {
		AppleHealthKit.initHealthKit(HKpermission, (err, results) => { // We call the initHealthKit function with the permission we defined before
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

const HKoptions: HealthInputOptions = { // Here we define the options we want to use
	date: new Date().toISOString(), // We want the steps from today
	includeManuallyAdded: true, // We want to include the manually added steps (just for the debug, but if you want to deploy the app you should set it to false to avoid cheating)
}

export const HKgetStepFromToday = (setResult: (res: number) => void) => { // We use this function to get the steps from today
	try {
		AppleHealthKit.getStepCount(HKoptions, (err, results) => { // We call the getStepCount function from the healthkit with the options we defined before
			if (err) { // If there is an error set the result to -1
				console.error('error getting steps from today: ', err)
				setResult(-1)
			} else { // If there is no error set the result to the value of the steps
				console.log('steps from today: ', results)
				setResult(results.value)
			}
		})
	} catch (error) { // If there is an error set the result to -1
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

export interface customTitleProps { // We define the props of the component
	title: string
}

export default function Title(props: customTitleProps) { // We create the component
	return (
		<Text
			style={{
				fontSize: 20,
				fontWeight: 'bold',
				marginBottom: 10,
				color: getColors().text, // We use the colors defined in the colors.ts file (the colors change depending on the dark mode and light mode)
				shadowColor: getColors().shadow, // We use the colors defined in the colors.ts file (the colors change depending on the dark mode and light mode)
				shadowOffset: {
					width: 0,
					height: 1,
				},
				shadowOpacity: 0.22,
				shadowRadius: 2.22,
				elevation: 3,
			}}
		>
			{props.title} {/* We display the title passed in the props */}
		</Text>
	)
}
```

- Now create a new file called `Button.tsx` in the `src/components/Button.tsx` folder and add the following code: 
  
```javascript
/*
  [./src/components/Button.tsx]
  We use this file to component
  for the button of the app
*/
import React from 'react'

import { Pressable, StyleSheet, Text } from 'react-native'

import { getColors } from '../../lib/utils/colors'

export interface customButtonProps { // We define the props of the component
	title: string
	onPress: () => void
}

export default function Button({title, onPress}: customButtonProps) { // We create the component
	const { background, pressed, text } = getColors().button // We get the colors from the colors.ts file
	return (
		<Pressable
			style={(_props) => [
				styles.wrapperCustom,
				{
					backgroundColor: _props.pressed ? pressed : background, // We change the background color of the button depending on the state of the button
					shadowColor: _props.pressed ? pressed : background, // We change the shadow color of the button depending on the state of the button
				},
			]}
			onPress={onPress}
		>
			<Text style={[{ color: text, textShadowColor: getColors().shadow}, styles.text]}>	{title} {/* We display the title passed in the props */}
			</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	wrapperCustom: {
		borderRadius: 8,
		padding: 10,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
		margin: 5,
	},
	text: {
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
		textShadowOffset: {
			width: 0,
			height: 0,
		},
		textShadowRadius: 0.5,
	},
})
```

- Now create a new file called `Input.tsx` in the `src/components/Input.tsx` folder and add the following code: 
  
```javascript
/*
  [./src/components/Input.tsx]
  We use this file to component
  for the input of the app
*/

import React from 'react'

import { TextInput, View, StyleSheet } from 'react-native'

import { getColors } from '../../lib/utils/colors'

export interface customInputProps { // We define the props of the component
	placeholder: string
	onChangeText: (text: string) => void
	value: string
	icon?: React.ReactNode
}

export const Input = React.forwardRef<TextInput, customInputProps>((props, ref) => { // We create the component
	const inputColor = getColors().input // We get the colors from the colors.ts file
	return (
		<View 
			ref={ref}
			style={[styles.wrapperCustom, { 
				backgroundColor: inputColor.background, 
				shadowColor: getColors().shadow, 
			}]}
		>
			{props.icon}
			<TextInput
				maxLength={42} // We limit the length of the input to 42 characters (size of ethereum address)
				placeholder={props.placeholder}
				onChangeText={props.onChangeText}
				value={props.value}
				style={{width: '90%', padding: 5}}
			/>
		</View>
	)
})

const styles = StyleSheet.create({
	wrapperCustom: {
		paddingTop: 5,
		paddingBottom: 5,
		borderRadius: 25,
		margin: 5,
		width: '90%',
		flexDirection: 'row',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
		alignItems: 'center',
	},
})
```

- Now create a new file called `view.tsx` in the `src/components/view.tsx` folder and add the following code: 
  
```javascript
/*
  [./src/components/view.tsx]
  We use this file to component
  for the view of the app
*/
import React from 'react'

import { View, StyleSheet, Text } from 'react-native'

import { getColors } from '../../lib/utils/colors'

interface customCViewProps { // We define the props of the component
	title: string
}

export default function CView({title}: customCViewProps) { // We create the component
	const { background, text } = getColors().view
	return (
		<View style={[styles.wrapperCustom, 
			{ 
				backgroundColor: background,
				shadowColor: getColors().shadow,
			}
		]}>
			<Text style={[styles.text, 
				{
					color: text,
					textShadowColor: getColors().shadow,
				}
			]}>
				{title}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapperCustom: {
		borderRadius: 8,
		padding: 10,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
		margin: 5,
	},

	text: {
		fontSize: 16,
		textAlign: 'center',
		textShadowOffset: {
			width: 0,
			height: 0,
		},
		textShadowRadius: 0.5,
	},
})
```

- Now install the `react-native-dotenv` package, [see here](https://www.npmjs.com/package/react-native-dotenv) with 

- Now create a new file called `.env` in the `root` folder and add the following code: 
```javascript
API_URL= // Your base api url (here: http://localhost:3000/dev because we use the serverless framework with offline plugin)
API_KEY= // Your api key (you can get it when you launch the serverless framework)
```

- Now create a new file called `api.ts` in the `src/lib/api/api.ts` folder and add the following code: 
  
```typescript
/*
  [./src/lib/api/api.ts]
  We use this file to make the api calls
*/
import axios from 'axios'

import { API_URL, API_KEY } from '@env' // We import the api url and the api key from the .env file

class API {
	private axios: Axios

	constructor() { // We create the axios instance with the api url and the api key
		this.axios = axios.create({
			baseURL: API_URL,
			headers: {
				'Content-Type': 'application/json', 
				'x-api-key': API_KEY,
			}
		})
	}

	public claim async (address: string, deviceId: string, step: number) { // We create the claim function to make the api call
		const response = await this.axios.get('/claim',{ // We make a post request to the /claim endpoint
			headers: { // We add the address, the device id and the step in the headers of the request
				walletaddress: address, 
				deviceid: deviceId,
				step: step,
			},
		}).then((response) => {
			return response
		}).catch((error) => {
			console.log(JSON.stringify(error.response))
			return error
		})
		return response.data
	}

	public eligibility = async (address: string, deviceId: string, stepNumber: number) => { // We create the eligibility function to make the api call
		const response = await this.axios.get('/eligibility',{ // We make a post request to the /eligibility endpoint
			headers: { // We add the address, the device id and the step in the headers of the request
				walletaddress: address, 
				deviceid: deviceId,
				step: stepNumber,
			},
		}).then((response) => {
			return response
		}).catch((error) => {
			console.log(JSON.stringify(error.response))
			return error
		})
		return response.data
	}
}

export default new API() // We export the api instance
```