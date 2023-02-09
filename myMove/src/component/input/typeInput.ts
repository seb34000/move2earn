/*
| Developed by Starton
| Filename : typeInput.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import { ReactNode } from 'react'

export interface customInputProps {
	placeholder: string
	onChangeText: (text: string) => void
	value: string
	icon: ReactNode
}
