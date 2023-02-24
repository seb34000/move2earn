/*
| Developed by Starton
| Filename : typeInput.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import { ReactNode } from 'react'

/*
|--------------------------------------------------------------------------
| Interface Componnent Input
|--------------------------------------------------------------------------
*/
export interface customInputProps {
	placeholder: string
	onChangeText: (text: string) => void
	value: string
	icon: ReactNode
}
