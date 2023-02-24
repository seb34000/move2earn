/*
| Developed by Starton
| Filename : api.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import axios, { Axios } from 'axios'

import { API_URL, API_KEY } from '@env'

/*
|--------------------------------------------------------------------------
| API Class - This class is used to make API calls to the backend
|--------------------------------------------------------------------------
*/
class API {
	private axios: Axios
	constructor() {
		this.axios = axios.create({
			baseURL: API_URL,
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': API_KEY,
			},
		})
	}

	public claim = async (address: string, deviceId: string, stepNumber: number) => {
		const response = await this.axios
			.get('/claim', {
				headers: {
					walletAddress: address,
					deviceId: deviceId,
					stepCount: stepNumber,
				},
			})
			.then((res) => {
				console.log('claim response: ')
				console.log(res)
				return res
			})
			.catch((err) => {
				console.log('claim error: ')
				console.error(JSON.stringify(err.response, null, 2))
				return err
			})
		return response.data
	}

	public eligibility = async (address: string, deviceId: string, stepNumber: number) => {
		const response = await this.axios
			.get('/eligibility', {
				headers: {
					walletAddress: address,
					deviceId: deviceId,
					stepCount: stepNumber,
				},
			})
			.then((res) => {
				console.log('eligibility response: ')
				console.log(res)
				return res
			})
			.catch((err) => {
				console.log('eligibility error: ')
				console.error(JSON.stringify(err.response, null, 2))
				return err
			})
		return response.data
	}
}

export default new API()
