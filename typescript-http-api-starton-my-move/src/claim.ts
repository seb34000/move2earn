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
		const { walletAddress, stepCount } = JSON.parse(JSON.stringify(event.headers))

		// const user = await userCheck(walletAddress, 'd2c6a5b9-245c-4895-8b84-3d84cdb6819f', stepCount)
		const user = await userCheck(walletAddress, '18d52805-a83f-41ba-8ae7-18ee21ef3ebc', stepCount)
		if (user instanceof Error) {
			return {
				statusCode: 415,
				body: JSON.stringify({
					message: user.message,
				}),
			}
		}


		const starton = new Starton()
		const response = await starton.getClaim(walletAddress, stepCount)

		return {
			statusCode: 200,
			body: JSON.stringify({
				// message: `Your wallet address is ${walletAddress} and number step is ${numberStep}`,
				message: response,
			}),
		}
	} catch (error) {
		// console.error(error)
		return {
			statusCode: 415,
			body: JSON.stringify({
				message: error,
			}),
		}
	}
}
