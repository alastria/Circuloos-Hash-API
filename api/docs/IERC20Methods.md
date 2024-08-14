# IERC20 Methods

[Get the total supply of the token](#get-the-total-supply-of-the-token)
[Get the balance of a specific address](#get-the-balance-of-a-specific-address)
[Get the allowance of an address for another address to transfer tokens](#get-the-allowance-of-an-address-for-another-address-to-transfer-tokens)
[Transfer an amount of tokens from wallet A to B](#transfer-an-amount-of-tokens-from-wallet-a-to-b)

## Get the total supply of the token
Returns the value of tokens in existence.
### Request Endpoint
GET `/totalSupply`
### Request Body
None
### Success Result Example
```json
{
    "message": "Success", // A human readable message of the execution result
    "result": "0" // The result from the blockchain of how many tokens exist in the supply
}
```

## Get the balance of a specific address
Returns the value of tokens owned by account.
### Request Endpoint
GET `/balanceOf`
### Request Body
```json
{
    "args": [
        "0x0000000000000000000000000000000000000000" // The address of the account we are checking.
    ]
}
```
### Result Example
```json
{
    "message": "Success", // A human readable message of the execution result
    "result": "0x12F368383f4100ce8E825dd7D121912a4fDDC2E0" // The result from the blockchain of which wallet owns the token
}
```


## Get the allowance of an address for another address to transfer tokens
Returns the remaining number of tokens that spender will be allowed to spend on behalf of owner through transferFrom. This is zero by default.

This value changes when approve or transferFrom are called.
### Request Endpoint
GET `/allowance`
### Request Body
```json
{
    "args": [
        "0x0000000000000000000000000000000000000000", // The address that owns the tokens
        "0x0000000000000000000000000000000000000000" // The address that is allowed to transfer tokens
    ]
}
```
### Result Example
```json
{
    "message": "Success", // A human readable message of the execution result
    "result": "0" // The amount of tokens that the second address is allowed to transfer
}
```


## Transfer an amount of tokens from wallet A to B
Moves a value amount of tokens from from to to using the allowance mechanism. value is then deducted from the caller’s allowance.

Returns a boolean value indicating whether the operation succeeded.

Emits a transfer event.
### Request Endpoint
POST `/transferFrom`
### Request Body
```json
{
    "args": [
        "0x0000000000000000000000000000000000000000", // Wallet A, where the token is being transferred from
        "0x0000000000000000000000000000000000000000", // Wallet B, where the token is being transferred to
        0 // The amount of tokens that are being transferred
    ]
}
```
### Result Example
```json
{
    "message": "Transaction executed", // A human readable message of the execution result
    "result": {
        "_type": "TransactionReceipt",
        "blockHash": "0x42829c8f39c571153e592ee0f15e06fa4c8e31d410d386f56be0225e7cac5169",
        "blockNumber": 45732913,
        "contractAddress": null,
        "cumulativeGasUsed": "53248",
        "from": "0x12F368383f4100ce8E825dd7D121912a4fDDC2E0",
        "gasPrice": "0",
        "blobGasUsed": null,
        "blobGasPrice": null,
        "gasUsed": "53248",
        "hash": "0xb8617ce9cb9d07e4636e03bf59f80d7754a9144b5365d06db0b4e7eeace095d8",
        "index": 0,
        "logs": [
            {
                "_type": "log",
                "address": "0xb98E40c77beEBe9501aF1A2bDFFad922B6Bb30eE",
                "blockHash": "0x42829c8f39c571153e592ee0f15e06fa4c8e31d410d386f56be0225e7cac5169",
                "blockNumber": 45732913,
                "data": "0x",
                "index": 0,
                "topics": [
                    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                    "0x00000000000000000000000012f368383f4100ce8e825dd7d121912a4fddc2e0",
                    "0x0000000000000000000000000000000000000000000000000000000000000001",
                    "0x0000000000000000000000000000000000000000000000000000000000000000"
                ],
                "transactionHash": "0xb8617ce9cb9d07e4636e03bf59f80d7754a9144b5365d06db0b4e7eeace095d8",
                "transactionIndex": 0
            }
        ],
        "logsBloom": "0x02000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000008000000000000000000040000000000000000000000004000020000000000000000000800000000000000000000000010000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000002000000000000000000000000000000000002000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000100000000000",
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
            "data": "0x42842e0e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
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
                        "nonce": "0x9",
                        "from": "0x12f368383f4100ce8e825dd7d121912a4fddc2e0",
                        "to": "0xb98e40c77beebe9501af1a2bdffad922b6bb30ee",
                        "data": "0x42842e0e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
                    }
                ],
                "id": 57,
                "jsonrpc": "2.0"
            }
        }
    } // This is an Ethers.JS error object. Due to how Ethers.JS works, if you get a CALL_EXCEPTION (code) in estimateGas (action), it means that a smart contract error was thrown.
}
```
