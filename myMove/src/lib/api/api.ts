import axios, { Axios } from 'axios'

// eslint-disable-next-line import/no-unresolved
import { API_URL, API_KEY } from '@env'

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
			.get('', {
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
}

export default new API()
