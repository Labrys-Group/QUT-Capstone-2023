// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {IAccessTicket} from "./IAccessTicket.sol"; 
using Strings for uint256;

// Author: @Sunelia
contract AccessTicket is ERC721Enumerable, IAccessTicket {
    address payable private _owner;
    uint256 private _totalSupply;
    uint256 private _ticketPrice = 0.000000000000001 ether;

    event TicketMinted(address indexed owner, uint256 tokenId);
    event TicketRemoved(address indexed owner, uint256 tokenId);
    event FundsWithdrawn(address indexed owner, uint256 amount);

    // When deploying the contract, add a contract owner address to receive eth from users
    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        _owner = payable(msg.sender);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, IAccessTicket) returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        string memory baseURI = "http://localhost.com:3000/";
        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, tokenId.toString()))
                : "";
    }

    // Charge every user 0.01 eth per mint and send the money to the contract owner
    function mint() public payable {
        require(msg.value == _ticketPrice, "AccessTicket: Insufficient payment");

        if(msg.sender != 0xe5CA461cF9FF63143dE899d1Af8AE112eF6850CA || msg.sender != 0x2F44998bdfB94F770Ae756ddC9C47C32DEa168df){
            require(
            balanceOf(msg.sender) == 0,
            "AccessTicket: User already owns a token"
        );
        }

        require(
            _totalSupply < 200,
            "AccessTicket: Maximum supply of tokens reached"
        );

        uint256 _tokenId = ++_totalSupply;
        _safeMint(msg.sender, _tokenId);
        _totalSupply++;

        emit TicketMinted(msg.sender, _tokenId);
    }

    // Charge every user 0.01 eth per mint and send the money to the contract owner
    function mintWithVIP(address vip) public payable {
        require(msg.value == _ticketPrice, "AccessTicket: Insufficient payment");

        if(vip != 0xe5CA461cF9FF63143dE899d1Af8AE112eF6850CA || vip != 0x2F44998bdfB94F770Ae756ddC9C47C32DEa168df){
            require(
            balanceOf(vip) == 0,
            "AccessTicket: User already owns a token"
        );
        }

        require(
            _totalSupply < 200,
            "AccessTicket: Maximum supply of tokens reached"
        );

        uint256 _tokenId = ++_totalSupply;
        _safeMint(vip, _tokenId);
        _totalSupply++;

        emit TicketMinted(msg.sender, _tokenId);
    }

    // read the ticket price
    function readTicketPrice() public view returns (uint256) {
        return _ticketPrice;
    }

    // Add a require statement to check if the caller is the ticket owner before removing the ticket
    function removeTicket(uint256 tokenId) public {
        _burn(tokenId);
        emit TicketRemoved(msg.sender, tokenId);
    }

    // Add a function to allow the contract owner to withdraw the funds collected from users
    function withdrawFunds() public {
        require(
            msg.sender == _owner,
            "AccessTicket: caller is not the contract owner"
        );
        uint256 amount = address(this).balance;
        _owner.transfer(amount);
        emit FundsWithdrawn(msg.sender, amount);
    }
}
