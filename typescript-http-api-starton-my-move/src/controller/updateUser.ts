/*
| Developed by Starton
| Filename : updateUser.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import dbConnectAndExec from '../database/db'
import { typeUser } from '../interface/typeDB'

import userModel from '../model/userModel'

/*
|--------------------------------------------------------------------------
| Controller
|--------------------------------------------------------------------------
*/
async function updateUser(oldUser: typeUser, token: number) {
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
