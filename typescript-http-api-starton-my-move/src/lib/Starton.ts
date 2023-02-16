/*
| Developed by Starton
| Filename : Starton.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import axios, { AxiosInstance } from 'axios'

const STARTON_BASE_URL = process.env.STARTON_BASE_URL || 'https://api.starton.io'
const STARTON_SIGNER_WALLET = process.env.STARTON_SIGNER_WALLET || 'no-signer-wallet'
const STARTON_API_KEY = process.env.STARTON_API_KEY || 'no-api-key'

const SMART_CONTRACT_NETWORK = process.env.SMART_CONTRACT_NETWORK || 'ropsten'
const SMART_CONTRACT_ADDRESS = process.env.SMART_CONTRACT_ADDRESS || 'no-smart-contract-address'

// const SMART_CONTRACT_OWNER = process.env.SMART_CONTRACT_OWNER || 'no-smart-contract-owner'

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
				params: [walletAddress, numberToken.toString()],
				signerWallet: STARTON_SIGNER_WALLET,
				speed: 'average',
			})
			.then((res) => {
				console.log(`statusCode: ${res.status}`)
				return res.data
			})
			.catch((error) => {
				console.error('error')
				console.error(error.response)
				return error
			})
		return response
	}
}

export default Starton
