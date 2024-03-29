/*
| Developed by Starton
| Filename : createUser.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import dbConnectAndExec from '../database/db'
import userModel from '../model/userModel'
import { typeDailyToken } from '../interface/typeDB'

/*
|--------------------------------------------------------------------------
| Controller
|--------------------------------------------------------------------------
*/
async function createUser(address: string, deviceId: string, token: number) {
	const dailyToken: typeDailyToken = {
		date: new Date().toISOString(),
		tokenClaim: token,
	}

	const user = new userModel({
		address: address,
		deviceId: deviceId,
		dailyToken: dailyToken,
	})

	try {
		await user.validate()
	} catch (e) {
		return Error('Invalid user data')
	}

	try {
		const res = await dbConnectAndExec(() => user.save())
		return res
	} catch (err: any) {
		return Error(err)
	}
}

export default createUser
