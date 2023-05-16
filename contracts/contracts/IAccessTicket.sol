// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

interface IAccessTicket {
    function tokenURI(uint256 tokenId) external view returns (string memory);
    function readTicketPrice() external view returns (uint256);
    function mint() external payable;
    function removeTicket(uint256 tokenId) external;
    function withdrawFunds() external;
}
