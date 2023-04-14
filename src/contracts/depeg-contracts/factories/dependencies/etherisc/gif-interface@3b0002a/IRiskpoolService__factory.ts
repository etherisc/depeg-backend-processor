/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IRiskpoolService,
  IRiskpoolServiceInterface,
} from "../../../../dependencies/etherisc/gif-interface@3b0002a/IRiskpoolService";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bundleId",
        type: "uint256",
      },
    ],
    name: "burnBundle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bundleId",
        type: "uint256",
      },
    ],
    name: "closeBundle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bundleId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "processId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "collateralAmount",
        type: "uint256",
      },
    ],
    name: "collateralizePolicy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner_",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "filter_",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "createBundle",
    outputs: [
      {
        internalType: "uint256",
        name: "bundleId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bundleId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "defundBundle",
    outputs: [
      {
        internalType: "uint256",
        name: "netAmount",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bundleId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "fundBundle",
    outputs: [
      {
        internalType: "uint256",
        name: "netAmount",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bundleId",
        type: "uint256",
      },
    ],
    name: "lockBundle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bundleId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "processId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "processPayout",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bundleId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "processId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "processPremium",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "wallet",
        type: "address",
      },
      {
        internalType: "address",
        name: "erc20Token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "collateralization",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "sumOfSumInsuredCap",
        type: "uint256",
      },
    ],
    name: "registerRiskpool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bundleId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "processId",
        type: "bytes32",
      },
    ],
    name: "releasePolicy",
    outputs: [
      {
        internalType: "uint256",
        name: "collateralAmount",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "riskpoolId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxNumberOfActiveBundles",
        type: "uint256",
      },
    ],
    name: "setMaximumNumberOfActiveBundles",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bundleId",
        type: "uint256",
      },
    ],
    name: "unlockBundle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IRiskpoolService__factory {
  static readonly abi = _abi;
  static createInterface(): IRiskpoolServiceInterface {
    return new utils.Interface(_abi) as IRiskpoolServiceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IRiskpoolService {
    return new Contract(address, _abi, signerOrProvider) as IRiskpoolService;
  }
}