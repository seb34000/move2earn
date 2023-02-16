/*
| Developed by Starton
| Filename : type.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

export interface typeDailyToken {
	date: string
	token: number
}

export interface typeUser {
	address: string
	deviceId: string
	dailyToken: typeDailyToken
}
