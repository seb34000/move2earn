/*
| Developed by Starton
| Filename : checkUUID.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import validator from 'validator'

export const isValidUUID = (uuid: string) => {
	if (validator.isUUID(uuid)) {
		return true
	} else {
		return new Error('Invalid UUID')
	}
}
