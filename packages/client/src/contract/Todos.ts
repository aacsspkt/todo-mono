/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export declare namespace Todos {
  export type TaskStruct = { task: string; completed: boolean };

  export type TaskStructOutput = [task: string, completed: boolean] & {
    task: string;
    completed: boolean;
  };
}

export interface TodosInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "addTask"
      | "deleteTask"
      | "getTask"
      | "getTasks"
      | "toggleCompleted"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "TaskCreated"
      | "TaskDeleted"
      | "TaskToggleCompleted"
  ): EventFragment;

  encodeFunctionData(functionFragment: "addTask", values: [string]): string;
  encodeFunctionData(
    functionFragment: "deleteTask",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getTask",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "getTasks", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "toggleCompleted",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "addTask", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deleteTask", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getTask", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getTasks", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "toggleCompleted",
    data: BytesLike
  ): Result;
}

export namespace TaskCreatedEvent {
  export type InputTuple = [
    id: BigNumberish,
    task: string,
    completed: boolean,
    owner: AddressLike
  ];
  export type OutputTuple = [
    id: bigint,
    task: string,
    completed: boolean,
    owner: string
  ];
  export interface OutputObject {
    id: bigint;
    task: string;
    completed: boolean;
    owner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TaskDeletedEvent {
  export type InputTuple = [id: BigNumberish];
  export type OutputTuple = [id: bigint];
  export interface OutputObject {
    id: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TaskToggleCompletedEvent {
  export type InputTuple = [
    id: BigNumberish,
    task: string,
    completed: boolean,
    owner: AddressLike
  ];
  export type OutputTuple = [
    id: bigint,
    task: string,
    completed: boolean,
    owner: string
  ];
  export interface OutputObject {
    id: bigint;
    task: string;
    completed: boolean;
    owner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Todos extends BaseContract {
  connect(runner?: ContractRunner | null): Todos;
  waitForDeployment(): Promise<this>;

  interface: TodosInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  addTask: TypedContractMethod<[_task: string], [void], "nonpayable">;

  deleteTask: TypedContractMethod<[_index: BigNumberish], [void], "nonpayable">;

  getTask: TypedContractMethod<
    [_index: BigNumberish],
    [Todos.TaskStructOutput],
    "view"
  >;

  getTasks: TypedContractMethod<[], [Todos.TaskStructOutput[]], "view">;

  toggleCompleted: TypedContractMethod<
    [_index: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "addTask"
  ): TypedContractMethod<[_task: string], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "deleteTask"
  ): TypedContractMethod<[_index: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "getTask"
  ): TypedContractMethod<
    [_index: BigNumberish],
    [Todos.TaskStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getTasks"
  ): TypedContractMethod<[], [Todos.TaskStructOutput[]], "view">;
  getFunction(
    nameOrSignature: "toggleCompleted"
  ): TypedContractMethod<[_index: BigNumberish], [void], "nonpayable">;

  getEvent(
    key: "TaskCreated"
  ): TypedContractEvent<
    TaskCreatedEvent.InputTuple,
    TaskCreatedEvent.OutputTuple,
    TaskCreatedEvent.OutputObject
  >;
  getEvent(
    key: "TaskDeleted"
  ): TypedContractEvent<
    TaskDeletedEvent.InputTuple,
    TaskDeletedEvent.OutputTuple,
    TaskDeletedEvent.OutputObject
  >;
  getEvent(
    key: "TaskToggleCompleted"
  ): TypedContractEvent<
    TaskToggleCompletedEvent.InputTuple,
    TaskToggleCompletedEvent.OutputTuple,
    TaskToggleCompletedEvent.OutputObject
  >;

  filters: {
    "TaskCreated(uint256,string,bool,address)": TypedContractEvent<
      TaskCreatedEvent.InputTuple,
      TaskCreatedEvent.OutputTuple,
      TaskCreatedEvent.OutputObject
    >;
    TaskCreated: TypedContractEvent<
      TaskCreatedEvent.InputTuple,
      TaskCreatedEvent.OutputTuple,
      TaskCreatedEvent.OutputObject
    >;

    "TaskDeleted(uint256)": TypedContractEvent<
      TaskDeletedEvent.InputTuple,
      TaskDeletedEvent.OutputTuple,
      TaskDeletedEvent.OutputObject
    >;
    TaskDeleted: TypedContractEvent<
      TaskDeletedEvent.InputTuple,
      TaskDeletedEvent.OutputTuple,
      TaskDeletedEvent.OutputObject
    >;

    "TaskToggleCompleted(uint256,string,bool,address)": TypedContractEvent<
      TaskToggleCompletedEvent.InputTuple,
      TaskToggleCompletedEvent.OutputTuple,
      TaskToggleCompletedEvent.OutputObject
    >;
    TaskToggleCompleted: TypedContractEvent<
      TaskToggleCompletedEvent.InputTuple,
      TaskToggleCompletedEvent.OutputTuple,
      TaskToggleCompletedEvent.OutputObject
    >;
  };
}
