/*
| Developed by Starton
| Filename : typeMainView.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

/*
|--------------------------------------------------------------------------
| Interface Main View 
|--------------------------------------------------------------------------
*/
export interface MainViewProps {
	getStep: () => void
	step: number
	setAddress: (address: string) => void
	address: string
	deviceId: string
}
