/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface IStakingFacadeInterface extends utils.Interface {
  functions: {
    "capitalSupport(uint96)": FunctionFragment;
    "getDip()": FunctionFragment;
    "getRegistry()": FunctionFragment;
    "getStakingWallet()": FunctionFragment;
    "implementsIStaking()": FunctionFragment;
    "maxRewardRate()": FunctionFragment;
    "owner()": FunctionFragment;
    "rateDecimals()": FunctionFragment;
    "rewardBalance()": FunctionFragment;
    "rewardRate()": FunctionFragment;
    "rewardReserves()": FunctionFragment;
    "stakeBalance()": FunctionFragment;
    "stakingRate(bytes5,address)": FunctionFragment;
    "toChain(uint256)": FunctionFragment;
    "toRate(uint256,int8)": FunctionFragment;
    "version()": FunctionFragment;
    "versionParts()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "capitalSupport"
      | "getDip"
      | "getRegistry"
      | "getStakingWallet"
      | "implementsIStaking"
      | "maxRewardRate"
      | "owner"
      | "rateDecimals"
      | "rewardBalance"
      | "rewardRate"
      | "rewardReserves"
      | "stakeBalance"
      | "stakingRate"
      | "toChain"
      | "toRate"
      | "version"
      | "versionParts"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "capitalSupport",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "getDip", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getRegistry",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getStakingWallet",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "implementsIStaking",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "maxRewardRate",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "rateDecimals",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rewardBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rewardRate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rewardReserves",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "stakeBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "stakingRate",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "toChain",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "toRate",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "version", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "versionParts",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "capitalSupport",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getDip", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getRegistry",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getStakingWallet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "implementsIStaking",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "maxRewardRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "rateDecimals",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rewardBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "rewardRate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "rewardReserves",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "stakeBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "stakingRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "toChain", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "toRate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "versionParts",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IStakingFacade extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IStakingFacadeInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    capitalSupport(
      targetNftId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { capitalAmount: BigNumber }>;

    getDip(overrides?: CallOverrides): Promise<[string]>;

    getRegistry(overrides?: CallOverrides): Promise<[string]>;

    getStakingWallet(
      overrides?: CallOverrides
    ): Promise<[string] & { stakingWallet: string }>;

    implementsIStaking(overrides?: CallOverrides): Promise<[boolean]>;

    maxRewardRate(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { rate: BigNumber }>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    rateDecimals(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { decimals: BigNumber }>;

    rewardBalance(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { dipAmount: BigNumber }>;

    rewardRate(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { rate: BigNumber }>;

    rewardReserves(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { dipAmount: BigNumber }>;

    stakeBalance(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { dipAmount: BigNumber }>;

    stakingRate(
      chain: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { rate: BigNumber }>;

    toChain(
      chainId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    toRate(
      value: PromiseOrValue<BigNumberish>,
      exp: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { rate: BigNumber }>;

    version(overrides?: CallOverrides): Promise<[number]>;

    versionParts(
      overrides?: CallOverrides
    ): Promise<
      [number, number, number] & { major: number; minor: number; patch: number }
    >;
  };

  capitalSupport(
    targetNftId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getDip(overrides?: CallOverrides): Promise<string>;

  getRegistry(overrides?: CallOverrides): Promise<string>;

  getStakingWallet(overrides?: CallOverrides): Promise<string>;

  implementsIStaking(overrides?: CallOverrides): Promise<boolean>;

  maxRewardRate(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  rateDecimals(overrides?: CallOverrides): Promise<BigNumber>;

  rewardBalance(overrides?: CallOverrides): Promise<BigNumber>;

  rewardRate(overrides?: CallOverrides): Promise<BigNumber>;

  rewardReserves(overrides?: CallOverrides): Promise<BigNumber>;

  stakeBalance(overrides?: CallOverrides): Promise<BigNumber>;

  stakingRate(
    chain: PromiseOrValue<BytesLike>,
    token: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  toChain(
    chainId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  toRate(
    value: PromiseOrValue<BigNumberish>,
    exp: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  version(overrides?: CallOverrides): Promise<number>;

  versionParts(
    overrides?: CallOverrides
  ): Promise<
    [number, number, number] & { major: number; minor: number; patch: number }
  >;

  callStatic: {
    capitalSupport(
      targetNftId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDip(overrides?: CallOverrides): Promise<string>;

    getRegistry(overrides?: CallOverrides): Promise<string>;

    getStakingWallet(overrides?: CallOverrides): Promise<string>;

    implementsIStaking(overrides?: CallOverrides): Promise<boolean>;

    maxRewardRate(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    rateDecimals(overrides?: CallOverrides): Promise<BigNumber>;

    rewardBalance(overrides?: CallOverrides): Promise<BigNumber>;

    rewardRate(overrides?: CallOverrides): Promise<BigNumber>;

    rewardReserves(overrides?: CallOverrides): Promise<BigNumber>;

    stakeBalance(overrides?: CallOverrides): Promise<BigNumber>;

    stakingRate(
      chain: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    toChain(
      chainId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    toRate(
      value: PromiseOrValue<BigNumberish>,
      exp: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    version(overrides?: CallOverrides): Promise<number>;

    versionParts(
      overrides?: CallOverrides
    ): Promise<
      [number, number, number] & { major: number; minor: number; patch: number }
    >;
  };

  filters: {};

  estimateGas: {
    capitalSupport(
      targetNftId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDip(overrides?: CallOverrides): Promise<BigNumber>;

    getRegistry(overrides?: CallOverrides): Promise<BigNumber>;

    getStakingWallet(overrides?: CallOverrides): Promise<BigNumber>;

    implementsIStaking(overrides?: CallOverrides): Promise<BigNumber>;

    maxRewardRate(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    rateDecimals(overrides?: CallOverrides): Promise<BigNumber>;

    rewardBalance(overrides?: CallOverrides): Promise<BigNumber>;

    rewardRate(overrides?: CallOverrides): Promise<BigNumber>;

    rewardReserves(overrides?: CallOverrides): Promise<BigNumber>;

    stakeBalance(overrides?: CallOverrides): Promise<BigNumber>;

    stakingRate(
      chain: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    toChain(
      chainId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    toRate(
      value: PromiseOrValue<BigNumberish>,
      exp: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    version(overrides?: CallOverrides): Promise<BigNumber>;

    versionParts(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    capitalSupport(
      targetNftId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getDip(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getRegistry(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getStakingWallet(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    implementsIStaking(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    maxRewardRate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rateDecimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rewardBalance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rewardRate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rewardReserves(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    stakeBalance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    stakingRate(
      chain: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    toChain(
      chainId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    toRate(
      value: PromiseOrValue<BigNumberish>,
      exp: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    version(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    versionParts(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
