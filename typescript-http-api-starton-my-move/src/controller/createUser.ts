/*
| Developed by Starton
| Filename : createUser.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import dbConnectAndExec from '../database/db'
import userModel from '../model/userModel'
import { typeDailyToken } from '../model/type'

async function createUser(address: string, deviceId: string, token: number) {
	const dailyToken: typeDailyToken = {
		date: new Date().toISOString(),
		token: token,
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
		await dbConnectAndExec(() => user.save())
		return 'User created'
	} catch (err: any) {
		return Error(err)
	}

	// if (user.validateSync()) {
	// 	throw new Error('Invalid user data')
	// }
	// void dbConnectAndExec(() =>
	// 	user
	// 		.save()
	// 		.then(() => {
	// 			console.log('User created')
	// 		})
	// 		.catch((err) => {
	// 			throw new Error(err)
	// 		}),
	// )
}

export default createUser