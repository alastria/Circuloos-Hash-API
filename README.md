# Circuloos Hash API

This repository has both the smart contracts as well as the REST API for storing and checking hashes for Circuloos.

# API
The API allows Circuloos to talk to the smart contracts as agreed, with a set of endpoints to create and retrieve hashes for each tenant.

Before running the project, please copy `.env-sample` and rename it to `.env`, then modify it to connect to the right node.  
If you have an API Key for our Besu Node, then please place it in this file.

You can start this project locally with either of the following options.

### Node
```sh
npm i
npm start
```

### Docker
```sh
docker build . -t api
docker run -d -p 3000:3000 api
```

Once you have started your project, you can then call any of the documented endpoints at `http://localhost:3000`

The documentation for all of the endpoints in this project is included in the `/api/docs` folder.

## API Web

There's a web access provided with the api with statics that allow retrieving information from the blockchain in a simple user interface.  
You can access the web locally through `http://localhost:3000`.  
You will have to chose a date of the timestamp of when the hashes were created, as well as a tenant.  
Once you have that you can simply press the `Find Hash` buttton and you will get a JSON back in the same format as the input JSON, but with the hashes.  
If the hashes show up empty, and the date is 1970-1-1, then there was no data for that date and tenant.

# Using or updating contracts from hardhat

The hardhat folder has the solidity contracts, as well as a fixed version (v5.0.2) of the OpenZeppelin contracts from their GitHub repository.  
See the README within the hardhat folder for instructions on compiling and deploying.  

If you wish to use the compiled contracts on another project, you will have to get the ABI from the compiled contract in `artifacts/contracts` (for example `artifacts/contracts/Alastria/token/ERC20/ERC20.sol/ERC20MintableAndBurnable.json`), and then put it in the `contracts.json` for that project.  

If you wish to use an already deployed contract, you will have go get that contract's address from the file `addresses-NETWORKNAME.json`, where `NETWORKNAME` is the name of the network that you chose to use with `hardhat.config.ts`, and you will place the contract's address in the project's `.env` file

# Additional information

For the APIs, you can expose custom endpoints with custom functionality by performing the following changes:
1. Edit `src/exposition/api/api.ts`, and add and endpoint with ExpressJS using `app.get` for a `GET` endpoint or `app.post` for a `POST` endpoint.  
Once you have added the endpoint, simply add the business logic for that endpoint on a new controller in `src/exposition/controllers/` by creating a new function, and make sure that this new function is called in `src/exposition/api/api.ts` like the rest of the endpoint implementations there.
