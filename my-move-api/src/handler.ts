/*
| Developed by Starton
| Filename : handler.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import { eventType } from './eventType'

module.exports = {
	claim(event: eventType): { statusCode: number; body: string } {
		return {
			statusCode: 200,
			body: JSON.stringify(
				{
					message: 'Go Serverless v3.0! Your function executed successfully!',
					input: event,
				},
				null,
				2,
			),
		}
	},
}
