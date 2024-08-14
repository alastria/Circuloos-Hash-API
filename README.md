# Tokenization Contract API

This repository has 2 ExpressJS API projects, one for ERC20 and the other for ERC721.

# ERC20
This project allows talking to all the OpenZeppelin core implentations of ERC20, as well as the Alastria implementation of ERC20 (which uses OpenZeppelin). The Alastria implementation simply allows to construct an ERC20 token, and exposes the mint and burn methods, but only allows the account that deployed the contract to execute them.

Before running the project, please modify `.env` to connect to the right node.  
If you have an API Key for our Besu Node, then please place it in this file.

You can start this project locally with either of the following options.

### Node
```sh
npm i
npm start
```

### Docker
```sh
docker build . -t erc20api
docker run -d -p 3000:3000 erc20api
```

# ERC721
This project allows talking to all the OpenZeppelin core implementations of ERC721, as well as the Alastria implementation of ERC721 (which uses OpenZeppelin). The Alastria implementation simply allows to construct an ERC721 token, and exposes the mint and burn methods, but only allows the account that deployed the contract to execute them.

Before running the project, please modify `.env` to connect to the right node.  
If you have an API Key for our Besu Node, then please place it in this file.

You can start this project locally with either of the following options.

### Node
```sh
npm i
npm start
```

### Docker
```sh
docker build . -t erc721api
docker run -d -p 3000:3000 erc721api
```

Once you have started your project, you can then call any of the documented endpoints at `http://localhost:3000`

The documentation for all of the endpoints in this project is included in [/ERC721/docs](https://github.com/alastria/Contract-API/blob/main/ERC721/docs)

# Using or updating contracts from hardhat in ERC721 or ERC20 APIs.

The hardhat folder has the solidity contracts, as well as a fixed version (v5.0.2) of the OpenZeppelin contracts from their GitHub repository.  
See the README within the hardhat folder for instructions on compiling and deploying.  

If you wish to use the compiled contracts on another project (for example for our ERC20 or ERC721 projects), you will have to get the ABI from the compiled contract in `artifacts/contracts` (for example `artifacts/contracts/Alastria/token/ERC20/ERC20.sol/ERC20MintableAndBurnable.json`), and then put it in the `contracts.json` for that project.  

If you wish to use an already deployed contract, you will have go get that contract's address from the file `addresses-NETWORKNAME.json`, where `NETWORKNAME` is the name of the network that you chose to use with `hardhat.config.ts`, and you will place the contract's address in the project's `.env` file

# Additional information

For the APIs, you can expose custom endpoints with custom functionality by performing the following changes:
1. Edit `src/exposition/api/api.ts`, and add and endpoint with ExpressJS using `app.get` for a `GET` endpoint or `app.post` for a `POST` endpoint.  
Once you have added the endpoint, simply add the business logic for that endpoint in `src/exposition/controllers/contract.controller.ts` by creating a new function, and make sure that this new function is called in `src/exposition/api/api.ts` like the rest of the endpoint implementations there.
