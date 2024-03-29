/*
| Developed by Starton
| Filename : checkAddress.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

/*
|--------------------------------------------------------------------------
| Function Check Address
|--------------------------------------------------------------------------
*/
export const checkAddress = (address: string) => {
	const regex = /^(0x)?[0-9a-f]{40}$/i
	return regex.test(address)
}
