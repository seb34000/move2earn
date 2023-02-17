/*
| Developed by Starton
| Filename : claim.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import Starton from './lib/Starton'

import userCheck from './utils/userCheck'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	try {
		console.log(event.headers)
		const { walletaddress, deviceid, stepcount } = JSON.parse(JSON.stringify(event.headers))
		// const user = await userCheck(walletAddress, 'd2c6a5b9-245c-4895-8b84-3d84cdb6819f', stepCount)
		console.log('walletAddress', walletaddress)
		console.log('deviceId', deviceid)
		console.log('stepCount', stepcount)
		const tokenToClaim = await userCheck(walletaddress, deviceid, stepcount)
		if (tokenToClaim instanceof Error) {
			return {
				statusCode: 415,
				body: JSON.stringify({
					message: tokenToClaim.message,
				}),
			}
		}

		const starton = new Starton()
		const response = await starton.getClaim(walletaddress, tokenToClaim)

		return {
			statusCode: 200,
			body: JSON.stringify({
				// message: `Your wallet address is ${walletAddress} and number step is ${numberStep}`,
				tokenToClaim,
				message: response,
			}),
		}
	} catch (error) {
		// console.error(error)
		return {
			statusCode: 499,
			body: JSON.stringify({
				message: error,
			}),
		}
	}
}
