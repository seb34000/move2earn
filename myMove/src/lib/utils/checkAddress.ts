/*
| Developed by Starton
| Filename : Colors.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

export const checkAddress = (address: string) => {
	const regex = /^(0x)?[0-9a-f]{40}$/i
	return regex.test(address)
}
