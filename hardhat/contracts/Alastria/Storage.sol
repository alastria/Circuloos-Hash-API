// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

struct Hash {
  uint256 unixTimestamp;
  string storedHash;
}

contract HashStorage {
    mapping (uint256 => Hash) public storedHashes;
    uint256 latestTimestamp;

    function store(Hash calldata hashToStore) public {
        storedHashes[hashToStore.unixTimestamp] = hashToStore;
        latestTimestamp = hashToStore.unixTimestamp;
    }

    function retrieve() public view returns (Hash memory) {
        require(latestTimestamp > 0, "No stored hashes");
        return storedHashes[latestTimestamp];
    }
}

contract HashStorageFactory {
    mapping (string => HashStorage) public deployedContracts;

    function createStorage(string calldata tenantId) public returns (HashStorage) {
        HashStorage hashStorage = new HashStorage();
        deployedContracts[tenantId] = hashStorage;
        return hashStorage;
    }
}