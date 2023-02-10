/*
| Developed by Starton
| Filename : Starton.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import axios, { AxiosInstance } from 'axios'
/* eslint-disable @typescript-eslint/restrict-template-expressions */

const STARTON_BASE_URL = process.env.STARTON_BASE_URL
const STARTON_SIGNER_WALLET = process.env.STARTON_SIGNER_WALLET
const STARTON_API_KEY = process.env.STARTON_API_KEY

const SMART_CONTRACT_NETWORK = process.env.SMART_CONTRACT_NETWORK
const SMART_CONTRACT_ADDRESS = process.env.SMART_CONTRACT_ADDRESS

const SMART_CONTRACT_OWNER = process.env.SMART_CONTRACT_OWNER

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
		console.log(`Post to: ${STARTON_BASE_URL}${SMART_CONTRACT_NETWORK}/${SMART_CONTRACT_ADDRESS}/call`)
		console.log(`walletAddress: ${walletAddress}`)
		console.log(`numberToken: ${numberToken}`)
		console.log(`STARTON_SIGNER_WALLET: ${STARTON_SIGNER_WALLET}`)
		console.log(`STARTON_API_KEY: ${STARTON_API_KEY}`)
		console.log(`SMART_CONTRACT_OWNER: ${SMART_CONTRACT_OWNER}`)

		const response = await this.axiosInstance
			.post(`/v3/smart-contract/${SMART_CONTRACT_NETWORK}/${SMART_CONTRACT_ADDRESS}/call`, {
				functionName: 'transfer(address,uint256)',
				params: [walletAddress, numberToken.toString()],
				signerWallet: STARTON_SIGNER_WALLET,
				speed: 'average',
			})
			.then((res) => {
				console.log(`statusCode: ${res.status}`)
				// console.log(res)
				return res.data
			})
			.catch((error) => {
				console.error('error')
				console.error(error.response)
				// console.error(JSON.stringify(error, null, 2))
				return error
			})
		return response
	}
}

export default Starton
