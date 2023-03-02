# API For Move2Earn

## Setup

Launch the following commands to install the dependencies:

```
npm install
```

## Usage

**Deploy**

```
$ serverless deploy
```

**Invoke the function locally.**

```
serverless invoke local --function hello
```

**Invoke the function**

```
curl https://xxxxxxxxx.execute-api.us-east-1.amazonaws.com/
```


# Tutorial

## Create a new smart contract with Starton

1. Go to [Starton](https://starton.io) and login you.

2. Click on the `Smart Contract` button.

3. Click on the `+ Smart Contract` button then select `Deploy with template`.

4. Select the Smart Contract `ERC20 Token with fixed supply` and click on the `Deploy` button.

5. Fill the form with the following values:
```yaml
Name: `Name of your contract in Starton` # Example: MyContract
Description: `Description of your contract` # Example: MyContract is a contract for ...
Definitive name: `Name of your contract in blockchain` # Example: MyContract
Definitive symbol: `Symbol of your contract` # Example: MYC
Definitive supply: `Supply of your contract` # Example: for 100 000 000 tokens, you will write 100000000000000000000000000
Initial Owner or Multisig Contract: `Address of the owner of your smart contract` # Example: 0x3dbf7Ad2876309688E53caEa7553F4bf9Cc504C2 <- This is the address of the wallet in Starton (you can find it in the `Wallet` page, you can also set a Metamask wallet, but you will need to call approve function to allow the contract to transfer your tokens)
```

6. Click on the `Next` button. And choose the network where you want to deploy your contract. For this tutorial, we will use the `BNB Chain Testnet` network. (Be careful, you will need some BNB to deploy your contract). And choose your wallet. For this tutorial, we will use the `Wallet in Key Management Systems` and `Default Starton Wallet`.

7. Click on the `Deploy` button. Choose your `Speed` and you can deploy your contract.

8. Now when the transaction is `success`, you can see your contract in the `Smart Contract` page. Copy the `Contract Address` of your contract. Open your Metamask, go to your `Account owner for your contract` and click on the `Add Token` button. Paste the `Contract Address` and click on `Add custom token`. You can now see your token in your Metamask.


## Create a new project with Serverless

### Setup Serverless

1. Create a new serverless project and configure your AWS account, see [Serverless Framework](https://www.serverless.com/framework/docs/getting-started/).

2. For this tutorial, we use `serverless-plugin-typescript`, but it's not mandatory. If you want to use it, see [here](https://www.serverless.com/plugins/serverless-plugin-typescript).

3. You need to install `serverless-dotenv-plugin` to use the `.env` file. See [here](https://www.serverless.com/plugins/serverless-dotenv-plugin).

4. It's not mandatory, but we use `serverless-offline` to test our API locally. See [here](https://www.serverless.com/plugins/serverless-offline). It's very useful to test your API before deploying it, you will save a lot of time.

### Setup the database

1. We use mongodb to store our data. You can use any database you want, but we will use mongodb for this tutorial. You can create a free account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

2. Create a new cluster and choose the free plan. You can choose the region you want.

3. Create a new user, and set your IP address. You can set `Allow access from anywhere` if you want to test your API locally.

4. Go to your Database, click on the `Connect` button, then click on `Connect your application`. Choose the `Node.js` driver and choose your version. Copy the `Connection String` we will use it later.

### Setup the API

1. First, create a new src folder and create a new file `claim.ts` (or claim.js if you don't use typescript) in this folder. This file will contain the code of our API. And you can delete the `handler.js` file.

2. In this file we create a handler function. This function will be called when we call our API. Edit the `claim.ts` file with the following code:
```typescript
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello World'
    })
  }
}
```

3. Now we need to edit the `serverless.yml` file. We need to add the `http` event to our function. Edit the `serverless.yml` file with the following code:
```yaml
org: your-org
app: your-app
service: your-service
frameworkVersion: "3"

provider:
    name: aws
    runtime: nodejs14.x
    timeout: 30
    apiGateway:
        apiKeys:
            - move2earnAPIKey" # You can change the name of your API Key

functions: # Define your functions here
    claim: # Name of your function
        handler: src/claim.handler # Path to your function -> [src folder]/[file name].[function name] this function is used to call the Smart Contract and claim your tokens
        events: # Define your events here
            - http: # Define your http event here
                  path: /claim # Path of your API
                  method: get # Method of your API
                  private: true # If you want to use an API Key

    eligibility: # this fuction is used to get the number of tokens you can claim
        handler: src/eligibility.handler
        events:
            - http:
                  path: /eligibility
                  method: get
                  private: true

plugins: # Define your plugins here
    - serverless-plugin-typescript # If you use typescript
    - serverless-dotenv-plugin # To use the .env file
    - serverless-offline # To test your API locally
```

4. Now we need to create a `.env` file. This file will contain our API Key. Create a new `.env` file in the root of your project and add the following code:
```yaml
STARTON_BASE_URL=https://api.starton.io
STARTON_SIGNER_WALLET= # Your Starton KMS wallet address
STARTON_API_KEY= # Your Starton API Key

SMART_CONTRACT_ADDRESS= # Your smart contract address
SMART_CONTRACT_NETWORK= # Your smart contract network
SMART_CONTRACT_OWNER= # Your smart contract owner address

MONGODB_URI= # Your mongodb connection string (don't forget to replace the password)
```

5. Now into the `src` folder, create a new folder `lib` and create a new file `const.ts` (or const.js if you don't use typescript) in this folder. This file will contain all the constants of our project. Edit the `const.ts` file with the following code:
```typescript
export const STARTON_BASE_URL = process.env.STARTON_BASE_URL
export const STARTON_SIGNER_WALLET = process.env.STARTON_SIGNER_WALLET
export const STARTON_API_KEY = process.env.STARTON_API_KEY

export const SMART_CONTRACT_ADDRESS = process.env.SMART_CONTRACT_ADDRESS
export const SMART_CONTRACT_NETWORK = process.env.SMART_CONTRACT_NETWORK
export const SMART_CONTRACT_OWNER = process.env.SMART_CONTRACT_OWNER

export const MONGODB_URI = process.env.MONGODB_URI
```

6. Now we setup our database, you need to install moogose:
```bash
npm install mongoose
```

7. Now create a new folder `database` into `src` folder and create a new file `db.ts` into `database` folder. This file will contain the code to connect to our database and execute action in database. Edit the `db.ts` file with the following code:
```typescript
import mongoose from 'mongoose'

import { MONGODB_URI } from '../lib/const'

mongoose.Promise = Promise

const execute = (db: Promise<typeof mongoose>, fn: () => void) => 
    db.then(fn).finally(async () => {
        await mongoose.disconnect()
    })

function dbConnectAndExec(fn: () => void) {
    return execute(mongoose.connect(MONGODB_URI), fn)
}

export default dbConnectAndExec
```

8. Now into `src` folder, create `interfaces` folder, and create `typeDB.ts` file. This file will contain the type of our database. Edit the `typeDB.ts` file with the following code:
```typescript
export interface typeDailyToken {
    date: string
    tokenClaim: number
}

export interface typeUser {
    address: string
    deviceId: string
    dailyToken: typeDailyToken
}
```

9. Now install `validator` to check if the data to add in database are valid:
```bash
npm install validator
```

10. Now create a new folder `model` into `src` folder and create a new file `userSchema.ts` into `model` folder. This file will contain the schema of our database. Edit the `userSchema.ts` file with the following code:
```typescript
import mongoose, { Schema } from 'mongoose'
import validator from 'validator'

import { typeUser, typeDailyToken } from '../interfaces/typeDB'

const userSchema: Schema<typeUser> = new mongoose.Schema({
    address: { // Create a field address in our user schema for database
        type: String, // The type of the field is a string
        required: true, // The field is required
        unique: true, // The field must be unique
        validate: { // We use the validator package to check if the address is valid
            validator: (address: string) => {
                return validator.isEthereumAddress(address)
            },
        }
    },
    deviceId: { // Create a field deviceId in our user schema for database
        type: String, // The type of the field is a string
        required: true, // The field is required
        unique: true, // The field must be unique
        validate: { // We use the validator package to check if the deviceId is valid
            validator: (deviceId: string) => {
                return validator.isUUID(deviceId)
            },
        }
    },
    dailyToken: { // Create a field dailyToken in our user schema for database
        type: Object, // The type of the field is an object
        required: true, // The field is required
        validate: { // We use the validator package to check if the dailyToken is valid
            validator: (dailyToken: typeDailyToken) => {
                return validator.isISO8601(dailyToken.date) && validator.isInt(dailyToken.tokenClaim.toString())
            },
        }
    }
})

export default userSchema
```

11. Now create a new file `userModel.ts` into `model` folder. This file will contain the model of our database. Edit the `userModel.ts` file with the following code:
```typescript
import mongoose from 'mongoose'

import { typeUser } from '../interfaces/typeDB'
import userSchema from './userSchema'

const userModel = mongoose.model<typeUser>('user', userSchema) // Create a model with the name user and the schema userSchema from userSchema.ts

export default userModel
```

12. Now create a new folder `controller` into `src` folder and create a new file `createUser.ts` into `controller` folder. This file will contain the code to create a new user in database. Edit the `createUser.ts` file with the following code:
```typescript
import dbConnectAndExec from '../database/db'
import userModel from '../model/userModel'
import { typeDailyToken } from '../interfaces/typeDB'

async function createUser(address: string, deviceId: string, token: number) {
    const dailyToken: typeDailyToken = {
        date: new Date().toISOString()
        tokenClaim: token,
    } // Create a new dailyToken object with the current date and the token to claim

    const user = new userModel({
        address: address,
        deviceId: deviceId,
        dailyToken: dailyToken,
    }) // Create a new user with the address, deviceId and dailyToken claim

    try {
        await user.validate() // Validate the user
    } catch (error) {
        return Error('Invalide user data') // If the user is not valid, we return an error
    }

    try {
        const res = await dbConnectAndExec(() => user.save()) // We try to save the user in database
        return res
    } catch (error: any) {
        return Error(error) // If there is an error, we return it
    }
}

export default createUser
```

13. Now create a new file `getUser.ts` into `controller` folder. This file will contain the code to get a user in database. Edit the `getUser.ts` file with the following code:
```typescript
import dbConnectAndExec from '../database/db'

import userModel from '../model/userModel'

async function getUser(address: string, deviceId: string) {
    try {
        const res = await dbConnectAndExec(() => userModel.findOne({ address, deviceId })) // We try to get the user in database with the address and deviceId
        return res
    } catch (error: any) {
        return Error(error) // If there is an error, we return it
    }
}

export default getUser
```

14. Now create a new file `updateUser.ts` into `controller` folder. This file will contain the code to update a user in database. Edit the `updateUser.ts` file with the following code:
```typescript
import dbConnectAndExec from '../database/db'
import userModel from '../model/userModel'

import { typeUser } from '../interfaces/typeDB'

async function updateUser(oldUser: typeUser, token: number) {
    const newUser = {
        address: oldUser.address,
        deviceId: oldUser.deviceId,
        dailyToken: {
            date: new Date().toISOString(),
            tokenClaim: oldUser.dailyToken.tokenClaim + token,
        }
    } // Create a new user object with the old user data and the new token to claim (the old token + the new token)

    try {
        const res = await dbConnectAndExec(() => 
            userModel.findOneAndUpdate({ 
                address: oldUser.address,
                deviceId: oldUser.deviceId 
            }, newUser, {new: true})
        ) // We try to update the user in database with the new user data and return the new user updated (new: true)
        return res
    } catch (error: any) {
        return Error(error) // If there is an error, we return it
    }
}

export default updateUser
```

15. Now create a new file `typeCheck.ts` into `src/interface/` folder. This file will contain the type of the data we will receive from the frontend. Edit the `typeCheck.ts` file with the following code:
```typescript
export interface typeCheck {
    address: string
    deviceId: string
    stepCount: number
}
```

16. Now create a new folder `utils` into `src` folder and create a new file `checkUUID.ts` into `utils` folder. This file will contain the code to check if the UUID is valid. Edit the `checkUUID.ts` file with the following code:
```typescript
import validator from 'validator'

export const isValidUUID = (uuid: string) => {
    if (validator.isUUID(uuid)) {
        return true // If the UUID is valid, we return true
    } else {
        return new Error('Invalid UUID') // If the UUID is not valid, we return an error
    }
}
```

17. Now create a new file `checkAddress.ts` into `utils` folder. This file will contain the code to check if the address is valid. Edit the `checkAddress.ts` file with the following code:
```typescript
import validator from 'validator'

export const isValidAddress = (address: string) => {
    if (validator.isEthereumAddress(address)) {
        return true // If the address is valid, we return true
    } else {
        return new Error('Invalid address') // If the address is not valid, we return an error
    }
}
```

18. Now create a new file `getTokenFromStep.ts` into `utils` folder. This file will contain the code to get the token from the step count. Edit the `getTokenFromStep.ts` file with the following code:
```typescript
export const getTokenFromStep = (stepCount: number) => {
    return stepCount / 1000 // We return the token from the step count
}
```

19. Now install the `moment` package with the following command: (we will use this package to check if the user can claim his token)
```bash
npm install moment
```

20. Now create a new file `isToday.ts` into `utils` folder. This file will contain the code to check if the user can claim his token. Edit the `isToday.ts` file with the following code:
```typescript
import moment from 'moment'

export const isToday = (date: string) => {
    return moment(date).isSame(new Date(), 'day') // We check if the date is the same day as the current date
}
```

21. Now create a new file `userCheck.ts` into `src/utils/` folder. This file will contain the code to check if the user can claim his token. Edit the `userCheck.ts` file with the following code:
```typescript
import createUser from '../controller/createUser'
import getUser from '../controller/getUser'
import updateUser from '../controller/updateUser'
import { typeUser } from '../interfaces/typeDB'
import { typeUserCheck } from '../interfaces/typeCheck'
import { isValidAddress } from './checkAddress'
import { isValidUUID } from './checkUUID'
import { getTokenFromStep } from './getTokenFromStep'
import { isToday } from './isToday'

function checkUserData(userToCheck: typeUserCheck) {
    const checkAddress = isValidAddress(userToCheck.address) // Check if the address is valid
    if (checkAddress instanceof Error) {
        return checkAddress // If the address is not valid, we return an error
    }
    const checkUUID = isValidUUID(userToCheck.deviceId) // Check if the UUID is valid
    if (checkUUID instanceof Error) {
        return checkUUID // If the UUID is not valid, we return an error
    }
    if (userToCheck.stepCount < 0) {
        return new Error('Invalid step count') // If the step count is negative, we return an error
    }
    if (userToCheck.stepCount < 1000) {
        return new Error('You need to walk more') // If the step count is smaller than 1000, the user can't claim his token
    }
    return true // If the address, UUID and step count are valid, we return true
}

function checkUserToken(user: typeUser, stepCount: number) {
    if (isToday(user.dailyToken.date)) { // Check if the user already claimed token for this day
        const tokenAlreadyClaim = user.dailyToken.tokenClaim // Get the token already claimed for this day by the user
        if (tokenAlreadyClaim >= 30) { // Check if the user already claimed 30 token for this day
            return 0 // If the user already claimed 30 token for this day, he can't claim more token
        } else {
            const token = getTokenFromStep(stepCount) - tokenAlreadyClaim // Get the token from the step count and remove the token already claimed for this day by the user
            if (token > 30 - tokenAlreadyClaim) { // Check if the user can claim more than 30 token for this day
                return 30 - tokenAlreadyClaim // If the user can claim more than 30 token for this day, we return the number of token he can claim
            } else {
                return token // If the user can't claim more than 30 token for this day, we return the number of token he can claim
            }
        }
    } else {
        const token = getTokenFromStep(stepCount) // Get the token from the step count
        if (token > 30) { // Check if the user want to claim more than 30 token for this day
            return 30 // If the user want to claim more than 30 token for this day, we return the max number of token he can claim
        } else {
            return token // If the user want to claim less than 30 token for this day, we return the number of token he can claim
        }
    }
}

async function userCheck(address: string, deviceId: string, stepCount: number) {
    const userToCheck: typeUserCheck = {
        address: address,
        deviceId: deviceId,
        stepCount: stepCount
    }
    const checkUserDataResult = checkUserData(userToCheck) // Check if the user data are valid
    if (checkUserDataResult instanceof Error) {
        return checkUserDataResult // If the user data are not valid, we return an error
    }
    const user: typeUser | undefined = await getUser(address, deviceId) // Get the user from the database

    if (user) { // if user exist
        const tokenCanClaim = (user, stepCount) // check number of token the user can claim
        if (tokenCanClaim === 0) {
            return new Error('No token to claim') // If the user already claimed 30 token for this day, we return an error
        }
        const res = await updateUser(user, tokenCanClaim) // Update the user data in the database
        return res // Return the user data
    } else { // if user doesn't exist
        const userCreate: typeUser | Error = await createUser(address, deviceId, 0) // Create the user in the database
        if (userCreate instanceof Error) {
            return userCreate // If the user can't be created, we return an error
        }
        const tokenCanClaim = checkUserToken(userCreate, stepCount) // check number of token the user can claim
        if (tokenCanClaim === 0) {
            return new Error('No token to claim')
        }
        const res = await updateUser(userCreate, tokenCanClaim) // Update the user data in the database
        return res // Return the user data
    }
}

export default userCheck
```

22. Now install the `axios` package with the following command: (we will use this package to send request to the smart contract)
```bash
npm install axios
```

23. Now we create a new file `Starton.ts` into `src/lib/` folder. This file will contain the code to send request to the smart contract. Edit the `Starton.ts` file with the following code:
```typescript
import axios, { AxiosInstance } from 'axios'

import {
	SMART_CONTRACT_ADDRESS,
	SMART_CONTRACT_NETWORK,
	STARTON_API_KEY,
	STARTON_BASE_URL,
	STARTON_SIGNER_WALLET,
} from './const'

class Starton {
    private axios: AxiosInstance

    constructor() {
        this.axios = axios.create({
            baseURL: STARTON_BASE_URL,
            headers: {
                'x-api-key': STARTON_API_KEY,
            },
        }) // Create an axios instance with the base url and the api key
    }

    async getClaim(walletAddress: string, numberOfToken: number) {
        const res = await this.axios.post(
        `/v3/smart-contract/${SMART_CONTRACT_NETWORK}/${SMART_CONTRACT_ADDRESS}/call`, {
            functionName: 'transfer(address,uint256)',
            params: [walletAddress, (numberOfToken * 1000000000000000 * 1000).toString()],
            signerWallet: STARTON_SIGNER_WALLET,
            speed: 'average',
        }).then((res) => {
            return res.data
        }).catch((err) => {
            return err
        })
        return res
    }
}

export default Starton
```

24. Now we can edit the `src/claim.ts` file with the following code:
```typescript
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import Starton from './lib/Starton'

import userCheck from './utils/userCheck'

export const handler = async (event: APIGatewayProxyEvent): Primise<APIGatewayProxyResult> => {
    try {
        const { walletaddress, deviceid, stepcount } = JSON.parse(JSON.stringify(event.headers)) // Get the wallet address, the device id and the step count from the request headers
        const tokenToClaim = await userCheck(walletaddress, deviceid, stepcount) // Check if the user can claim token and get the number of token he can claim
        if (tokenToClaim instanceof Error) {
            return {
                statusCode: 415,
                body: JSON.stringify({
                    message: tokenToClaim.message,
                }),
            }
        }
        const starton = new Starton() // Create a new instance of the Starton class
        const res = await starton.getClaim(walletaddress, tokenToClaim) // Send a request to the smart contract to claim token

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Token claimed',
                tokenToClaim,
                data: res,
            }),
        }
    } catch (err) {
        return {
            statusCode: 499,
            body: JSON.stringify({
                message: 'Your request is not valid, please check your parameters: walletaddress, deviceid, stepcount',
            }),
        }
    }
}
```

25. Now create a new file into `src/` folder called this file `eligibility.ts` and edit it with the following code:
```typescript
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import getUser from './controller/getUser'
import { typeUser } from './interface/typeDB'
import { getTokenFromStep } from './utils/getTokenFromStep'
import { isToday } from './utils/isToday'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { walletaddress, deviceid, setpcount } = JSON.parse(JSON.stringify(event.headers)) // Get the wallet address and the device id from the request headers

        const user: typeUser | undefined = await getUser(walletaddress, deviceid) // Get the user from the database

        if (user === undefined) { // If user doesn't claim token yet
            const token = getTokenFromStep(setpcount) // Get the number of token the user can claim
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: token >= 30 ? 30 : token, // Send the number of token the user can claim (max 30)
                }),
            }
        } else { // If user already claim token
            if (isToday(user.dailyToken.data)) { // If the user already claim token today
                const tokenAlreadyClaim = user.dailyToken.tokenClaim // Get the number of token the user already claimed today
                if (tokenAlreadyClaim >= 30) { // If the user already claimed 30 token today
                    return {
                        statusCode: 200,
                        body: JSON.stringify({
                            message: 0, // Send 0 token
                        }),
                    }
                } else { // If the user didn't claim 30 token today
                    const token = getTokenFromStep(setpcount) - tokenAlreadyclaim // Get the number of token the user can claim - the number of token the user already claimed today
                    if (token > 30 - tokenAlreadyClaim) {
                        return {
                            statusCode: 200,
                            body: JSON.stringify({
                                message: 30 - tokenAlreadyClaim, // Send the number of token the user can claim (max 30)
                            }),
                        }
                    } else {
                        return {
                            statusCode: 200,
                            body: JSON.stringify({
                                message: token, // Send the number of token the user can claim
                            }),
                        }
                    }
                }
            }
        }
```

26. Now we can test our lambda function. To do that, launch the following command:
```bash
serverless offline # if you have installed serverless offline
serverless deploy # if you haven't installed serverless offline
```

27. After the deployment, you will see the message with the url of your lambda function, and API Key to access it. Open postman and send a request to the lambda function with the following parameters in the headers:
```json
{
    "walletaddress": "0x0", // your wallet address
    "deviceid": "b2542b13-9cbb-4267-a341-eb14485f5ac6", // random device id
    "stepcount": 10000, // for 10 token -> 1 token = 1000 step
}
```

28. If you want do more test you can reset the database if you go to the mongoDB atlas website ->  Database -> Collections -> users -> Click on the trash icon -> drop collection