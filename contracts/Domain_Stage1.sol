// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;
import { StringUtils } from "./libraries/StringUtils.sol";
import "hardhat/console.sol";

contract Domain_Stage1 {
    string public tld;
    mapping(string => address) public domains;
    mapping(string => string) public records;
    constructor(string memory _tld){
         tld = _tld;
          console.log("%s name service deployed", _tld);
    }

    function price(string calldata name) public pure returns(uint) {
        uint len = StringUtils.strlen(name);
        if (len == 3) {
            return 5 * 10**17; // 5 MATIC = 5 000 000 000 000 000 000 (18 decimals). We're going with 0.5 Matic cause the faucets don't give a lot
        } else if (len == 4) {
            return 3 * 10**17; // To charge smaller amounts, reduce the decimals. This is 0.3
        } else {
            return 1 * 10**17;
        }
    }

    function register(string calldata name) public payable{
        require(domains[name] == address(0), "Domain is occupied");
        
        uint _price = price(name);

        require(_price <= msg.value, "Not Enough Matic Paid");

        domains[name]=msg.sender;
        console.log("%s has registered a domain!", msg.sender);
    }

    function getAddress(string calldata name) public view returns (address) {
        // Check that the owner is the transaction sender
        return domains[name];
    }

    function setRecord(string calldata name, string calldata record) public {
        // Check that the owner is the transaction sender
        require(domains[name] == msg.sender, "Domain is not registered to you");
        records[name] = record;
        console.log('Record added!!');
    }

    function getRecord(string calldata name) public view returns(string memory) {
        return records[name];
    }

}
