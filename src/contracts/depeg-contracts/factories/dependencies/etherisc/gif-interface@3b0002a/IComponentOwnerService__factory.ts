/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IComponentOwnerService,
  IComponentOwnerServiceInterface,
} from "../../../../dependencies/etherisc/gif-interface@3b0002a/IComponentOwnerService";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "archive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IComponent",
        name: "component",
        type: "address",
      },
    ],
    name: "propose",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IComponentOwnerService__factory {
  static readonly abi = _abi;
  static createInterface(): IComponentOwnerServiceInterface {
    return new utils.Interface(_abi) as IComponentOwnerServiceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IComponentOwnerService {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IComponentOwnerService;
  }
}
