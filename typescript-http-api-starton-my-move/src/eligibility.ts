/*
| Developed by Starton
| Filename : eligibility.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import getUser from './controller/getUser'
import { typeUser } from './interface/typeDB'
import { getTokenFromStep } from './utils/getTokenFromStep'
import { isToday } from './utils/isToday'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	try {
		const { walletaddress, deviceid, stepcount } = JSON.parse(JSON.stringify(event.headers))

		const user: typeUser | undefined = await getUser(walletaddress, deviceid)

		if (user === undefined) {
			const token = getTokenFromStep(stepcount)
			return {
				statusCode: 200,
				body: JSON.stringify({
					message: token >= 30 ? 30 : token,
				}),
			}
		} else {
			if (isToday(user.dailyToken.date)) {
				const tokenAlreadyClaim = user.dailyToken.tokenClaim
				if (tokenAlreadyClaim >= 30) {
					return {
						statusCode: 200,
						body: JSON.stringify({
							message: 0,
						}),
					}
				} else {
					const token = getTokenFromStep(stepcount) - tokenAlreadyClaim
					if (token > 30 - tokenAlreadyClaim) {
						return {
							statusCode: 200,
							body: JSON.stringify({
								message: 30 - tokenAlreadyClaim,
							}),
						}
					} else {
						return {
							statusCode: 200,
							body: JSON.stringify({
								message: token,
							}),
						}
					}
				}
			}
		}

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: 'Your request is valid',
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
