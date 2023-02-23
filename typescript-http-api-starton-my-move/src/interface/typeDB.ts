/*
| Developed by Starton
| Filename : typeDB.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

/*
|--------------------------------------------------------------------------
| Type Daily Token
|--------------------------------------------------------------------------
*/
export interface typeDailyToken {
	date: string
	tokenClaim: number
}

/*
|--------------------------------------------------------------------------
| Type User
|--------------------------------------------------------------------------
*/
export interface typeUser {
	address: string
	deviceId: string
	dailyToken: typeDailyToken
}
