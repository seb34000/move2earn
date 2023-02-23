/*
| Developed by Starton
| Filename : claim.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import Starton from './lib/Starton'

import userCheck from './utils/userCheck'

/*
|--------------------------------------------------------------------------
| Lambda Handler (AWS)
|--------------------------------------------------------------------------
*/
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	try {
		const { walletaddress, deviceid, stepcount } = JSON.parse(JSON.stringify(event.headers))
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
				tokenToClaim,
				message: response,
			}),
		}
	} catch (error) {
		return {
			statusCode: 499,
			body: JSON.stringify({
				message: 'Your request is not valid, please check your parameters: walletaddress, deviceid, stepcount',
			}),
		}
	}
}
