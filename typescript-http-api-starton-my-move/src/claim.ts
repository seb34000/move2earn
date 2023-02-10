/*
| Developed by Starton
| Filename : claim.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import Starton from './lib/Starton'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	try {
		const { walletAddress, stepCount } = JSON.parse(JSON.stringify(event.headers))
		const starton = new Starton()
		const response = await starton.getClaim(walletAddress, stepCount)

		// console.log('response', response)
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
