/*
| Developed by Starton
| Filename : userSchema.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import mongoose, { Schema } from 'mongoose'
import validator from 'validator'

import { typeUser, typeDailyToken } from './type'

const userSchema: Schema<typeUser> = new mongoose.Schema({
	address: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: (address: string) => {
				return validator.isEthereumAddress(address)
			},
		},
	},

	deviceId: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: (deviceId: string) => {
				return validator.isUUID(deviceId)
			},
		},
	},

	dailyToken: {
		type: Object,
		required: true,
		validate: {
			validator: (dailyToken: typeDailyToken) => {
				return validator.isISO8601(dailyToken.date) && validator.isInt(dailyToken.token.toString())
			},
		},
	},
})

export default userSchema
