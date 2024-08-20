# API Endpoints

[Create new hashes for a set of tenants](#create-new-hashes-for-a-set-of-tenants)
[Get the latest hash stored for a tenant](#get-the-latest-hash-stored-for-a-tenant)
[Get the stored hash count for a tenant](#get-the-stored-hash-count-for-a-tenant)
[Get a specific hash by index for a tenant](#get-a-specific-hash-by-index-for-a-tenant)

## Create new hashes for a set of tenants
Creates new hashes for all the tenants passed on the request body so they can be stored in blockchain.
### Request Endpoint
POST `/createHashes`
### Request Body
```json
{
    "dateTime": "2024-07-10T23:59:59.999999",
    "orion@public.attributes": "8f0aeb2f86e3da8210cc2471e3ed3151c6972bd829029b407cca253cae4bf7df",
    "orion@public.entities": "e03c92b1bff307c23d67017428e69cdf09854df578b271479e11a9807c8d0246",
    "orion_circuloos_demo@public.attributes": "2d57b6ad076fbc35d04e25e5493fc1f5559f75e05af3f712abe22948c9307281",
    "orion_circuloos_demo@public.entities": "9c88317839e609305f73b101b465d98e6dbf437e0062c1f18dc3ae3bdb16aa04",
    "orion_demo_smart_contact@public.attributes": "87faa0f82a1c7e513aa53b03dde18394bd2a7452717f1fbee1828d01f0d762c6",
    "orion_demo_smart_contact@public.entities": "dc7a00e5869b9654ba70b37abdf63dad9ba097126ee062d8b87efd8f075b0860"
}
```
### Success Result Example
```json
{
    "message": "Created the hashes for each tenant.", // A human readable response of what happened
    "result": {
        "dateTime": "2024-07-10T23:59:59.999999", // The date provided for the hashes, or the current date as the server was called.
        "addresses": { // The contract addresses for each tenant
            "orion@public.attributes": "0x508605b53b4aDd930e54C6D167Ee40d23ED3Ba30",
            "orion@public.entities": "0x6F3feC073853Dd22598cd0a1634e1de3E0bC575D",
            "orion_circuloos_demo@public.attributes": "0x5278d691080bae115522d01c94080e9360B20e25",
            "orion_circuloos_demo@public.entities": "0x856Bd123423Dc889413dc7Ae5D3D9af976BEfeE3",
            "orion_demo_smart_contact@public.attributes": "0x041eBEE539Ea66AEA00aeFAD453d7Dc439709717",
            "orion_demo_smart_contact@public.entities": "0xded771778241433fdFa5b2e78c394A90c33cCFb7"
        },
        "hashes": { // The hashes successfully stored for each tenant
            "orion@public.attributes": "8f0aeb2f86e3da8210cc2471e3ed3151c6972bd829029b407cca253cae4bf7df",
            "orion@public.entities": "e03c92b1bff307c23d67017428e69cdf09854df578b271479e11a9807c8d0246",
            "orion_circuloos_demo@public.attributes": "2d57b6ad076fbc35d04e25e5493fc1f5559f75e05af3f712abe22948c9307281",
            "orion_circuloos_demo@public.entities": "9c88317839e609305f73b101b465d98e6dbf437e0062c1f18dc3ae3bdb16aa04",
            "orion_demo_smart_contact@public.attributes": "87faa0f82a1c7e513aa53b03dde18394bd2a7452717f1fbee1828d01f0d762c6",
            "orion_demo_smart_contact@public.entities": "dc7a00e5869b9654ba70b37abdf63dad9ba097126ee062d8b87efd8f075b0860"
        }
    }
}
```

## Get the latest hash stored for a tenant
Retrieves the latest hash stored for a specific tenant
### Request Endpoint
GET `/getHash/:tenantId`
### Request Body
None
### Success Result Example
```json
{
    "message": "Retrieved the latest hash for the tenant orion_circuloos_demo@public.attributes.", // A message explaining execution result
    "result": {
        "unixTimestamp": "1720648799999", // The unix timestamp for the stored hash
        "storedHash": "2d57b6ad076fbc35d04e25e5493fc1f5559f75e05af3f712abe22948c9307281" // The stored hash
    }
}
```
### Error Example
```json
{
    "message": "Tenant exampleTenant@exampleTable does not have a registered contract."
}
```

## Get the stored hash count for a tenant
Retrieves the number of stored hashes for a specific tenant
### Request Endpoint
GET `/countHashes/:tenantId`
### Request Body
None
### Success Result Example
```json
{
    "message": "Retrieved the hash count for the tenant orion_circuloos_demo@public.attributes.", // A message explaining execution result
    "result": "1" // The count of hashes stored for this tenant
}
```
### Error Example
```json
{
    "message": "Tenant exampleTenant@exampleTable does not have a registered contract."
}
```

## Get a specific hash by index for a tenant
Retrieves a specific hash by the index in all the stored hashes for a specific tenant
### Request Endpoint
GET `/getHash/:tenantId/:index`
### Request Body
None
### Success Result Example
```json
{
    "message": "Retrieved the hash at index 0 for the tenant orion_circuloos_demo@public.attributes.", // A message explaining execution result
    "result": {
        "unixTimestamp": "1720648799999", // The unix timestamp for the stored hash
        "storedHash": "2d57b6ad076fbc35d04e25e5493fc1f5559f75e05af3f712abe22948c9307281" // The stored hash
    }
}
```
### Error Example
```json
{
    "message": "Tenant exampleTenant@exampleTable does not have a registered contract."
}
```