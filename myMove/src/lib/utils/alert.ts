/*
| Developed by Starton
| Filename : alert.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import { Alert } from 'react-native'
import { customAlertProps } from '../../types/typeCustomAlert'

/*
|--------------------------------------------------------------------------
| Custom Alert - This function is used to display a custom alert
|--------------------------------------------------------------------------
*/
export const alert = (props: customAlertProps) => {
	Alert.alert(props.title, props.message, props.buttons, props.options || {})
}
