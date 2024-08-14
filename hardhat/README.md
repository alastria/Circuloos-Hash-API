# Hardhat instructions

In order to use hardhat to both compile and deploy the smart contracts here you have to do the following steps:

1. Copy `.env.sample` and rename it to `.env`
2. Modify `.env` and set `NETWORK_URL` to a valid network url that allows hardhat to connect to the blockchain node of your chosing
3. Modify `{ContractName}_CONSTRUCTOR_PARAMS` to construct the contracts however you want.
4. Modify `scripts/deploy.ts` to chose which contracts you wish to deploy.
5. Run the following command to install all NPM packages: `npm install`
6. Run the deploy or compile script: `npm run deploy` or `npm run compile`

And you are done!
If you deployed the contracts, the contract addresses will be saved in `addresses-{NETWORK_NAME}.json`
If you compiled, the compiled contracts will be saved in `artifacts/contracts`
