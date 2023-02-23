/*
| Developed by Starton
| Filename : const.ts
| Author : Sebastien Phelip (sebastien@starton.io)
*/

/*
|--------------------------------------------------------------------------
| Starton
|--------------------------------------------------------------------------
*/

export const STARTON_BASE_URL = process.env.STARTON_BASE_URL || 'https://api.starton.io'
export const STARTON_SIGNER_WALLET = process.env.STARTON_SIGNER_WALLET || 'no-signer-wallet'
export const STARTON_API_KEY = process.env.STARTON_API_KEY || 'no-api-key'

/*
|--------------------------------------------------------------------------
| Smart Contract
|--------------------------------------------------------------------------
*/

export const SMART_CONTRACT_NETWORK = process.env.SMART_CONTRACT_NETWORK || 'ropsten'
export const SMART_CONTRACT_ADDRESS = process.env.SMART_CONTRACT_ADDRESS || 'no-smart-contract-address'
export const SMART_CONTRACT_OWNER = process.env.SMART_CONTRACT_OWNER || 'no-smart-contract-owner'

/*
|--------------------------------------------------------------------------
| Database
|--------------------------------------------------------------------------
*/

export const MONGODB_URI = process.env.MONGODB_URI || ''
