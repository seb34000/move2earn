/*
| Developed by Starton
| Filename : userModel.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import mongoose from 'mongoose'

import { typeUser } from '../interface/typeDB'
import userSchema from './userSchema'

const userModel = mongoose.model<typeUser>('User', userSchema)

export default userModel
