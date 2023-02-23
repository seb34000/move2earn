/*
| Developed by Starton
| Filename : userModel.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import mongoose from 'mongoose'

import { typeUser } from '../interface/typeDB'
import userSchema from './userSchema'

/*
|--------------------------------------------------------------------------
| User Model (Mongoose)
|--------------------------------------------------------------------------
*/
const userModel = mongoose.model<typeUser>('User', userSchema)

export default userModel
