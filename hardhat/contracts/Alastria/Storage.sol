// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "./structs/Hash.sol";

struct Hash {
  uint256 unixTimestamp;
  string storedHash;
}

contract HashStorage {
    mapping (uint256 => Hash) private storedHashes;
    uint256 public nextIndex;

    function store(Hash calldata hashToStore) public {
        storedHashes[nextIndex] = hashToStore;
        nextIndex++;
    }

    function retrieve() public view returns (Hash memory) {
        require(nextIndex > 0, "No stored hashes");
        return storedHashes[nextIndex - 1];
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