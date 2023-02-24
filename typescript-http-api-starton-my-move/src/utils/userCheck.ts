/*
| Developed by Starton
| Filename : userCheck.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import createUser from '../controller/createUser'
import getUser from '../controller/getUser'
import updateUser from '../controller/updateUser'
import { typeUserCheck } from '../interface/typeCheck'
import { typeUser } from '../interface/typeDB'
import { isValidUUID } from './checkUUID'
import { isValidAddress } from './ckeckAddress'
import { getTokenFromStep } from './getTokenFromStep'
import { isToday } from './isToday'

/*
|--------------------------------------------------------------------------
| function to check user datas
|--------------------------------------------------------------------------
*/
function checkUserDatas(userToCheck: typeUserCheck) {
	const checkAddress = isValidAddress(userToCheck.address)
	if (checkAddress instanceof Error) return checkAddress
	const checkUUID = isValidUUID(userToCheck.deviceId)
	if (checkUUID instanceof Error) return checkUUID
	if (userToCheck.stepCount < 0) return new Error('Invalid step number')
	if (userToCheck.stepCount < 1000) return new Error('You need to walk more')
	return true
}

/*
|--------------------------------------------------------------------------
| function to check user token
|--------------------------------------------------------------------------
*/
function checkUserToken(user: typeUser, stepCount: number) {
	if (isToday(user.dailyToken.date)) {
		const tokenAlreadyClaim = user.dailyToken.tokenClaim
		if (tokenAlreadyClaim >= 30) return 0
		else {
			const token = getTokenFromStep(stepCount) - tokenAlreadyClaim
			if (token > 30 - tokenAlreadyClaim) return 30 - tokenAlreadyClaim
			else return token
		}
	} else {
		const token = getTokenFromStep(stepCount)
		if (token > 30) return 30
		else return token
	}
}

/*
|--------------------------------------------------------------------------
| function to check user
|--------------------------------------------------------------------------
*/
async function userCheck(address: string, deviceId: string, stepCount: number) {
	const userToCheck: typeUserCheck = { address, deviceId, stepCount }
	const checkUserDatasRes = checkUserDatas(userToCheck)
	if (checkUserDatasRes instanceof Error) {
		return checkUserDatasRes
	}
	const user: typeUser | undefined = await getUser(userToCheck.address, userToCheck.deviceId)

	if (user) {
		const tokenCanClaim = checkUserToken(user, stepCount)
		if (tokenCanClaim === 0) return new Error('No token to claim')
		const res = await updateUser(user, tokenCanClaim)
		console.log('userCheckResUPDATE', res)
		return tokenCanClaim
	} else {
		const userCreate: typeUser | Error = await createUser(address, deviceId, 0)
		if (userCreate instanceof Error) return userCreate
		const tokenCanClaim = checkUserToken(userCreate, stepCount)
		if (tokenCanClaim === 0) return new Error('No token to claim')
		const res = await updateUser(userCreate, tokenCanClaim)
		console.log('userCheckResCREATE', res)
		return tokenCanClaim
	}
}

export default userCheck
