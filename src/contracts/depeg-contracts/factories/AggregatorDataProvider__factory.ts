/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  AggregatorDataProvider,
  AggregatorDataProviderInterface,
} from "../AggregatorDataProvider";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "aggregatorAddressMainnet",
        type: "address",
      },
      {
        internalType: "address",
        name: "aggregatorAddressGoerli",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deviationLevel",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "heartbeatSeconds",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "heartbeatMarginSeconds",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "testDescription",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "testDecimals",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "testVersion",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "int256",
        name: "current",
        type: "int256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "roundId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "updatedAt",
        type: "uint256",
      },
    ],
    name: "AnswerUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "roundId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "startedBy",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startedAt",
        type: "uint256",
      },
    ],
    name: "NewRound",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "GANACHE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "GANACHE2",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "GOERLI",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAINNET",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MUMBAI",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "answer",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "startedAt",
        type: "uint256",
      },
    ],
    name: "addRoundData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "deviation",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "roundId",
        type: "uint256",
      },
    ],
    name: "getAnswer",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getChainlinkAggregatorAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint80",
        name: "_roundId",
        type: "uint80",
      },
    ],
    name: "getRoundData",
    outputs: [
      {
        internalType: "uint80",
        name: "roundId",
        type: "uint80",
      },
      {
        internalType: "int256",
        name: "answer",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "startedAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "updatedAt",
        type: "uint256",
      },
      {
        internalType: "uint80",
        name: "answeredInRound",
        type: "uint80",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "roundId",
        type: "uint256",
      },
    ],
    name: "getTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "heartbeat",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "heartbeatMargin",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "price1",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price2",
        type: "uint256",
      },
    ],
    name: "isExceedingDeviation",
    outputs: [
      {
        internalType: "bool",
        name: "isExceeding",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "time1",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "time2",
        type: "uint256",
      },
    ],
    name: "isExceedingHeartbeat",
    outputs: [
      {
        internalType: "bool",
        name: "isExceeding",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isMainnet",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isTestnet",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestAnswer",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRound",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      {
        internalType: "uint80",
        name: "roundId",
        type: "uint80",
      },
      {
        internalType: "int256",
        name: "answer",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "startedAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "updatedAt",
        type: "uint256",
      },
      {
        internalType: "uint80",
        name: "answeredInRound",
        type: "uint80",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint80",
        name: "roundId",
        type: "uint80",
      },
      {
        internalType: "int256",
        name: "answer",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "startedAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "updatedAt",
        type: "uint256",
      },
      {
        internalType: "uint80",
        name: "answeredInRound",
        type: "uint80",
      },
    ],
    name: "setRoundData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200162d3803806200162d8339810160408190526200003491620002d8565b6200003f3362000177565b62000049620001c7565b15620000a65746600114156200007a57600180546001600160a01b0319166001600160a01b038a16179055620000a0565b4660051415620000a057600180546001600160a01b0319166001600160a01b0389161790555b62000124565b620000b0620001de565b15620000ce57600180546001600160a01b0319163017905562000124565b60405162461bcd60e51b815260206004820152602160248201527f4552524f523a4144502d3031303a434841494e5f4e4f545f535550504f5254456044820152601560fa1b606482015260840160405180910390fd5b82516200013990600590602086019062000203565b506006805460ff191660ff9390931692909217909155600755506002929092556003556004555050600a80546001600160501b031916905562000464565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60006001461480620001d95750600546145b905090565b6000610539461480620001f257506104d246145b80620001d957505046620138811490565b828054620002119062000411565b90600052602060002090601f01602090048101928262000235576000855562000280565b82601f106200025057805160ff191683800117855562000280565b8280016001018555821562000280579182015b828111156200028057825182559160200191906001019062000263565b506200028e92915062000292565b5090565b5b808211156200028e576000815560010162000293565b80516001600160a01b0381168114620002c157600080fd5b919050565b805160ff81168114620002c157600080fd5b600080600080600080600080610100898b031215620002f5578384fd5b6200030089620002a9565b9750602062000311818b01620002a9565b60408b015160608c015160808d015160a08e0151939b50919950975095506001600160401b038082111562000344578586fd5b818c0191508c601f83011262000358578586fd5b8151818111156200036d576200036d6200044e565b604051601f8201601f19908116603f011681019083821181831017156200039857620003986200044e565b816040528281528f86848701011115620003b0578889fd5b8893505b82841015620003d35784840186015181850187015292850192620003b4565b82841115620003e457888684830101525b809850505050505050620003fb60c08a01620002c6565b915060e089015190509295985092959890939650565b6002810460018216806200042657607f821691505b602082108114156200044857634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b6111b980620004746000396000f3fe608060405234801561001057600080fd5b50600436106101c45760003560e01c80638205bf6a116100f95780639a6fc8f511610097578063b633620c11610071578063b633620c14610364578063c45defed14610377578063f2fde38b14610388578063feaf968c1461039b576101c4565b80639a6fc8f5146102f7578063b2c5aba21461033e578063b5ab58dc14610351576101c4565b806389c80d2f116100d357806389c80d2f146102ad5780638da5cb5b146102b757806392108c86146102dc5780639290124c146102e4576101c4565b80638205bf6a1461028957806383c6d722146102915780638746ea6c146102a4576101c4565b8063510547f911610166578063639097a111610140578063639097a11461025c578063668a0f0214610264578063715018a61461026c5780637284e41614610274576101c4565b8063510547f91461024457806354fd4d501461024c57806361148af014610254576101c4565b8063313ce567116101a2578063313ce567146102025780633defb9621461021c57806342faac051461022457806350d25bcd1461023c576101c4565b80630f937d17146101c9578063128e0776146101e55780631c12940a146101ed575b600080fd5b6101d26104d281565b6040519081526020015b60405180910390f35b6101d26103a3565b6102006101fb366004610f8f565b6103aa565b005b61020a610519565b60405160ff90911681526020016101dc565b6003546101d2565b61022c6105bf565b60405190151581526020016101dc565b6101d26105d5565b6101d2600181565b6101d261068c565b6101d2600581565b6002546101d2565b6101d26106f0565b61020061075d565b61027c610771565b6040516101dc919061104e565b6101d261089a565b61020061029f366004610e7f565b610919565b6101d261053981565b6101d26201388181565b6000546001600160a01b03165b6040516001600160a01b0390911681526020016101dc565b61022c610968565b61022c6102f2366004610f61565b61098b565b61030a610305366004610f73565b6109f3565b604080516001600160501b03968716815260208101959095528401929092526060830152909116608082015260a0016101dc565b61022c61034c366004610f61565b610b0d565b6101d261035f366004610f49565b610b30565b6101d2610372366004610f49565b610be6565b6001546001600160a01b03166102c4565b610200610396366004610e39565b610c45565b61030a610cbe565b6004545b90565b6103b2610d8f565b6103ba610968565b61040b5760405162461bcd60e51b815260206004820152601c60248201527f4552524f523a4144502d3030313a4e4f545f544553545f434841494e0000000060448201526064015b60405180910390fd5b600a546001600160501b03908116908616111561044157600a805469ffffffffffffffffffff19166001600160501b0387161790555b60098054600181810190925560038082047f6e1540171b6c0c960b71a7020d9f60077f6af931a8bbf590da0223dacf75c7af0180546001600160501b03998a16600a94849006949094026101000a848102908b02199091161790556040805160a0810182528381526020818101998a5281830198895260608201978852958a16608082019081526000948552600890965292209151825490891669ffffffffffffffffffff19918216178355965192820192909255935160028501559151918301919091555160049091018054919093169116179055565b60006105236105bf565b156105b557600160009054906101000a90046001600160a01b03166001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b15801561057657600080fd5b505afa15801561058a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105ae919061102d565b90506103a7565b5060065460ff1690565b600060014614806105d05750600546145b905090565b60006105df6105bf565b1561066a57600160009054906101000a90046001600160a01b03166001600160a01b03166350d25bcd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561063257600080fd5b505afa158015610646573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105ae9190610e67565b50600a546001600160501b031660009081526008602052604090206001015490565b60006106966105bf565b156106e957600160009054906101000a90046001600160a01b03166001600160a01b03166354fd4d506040518163ffffffff1660e01b815260040160206040518083038186803b15801561063257600080fd5b5060075490565b60006106fa6105bf565b1561074d57600160009054906101000a90046001600160a01b03166001600160a01b031663668a0f026040518163ffffffff1660e01b815260040160206040518083038186803b15801561063257600080fd5b50600a546001600160501b031690565b610765610d8f565b61076f6000610de9565b565b606061077b6105bf565b1561080a57600160009054906101000a90046001600160a01b03166001600160a01b0316637284e4166040518163ffffffff1660e01b815260040160006040518083038186803b1580156107ce57600080fd5b505afa1580156107e2573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526105ae9190810190610ea0565b60058054610817906110e0565b80601f0160208091040260200160405190810160405280929190818152602001828054610843906110e0565b80156108905780601f1061086557610100808354040283529160200191610890565b820191906000526020600020905b81548152906001019060200180831161087357829003601f168201915b5050505050905090565b60006108a46105bf565b156108f757600160009054906101000a90046001600160a01b03166001600160a01b0316638205bf6a6040518163ffffffff1660e01b815260040160206040518083038186803b15801561063257600080fd5b50600a546001600160501b031660009081526008602052604090206003015490565b600a80546001600160501b03169060006109328361111b565b82546101009290920a6001600160501b03818102199093169183160217909155600a54610964925016838380836103aa565b5050565b600061053946148061097b57506104d246145b806105d057505046620138811490565b60008183106109c1576004546003546109a49190611081565b6109ae8385611099565b11156109bc575060016109ed565b6109e9565b6004546003546109d19190611081565b6109db8484611099565b11156109e9575060016109ed565b5060005b92915050565b6000806000806000610a036105bf565b15610a9b57600154604051639a6fc8f560e01b81526001600160501b03881660048201526001600160a01b0390911690639a6fc8f59060240160a06040518083038186803b158015610a5457600080fd5b505afa158015610a68573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a8c9190610fe4565b94509450945094509450610b04565b505050506001600160501b03828116600090815260086020908152604091829020825160a0810184528154851680825260018301549382018490526002830154948201859052600383015460608301819052600490930154909516608090910181905293945090925b91939590929450565b6000818310610b23576002546109ae8385611099565b6002546109db8484611099565b6000610b3a6105bf565b15610bc357600154604051632d6ad63760e21b8152600481018490526001600160a01b039091169063b5ab58dc906024015b60206040518083038186803b158015610b8457600080fd5b505afa158015610b98573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bbc9190610e67565b9050610be1565b506001600160501b0381166000908152600860205260409020600101545b919050565b6000610bf06105bf565b15610c2657600154604051632d8cd88360e21b8152600481018490526001600160a01b039091169063b633620c90602401610b6c565b506001600160501b031660009081526008602052604090206003015490565b610c4d610d8f565b6001600160a01b038116610cb25760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610402565b610cbb81610de9565b50565b6000806000806000610cce6105bf565b15610d6857600160009054906101000a90046001600160a01b03166001600160a01b031663feaf968c6040518163ffffffff1660e01b815260040160a06040518083038186803b158015610d2157600080fd5b505afa158015610d35573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d599190610fe4565b94509450945094509450610d88565b600a54610d7d906001600160501b03166109f3565b945094509450945094505b9091929394565b6000546001600160a01b0316331461076f5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610402565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600060208284031215610e4a578081fd5b81356001600160a01b0381168114610e60578182fd5b9392505050565b600060208284031215610e78578081fd5b5051919050565b60008060408385031215610e91578081fd5b50508035926020909101359150565b600060208284031215610eb1578081fd5b815167ffffffffffffffff80821115610ec8578283fd5b818401915084601f830112610edb578283fd5b815181811115610eed57610eed611158565b604051601f8201601f19908116603f01168101908382118183101715610f1557610f15611158565b81604052828152876020848701011115610f2d578586fd5b610f3e8360208301602088016110b0565b979650505050505050565b600060208284031215610f5a578081fd5b5035919050565b60008060408385031215610e91578182fd5b600060208284031215610f84578081fd5b8135610e608161116e565b600080600080600060a08688031215610fa6578081fd5b8535610fb18161116e565b94506020860135935060408601359250606086013591506080860135610fd68161116e565b809150509295509295909350565b600080600080600060a08688031215610ffb578081fd5b85516110068161116e565b809550506020860151935060408601519250606086015191506080860151610fd68161116e565b60006020828403121561103e578081fd5b815160ff81168114610e60578182fd5b600060208252825180602084015261106d8160408501602087016110b0565b601f01601f19169190910160400192915050565b6000821982111561109457611094611142565b500190565b6000828210156110ab576110ab611142565b500390565b60005b838110156110cb5781810151838201526020016110b3565b838111156110da576000848401525b50505050565b6002810460018216806110f457607f821691505b6020821081141561111557634e487b7160e01b600052602260045260246000fd5b50919050565b60006001600160501b038083168181141561113857611138611142565b6001019392505050565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160501b0381168114610cbb57600080fdfea264697066735822122027d302ff0a91ff30d4ea31ead8c7be43ab7aaa57b071a052e8d5989c9407a51764736f6c63430008020033";

type AggregatorDataProviderConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AggregatorDataProviderConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AggregatorDataProvider__factory extends ContractFactory {
  constructor(...args: AggregatorDataProviderConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    aggregatorAddressMainnet: PromiseOrValue<string>,
    aggregatorAddressGoerli: PromiseOrValue<string>,
    deviationLevel: PromiseOrValue<BigNumberish>,
    heartbeatSeconds: PromiseOrValue<BigNumberish>,
    heartbeatMarginSeconds: PromiseOrValue<BigNumberish>,
    testDescription: PromiseOrValue<string>,
    testDecimals: PromiseOrValue<BigNumberish>,
    testVersion: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<AggregatorDataProvider> {
    return super.deploy(
      aggregatorAddressMainnet,
      aggregatorAddressGoerli,
      deviationLevel,
      heartbeatSeconds,
      heartbeatMarginSeconds,
      testDescription,
      testDecimals,
      testVersion,
      overrides || {}
    ) as Promise<AggregatorDataProvider>;
  }
  override getDeployTransaction(
    aggregatorAddressMainnet: PromiseOrValue<string>,
    aggregatorAddressGoerli: PromiseOrValue<string>,
    deviationLevel: PromiseOrValue<BigNumberish>,
    heartbeatSeconds: PromiseOrValue<BigNumberish>,
    heartbeatMarginSeconds: PromiseOrValue<BigNumberish>,
    testDescription: PromiseOrValue<string>,
    testDecimals: PromiseOrValue<BigNumberish>,
    testVersion: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      aggregatorAddressMainnet,
      aggregatorAddressGoerli,
      deviationLevel,
      heartbeatSeconds,
      heartbeatMarginSeconds,
      testDescription,
      testDecimals,
      testVersion,
      overrides || {}
    );
  }
  override attach(address: string): AggregatorDataProvider {
    return super.attach(address) as AggregatorDataProvider;
  }
  override connect(signer: Signer): AggregatorDataProvider__factory {
    return super.connect(signer) as AggregatorDataProvider__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AggregatorDataProviderInterface {
    return new utils.Interface(_abi) as AggregatorDataProviderInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AggregatorDataProvider {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as AggregatorDataProvider;
  }
}
