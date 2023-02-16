/*
| Developed by Starton
| Filename : userCheck.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import createUser from '../controller/createUser'
import getUser from '../controller/getUser'
import updateUser from '../controller/updateUser'
import { typeUser } from '../model/type'

async function userCheck(address: string, deviceId: string, token: number) {
	const user: typeUser | undefined = await getUser(address, deviceId)

	console.log('userCheck', user)
	if (user) {
		const res = await updateUser(user, token)
		console.log('userCheckRes', res)
		return res
	} else {
		const res = await createUser(address, deviceId, token)
		return res
	}
}

export default userCheck
