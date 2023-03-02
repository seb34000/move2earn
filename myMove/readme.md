# Move2Earn App - by Starton

## Before you start
 - [Complete API Move2earn tutorial](https://github.com/seb34000/move2earn/blob/main/typescript-http-api-starton-my-move/README.md)

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
 - [Complete API Move2earn tutorial](https://github.com/seb34000/move2earn/blob/main/typescript-http-api-starton-my-move/README.md)
 
- [Create a new react native project without expo in this exemple we use typescipt but it's not mandatory](https://reactnative.dev/docs/environment-setup)

- [Install react native health](https://github.com/agencyenterprise/react-native-health)

- [Install react native dotenv](https://github.com/goatandsheep/react-native-dotenv)


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

- Now create a new file called `CView.tsx` in the `src/components/CView.tsx` folder and add the following code: 
  
```javascript
/*
  [./src/components/CView.tsx]
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

- This step is not mandatory, but it's more beautiful. You need to install this library to use SVG in react-native [see here](https://github.com/software-mansion/react-native-svg) Create a new file called `WalletLogo.tsx` in the `./src/lib/logo` folder and add the following code: 

```typescript
/* 
	[./src/lib/logo/WalletLogo.tsx]
  	We use this file to create the wallet logo
*/

import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const WalletLogo = (props: SvgProps) => (
	<Svg
		height={24}
		width={24}
		//@ts-ignore
		xmlns='http://www.w3.org/2000/svg'
		viewBox='-256 -256 1024 1024'
		xmlSpace='preserve'
		stroke='#000'
		strokeWidth={0.005}
		{...props}
	>
		<Path d='M490.442 286.341V120.395c0-22.288-18.132-40.421-40.421-40.421h-35.49L398.97 37.087c-3.319-9.147-10.507-16.167-19.721-19.259-9.202-3.088-19.15-1.829-27.293 3.454l-36.39 23.597-2.827-7.792c-3.319-9.147-10.507-16.167-19.721-19.259-9.202-3.088-19.149-1.829-27.293 3.454L246.66 33.644a8.084 8.084 0 0 0 8.798 13.565l19.065-12.362a15.403 15.403 0 0 1 13.353-1.691c4.514 1.514 8.037 4.957 9.666 9.446l4.102 11.306-123.487 80.078H121.64l106.421-69.01a8.084 8.084 0 1 0-8.798-13.565l-44.148 28.631a8.022 8.022 0 0 0-1.035-.066H61.979C27.803 79.975 0 107.777 0 141.952v302.68c0 28.232 22.969 51.2 51.2 51.2h388.042c28.231 0 51.2-22.968 51.2-51.199v-32.876a8.083 8.083 0 0 0-8.084-8.084 8.084 8.084 0 0 0-8.084 8.084v32.876c0 19.316-15.715 35.032-35.032 35.032H91.621V239.292a8.084 8.084 0 0 0-16.168 0v240.372H51.2c-19.317 0-35.032-15.715-35.032-35.032v-260.74c11.344 12.451 27.68 20.274 45.81 20.274H450.02a40.218 40.218 0 0 0 24.253-8.103v89.157h-153.6c-28.231 0-51.2 22.968-51.2 51.199v.189c0 28.231 22.969 51.199 51.2 51.199h161.684c16.344 0 29.642-13.297 29.642-29.642v-43.303c.001-13.543-9.129-24.994-21.557-28.521zM450.021 96.142c13.372 0 24.253 10.879 24.253 24.253v13.591H434.13l-13.731-37.844h29.622zm0 91.856H61.979c-25.26 0-45.81-20.55-45.81-45.809v-.236c0-25.259 20.55-45.809 45.81-45.809h88.304l-58.359 37.844H72.758a8.084 8.084 0 0 0-8.084 8.084 8.083 8.083 0 0 0 8.084 8.084h269.474a8.084 8.084 0 0 0 8.084-8.084 8.083 8.083 0 0 0-8.084-8.084h-134.36L360.754 34.85a15.402 15.402 0 0 1 13.353-1.691c4.514 1.514 8.037 4.957 9.665 9.446l33.158 91.384h-42.36a8.084 8.084 0 0 0-8.084 8.084 8.083 8.083 0 0 0 8.084 8.084h53.707c.126.003.251.003.376 0h45.621v13.591c0 13.371-10.881 24.25-24.253 24.25zm45.811 170.168c0 7.429-6.044 13.474-13.474 13.474H320.674c-19.317 0-35.032-15.715-35.032-35.031v-.189c0-19.316 15.715-35.032 35.032-35.032h161.761c7.393.042 13.397 6.07 13.397 13.474v43.304z' />
		<Path d='M326.063 312.227c-13.372 0-24.253 10.895-24.253 24.287s10.88 24.287 24.253 24.287 24.253-10.894 24.253-24.287-10.88-24.287-24.253-24.287zm0 32.407c-4.458 0-8.084-3.642-8.084-8.12s3.626-8.12 8.084-8.12 8.084 3.642 8.084 8.12-3.626 8.12-8.084 8.12z' />
	</Svg>
)

export default WalletLogo
```

- Now we create a little function to check if ethereum address is valid or not. Create a new file `checkAddress.ts` in `src/lib/utils` folder and paste the following code:

```javascript
/*
	[./src/lib/utils/checkAddress.ts]
	We use this function to check if ethereum address is valid or not
*/

export const checkAddress = (address: string) => {
	const regex = /^(0x)?[0-9a-f]{40}$/i
	return regex.test(address)
}
```

- It's not mandatory, but we create an encapsulation of the `alert` function, we do this to avoid repeating the same code. Create a new file `alert.ts` in `src/lib/utils` folder and paste the following code:

```javascript
/*
	[./src/lib/utils/alert.ts]
	We use this function to encapsulate the alert function
*/
import { Alert } from 'react-native'

interface customAlertProps {
	title: string
	message: string
	buttons?: AlertButton[]
	options?: object
}

export const alert = (props: customAlertProps) => {
	Alert.alert(props.title, props.message, props.buttons, props.options || {})
}
```

- Now we create a MainView component, this component will be the main view of our application. Create a new file `Main.tsx` in `src/view` folder and paste the following code:

```javascript
/*
	[./src/view/Main.tsx]
	This is the main view of our application
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

interface MainViewProps {
	getStep: () => void
	step: number
	setAddress: (address: string) => void
	address: string
	deviceId: string
}

export function Main(props: MainViewProps): JSX.Element {
	const [token, setToken] = React.useState<number>(0) // State to store the token

	const onChangeText = (text: string) => { // Function call when the user type in the input
		props.setAddress(text)
	}

	const onClickGetStep = async () => { // Function call when the user click on the button
		props.getStep() // We call the getStep function from the parent component
		if (checkAddress(props.address)) { // We check if the address is valid
			const token = await api.eligibility(props.address, props.deviceId, props.step) // We call the eligibility function from the api to get the token from the server
			setToken(token) // We set the token state
		} else {
			setToken(props.step / 1000) // We set the token state
		}
	}

	const claim = async () => { // Function call when the user click on the claim button
		if (!checkAddress(props.address)) { // We check if the address is valid
			alert({
				title: 'Error',
				message: 'Invalid address',
				buttons: [{ text: 'OK', onPress: () => console.log('OK'), style: 'cancel' }],
			})
			return
		}
		if (props.step < 1000) { // We check if the user walk at least 1000 steps
			alert({
				title: 'Claim Token',
				message: 'You need to walk at least 1000 steps to claim your token',
				buttons: [{ text: 'OK', onPress: () => console.log('OK'), style: 'cancel' }],
			})
		} else { // We call the claim function from the api to claim the token
			await api.claim(props.address, props.deviceId, props.step).then((res) => {
				if (res.status === 200) { // If the status is 200, we show a success message
					alert({
						title: 'Claim Token',
						message: 'Your token has been claimed',
						buttons: [{ text: 'OK', onPress: () => console.log('OK'), style: 'cancel' }],
					})
				} else { // If the status is not 200, we show an error message
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
```

- Now we need to use the `react-native-device-info` library to get the device id. [See the documentation to install](https://github.com/react-native-device-info/react-native-device-info)

- Now we can edit the `App.tsx` file to use our new component. Edit the `App.tsx` file and paste the following code:

```javascript
/*
	[./src/App.tsx]
	This is the main component of our application
*/
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { SafeAreaView, ActivityIndicator, ScrollView, KeyboardAvoidingView } from 'react-native'

import { getUniqueId } from 'react-native-device-info'

import { Main } from './view/Main'

import { HKInit } from './lib/healthkit/init'
import { HKgetStepFromToday } from './lib/healthkit/step'
import { getColors } from './lib/utils/colors'

function App(): JSX.Element {
	const colors = getColors() // We get the colors from the getColors function to use Dark Mode or Light Mode

	const [HKauth, setHKauth] = useState<boolean>(false) // State to store the healthkit authorization
	const [HKstep, setHKstep] = useState<number>(-1) // State to store the healthkit step

	const [deviceID, setDeviceID] = useState<string>('') // State to store the device id

	const [address, setAddress] = useState<string>('') // State to store the wallet address

	useEffect(() => { // This useEffect will be call when the component is mounted
		HKInit(setHKauth) // We call the HKInit function to initialize the healthkit
	}, [])

	useEffect(() => { // This useEffect will be call when the HKauth state change or the deviceID state change
		if (HKauth === true) {
			HKgetStepFromToday(setHKstep)
			if (deviceID === '') {
				getUniqueId()
					.then((id) => setDeviceID(id))
					.catch((err) => console.log(err))
			}
		}
	}, [HKauth, deviceID])

	const getStep = useCallback(() => { // This function will be call when the user click on the button to get the step
		HKgetStepFromToday(setHKstep)
	}, [])

	const renderMain = useMemo(() => { // This function is used to render the Main component
		return HKauth ? (
			<Main getStep={getStep} step={HKstep} setAddress={setAddress} address={address} deviceId={deviceID} />
		) : (
			<ActivityIndicator size='large' color='#0000ff' />
		)
	}, [HKauth, HKstep, getStep, address, deviceID])

	return ( // We return the SafeAreaView component with the ScrollView component to have a scrollable view
		<SafeAreaView
			style={{
				backgroundColor: colors.background,
				justifyContent: 'center',
				alignItems: 'center',
				flex: 1,
			}}
		>
			<ScrollView style={{ height: '100%', width: '100%' }} stickyHeaderIndices={[0]}>
				<KeyboardAvoidingView
					style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
					behavior='padding'
				>
					{renderMain} 
				</KeyboardAvoidingView>
			</ScrollView>
		</SafeAreaView>
	)

}

