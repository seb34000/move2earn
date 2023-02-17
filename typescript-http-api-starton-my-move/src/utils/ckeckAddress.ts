/*
| Developed by Starton
| Filename : checkAddress.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import validator from 'validator'

export const isValidAddress = (address: string) => {
	if (validator.isEthereumAddress(address)) {
		return true
	} else {
		return new Error('Invalid address')
	}
}
