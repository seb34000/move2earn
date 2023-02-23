/*
| Developed by Starton
| Filename : checkAddress.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import validator from 'validator'

/*
|--------------------------------------------------------------------------
| function to check if a string is a valid Ethereum address
|--------------------------------------------------------------------------
*/
export const isValidAddress = (address: string) => {
	if (validator.isEthereumAddress(address)) {
		return true
	} else {
		return new Error('Invalid address')
	}
}
