/*
| Developed by Starton
| Filename : getUser.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import dbConnectAndExec from '../database/db'

import userModel from '../model/userModel'

/*
|--------------------------------------------------------------------------
| Controller
|--------------------------------------------------------------------------
*/
async function getUser(address: string, deviceId: string) {
	try {
		const res = await dbConnectAndExec(() => userModel.findOne({ address, deviceId }))
		return res
	} catch (err: any) {
		throw new Error(err)
	}
}

export default getUser
