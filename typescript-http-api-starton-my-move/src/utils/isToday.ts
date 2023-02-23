/*
| Developed by Starton
| Filename : isToday.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import moment = require('moment')

/*
|--------------------------------------------------------------------------
| function to check if a date is today
|--------------------------------------------------------------------------
*/
export const isToday = (date: string) => {
	return moment(date).isSame(moment(), 'day')
}
