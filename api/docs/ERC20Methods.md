# ERC20 Methods

[Mint an amount of tokens to a specific wallet](#mint-an-amount-of-tokens-to-a-specific-wallet)
[Burn an amount of tokens from a specific wallet](#burn-an-amount-of-tokens-from-a-specific-wallet)

## Mint an amount of tokens to a specific wallet
Creates a value amount of tokens and assigns them to account, by transferring it from address(0). Relies on the _update mechanism

Emits a transfer event with from set to the zero address.
### Request Endpoint
POST `/mintTo`
### Request Body
```json
{
    "args": [
        "0x0000000000000000000000000000000000000000", // The wallets address that the token will be transferred to
        0 // The token ID that will be minted
    ]
}
```
### Success Result Example
```json
{
    "message": "Transaction executed", // A human readable message of the execution result
    "result": {
        "_type": "TransactionReceipt",
        "blockHash": "0xad365b75f255386817f5c6b54fb6d643bf7aaa9848422bec10e5b41dfa612200",
        "blockNumber": 45739060,
        "contractAddress": null,
        "cumulativeGasUsed": "103027",
        "from": "0x12F368383f4100ce8E825dd7D121912a4fDDC2E0",
        "gasPrice": "0",
        "blobGasUsed": null,
        "blobGasPrice": null,
        "gasUsed": "103027",
        "hash": "0x885cb989610923018ae5b0a8d231eaad1e4c6e29c41db3bb72762d4b58e0285c",
        "index": 0,
        "logs": [
            {
                "_type": "log",
                "address": "0xb98E40c77beEBe9501aF1A2bDFFad922B6Bb30eE",
                "blockHash": "0xad365b75f255386817f5c6b54fb6d643bf7aaa9848422bec10e5b41dfa612200",
                "blockNumber": 45739060,
                "data": "0x",
                "index": 0,
                "topics": [
                    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                    "0x0000000000000000000000000000000000000000000000000000000000000000",
                    "0x0000000000000000000000000000000000000000000000000000000000000001",
                    "0x0000000000000000000000000000000000000000000000000000000000000000"
                ],
                "transactionHash": "0x885cb989610923018ae5b0a8d231eaad1e4c6e29c41db3bb72762d4b58e0285c",
                "transactionIndex": 0
            }
        ],
        "logsBloom": "0x00000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000008000000000000000000040000000000000000000000000000020000000000000000000800000000000000000000000010000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000002000000000000000000000000000000000002000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000000",
        "status": 1,
        "to": "0xb98E40c77beEBe9501aF1A2bDFFad922B6Bb30eE"
    } // This is an Ethers.JS transaction receipt object, which gives us the transaction receipt and all its information, like if we looked up this transaction in a block explorer
}
```
### Error Example
```json
{
    "message": "An error ocurred", // A human readable message of the execution result
    "error": {
        "code": "CALL_EXCEPTION",
        "action": "estimateGas",
        "data": "0x64a0ae920000000000000000000000000000000000000000000000000000000000000000",
        "reason": null,
        "transaction": {
            "to": "0xb98E40c77beEBe9501aF1A2bDFFad922B6Bb30eE",
            "data": "0x449a52f800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
            "from": "0x12F368383f4100ce8E825dd7D121912a4fDDC2E0"
        },
        "invocation": null,
        "revert": null,
        "shortMessage": "execution reverted (unknown custom error)",
        "info": {
            "error": {
                "code": -32000,
                "message": "Execution reverted",
                "data": "0x64a0ae920000000000000000000000000000000000000000000000000000000000000000"
            },
            "payload": {
                "method": "eth_estimateGas",
                "params": [
                    {
                        "from": "0x12f368383f4100ce8e825dd7d121912a4fddc2e0",
                        "to": "0xb98e40c77beebe9501af1a2bdffad922b6bb30ee",
                        "data": "0x449a52f800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
                    }
                ],
                "id": 168,
                "jsonrpc": "2.0"
            }
        }
    } // This is an Ethers.JS error object. Due to how Ethers.JS works, if you get a CALL_EXCEPTION (code) in estimateGas (action), it means that a smart contract error was thrown.
}
```

## Burn an amount of tokens from a specific wallet
Destroys a value amount of tokens from account, lowering the total supply. Relies on the _update mechanism.

Emits a transfer event with to set to the zero address.
### Request Endpoint
POST `/burnFrom`
### Request Body
```json
{
    "args": [
        0 // The token ID that will be burnt
    ]
}
```
### Success Result Example
```json
{
    "message": "Transaction executed", // A human readable message of the execution result
    "result": {
        "_type": "TransactionReceipt",
        "blockHash": "0xace044f3309d95b3d2c60bca265152bd1ac5a7142f51b29fe3e61b6ee8118b6f",
        "blockNumber": 45739133,
        "contractAddress": null,
        "cumulativeGasUsed": "27292",
        "from": "0x12F368383f4100ce8E825dd7D121912a4fDDC2E0",
        "gasPrice": "0",
        "blobGasUsed": null,
        "blobGasPrice": null,
        "gasUsed": "27292",
        "hash": "0x2f55f33d94b5e8bbd1a685f3ae3c7fb10eabdd94a7251ee186ee3be0264acdda",
        "index": 0,
        "logs": [
            {
                "_type": "log",
                "address": "0xb98E40c77beEBe9501aF1A2bDFFad922B6Bb30eE",
                "blockHash": "0xace044f3309d95b3d2c60bca265152bd1ac5a7142f51b29fe3e61b6ee8118b6f",
                "blockNumber": 45739133,
                "data": "0x",
                "index": 0,
                "topics": [
                    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                    "0x0000000000000000000000000000000000000000000000000000000000000001",
                    "0x0000000000000000000000000000000000000000000000000000000000000000",
                    "0x0000000000000000000000000000000000000000000000000000000000000000"
                ],
                "transactionHash": "0x2f55f33d94b5e8bbd1a685f3ae3c7fb10eabdd94a7251ee186ee3be0264acdda",
                "transactionIndex": 0
            }
        ],
        "logsBloom": "0x00000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000008000000000000000000040000000000000000000000000000020000000000000000000800000000000000000000000010000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000002000000000000000000000000000000000002000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000000",
        "status": 1,
        "to": "0xb98E40c77beEBe9501aF1A2bDFFad922B6Bb30eE"
    } // This is an Ethers.JS transaction receipt object, which gives us the transaction receipt and all its information, like if we looked up this transaction in a block explorer
}
```
### Error Example
```json
{
    "message": "An error ocurred", // A human readable message of the execution result
    "error": {
        "code": "CALL_EXCEPTION",
        "action": "estimateGas",
        "data": "0x7e2732890000000000000000000000000000000000000000000000000000000000000000",
        "reason": null,
        "transaction": {
            "to": "0xb98E40c77beEBe9501aF1A2bDFFad922B6Bb30eE",
            "data": "0x42966c680000000000000000000000000000000000000000000000000000000000000000",
            "from": "0x12F368383f4100ce8E825dd7D121912a4fDDC2E0"
        },
        "invocation": null,
        "revert": null,
        "shortMessage": "execution reverted (unknown custom error)",
        "info": {
            "error": {
                "code": -32000,
                "message": "Execution reverted",
                "data": "0x7e2732890000000000000000000000000000000000000000000000000000000000000000"
            },
            "payload": {
                "method": "eth_estimateGas",
                "params": [
                    {
                        "from": "0x12f368383f4100ce8e825dd7d121912a4fddc2e0",
                        "to": "0xb98e40c77beebe9501af1a2bdffad922b6bb30ee",
                        "data": "0x42966c680000000000000000000000000000000000000000000000000000000000000000"
                    }
                ],
                "id": 199,
                "jsonrpc": "2.0"
            }
        }
    } // This is an Ethers.JS error object. Due to how Ethers.JS works, if you get a CALL_EXCEPTION (code) in estimateGas (action), it means that a smart contract error was thrown.
}
```
