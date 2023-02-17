/*
| Developed by Starton
| Filename : updateUser.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import dbConnectAndExec from '../database/db'
import { typeUser } from '../interface/typeDB'

import userModel from '../model/userModel'

async function updateUser(oldUser: typeUser, token: number) {
	// let tokenClaim = 0
	console.log('updateUser')

	// if (moment(oldUser.dailyToken.date).isSame(moment(), 'day')) {
	// 	console.log('updateUserSameDay')
	// 	tokenClaim = oldUser.dailyToken.token + token
	// 	tokenClaim = tokenClaim > 30 ? 30 : tokenClaim
	// } else {
	// 	console.log('updateUserNotSameDay')
	// 	tokenClaim = token
	// }

	const newUser = {
		address: oldUser.address,
		deviceId: oldUser.deviceId,
		dailyToken: {
			date: new Date().toISOString(),
			tokenClaim: oldUser.dailyToken.tokenClaim + token,
		},
	}

	try {
		const res = await dbConnectAndExec(() =>
			userModel.findOneAndUpdate({ address: oldUser.address, deviceId: oldUser.deviceId }, newUser, {
				new: true,
			}),
		)
		return res
	} catch (err: any) {
		return Error(err)
	}
}

export default updateUser
