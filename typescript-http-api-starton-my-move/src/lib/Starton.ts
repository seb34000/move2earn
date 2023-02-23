/*
| Developed by Starton
| Filename : Starton.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import axios, { AxiosInstance } from 'axios'

import {
	SMART_CONTRACT_ADDRESS,
	SMART_CONTRACT_NETWORK,
	STARTON_API_KEY,
	STARTON_BASE_URL,
	STARTON_SIGNER_WALLET,
} from './const'

/*
|--------------------------------------------------------------------------
| Gestions of Starton API calls
|--------------------------------------------------------------------------
*/
class Starton {
	private axiosInstance: AxiosInstance

	constructor() {
		this.axiosInstance = axios.create({
			baseURL: STARTON_BASE_URL,
			headers: {
				'x-api-key': STARTON_API_KEY,
			},
		})
	}

	async getClaim(walletAddress: string, numberToken: number) {
		const response = await this.axiosInstance
			.post(`/v3/smart-contract/${SMART_CONTRACT_NETWORK}/${SMART_CONTRACT_ADDRESS}/call`, {
				functionName: 'transfer(address,uint256)',
				params: [walletAddress, (numberToken * 1000000000000000 * 1000).toString()],
				signerWallet: STARTON_SIGNER_WALLET,
				speed: 'average',
			})
			.then((res) => {
				console.log(`statusCode: ${res.status}`)
				return res.data
			})
			.catch((error) => {
				console.log(`Error Starton API call failed`)
				console.log(JSON.stringify(error, null, 2))
				return error
			})
		return response
	}
}

export default Starton
