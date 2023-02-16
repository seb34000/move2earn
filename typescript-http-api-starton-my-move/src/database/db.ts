/*
| Developed by Starton
| Filename : db.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import mongoose from 'mongoose'

mongoose.Promise = Promise

const MONGODB_URI = process.env.MONGODB_URI || ''

// const execute = (db: Promise<typeof mongoose>, fn: () => Promise<any>) =>
// 	db.then(fn).finally(async () => {
// 		await mongoose.disconnect()
// 	})

// function dbConnectAndExec<T>(query: { fn: () => Promise<T> }): Promise<T> {
// function dbConnectAndExec<T>(fn: () => Query<T | null, Document<T>>): Promise<T | null> {
// 	// return execute(mongoose.connect(MONGODB_URI), fn)
// 	return mongoose
// 		.connect(MONGODB_URI)
// 		.then(() => fn())
// 		.finally(async () => {
// 			await mongoose.disconnect()
// 		})
// 		.catch((err: any) => {
// 			throw new Error(err)
// 		})
// }

const execute = (db: Promise<typeof mongoose>, fn: () => void) =>
	db.then(fn).finally(async () => {
		await mongoose.disconnect()
	})

function dbConnectAndExec(fn: () => void) {
	return execute(mongoose.connect(MONGODB_URI), fn)
}

export default dbConnectAndExec
