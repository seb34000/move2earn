/*
| Developed by Starton
| Filename : db.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import mongoose from 'mongoose'

import { MONGODB_URI } from '../lib/const'

mongoose.Promise = Promise

/*
|--------------------------------------------------------------------------
| Execute function
|--------------------------------------------------------------------------
*/
const execute = (db: Promise<typeof mongoose>, fn: () => void) =>
	db.then(fn).finally(async () => {
		await mongoose.disconnect()
	})

/*
|--------------------------------------------------------------------------
| Connect to database and execute function
|--------------------------------------------------------------------------
*/
function dbConnectAndExec(fn: () => void) {
	return execute(mongoose.connect(MONGODB_URI), fn)
}

export default dbConnectAndExec
