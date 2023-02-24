/*
| Developed by Starton
| Filename : typeCustomAlert.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import { AlertButton } from 'react-native'

/*
|--------------------------------------------------------------------------
| Interface Componnent Custom Alert
|--------------------------------------------------------------------------
*/
export interface customAlertProps {
	title: string
	message: string
	buttons?: AlertButton[]
	options?: object
}
