/*
| Developed by Starton
| Filename : alert.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import { Alert, AlertButton } from 'react-native'

interface customAlertProps {
	title: string
	message: string
	buttons?: AlertButton[]
	options?: object
}

export const alert = (props: customAlertProps) => {
	Alert.alert(props.title, props.message, props.buttons, props.options || {})
}
