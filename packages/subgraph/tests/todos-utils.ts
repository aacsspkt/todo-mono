import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import {
  TaskCreated,
  TaskDeleted,
  TaskToggleCompleted,
  TaskUpdated
} from "../generated/Todos/Todos"

export function createTaskCreatedEvent(
  id: BigInt,
  task: string,
  completed: boolean
): TaskCreated {
  let taskCreatedEvent = changetype<TaskCreated>(newMockEvent())

  taskCreatedEvent.parameters = new Array()

  taskCreatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  taskCreatedEvent.parameters.push(
    new ethereum.EventParam("task", ethereum.Value.fromString(task))
  )
  taskCreatedEvent.parameters.push(
    new ethereum.EventParam("completed", ethereum.Value.fromBoolean(completed))
  )

  return taskCreatedEvent
}

export function createTaskDeletedEvent(id: BigInt): TaskDeleted {
  let taskDeletedEvent = changetype<TaskDeleted>(newMockEvent())

  taskDeletedEvent.parameters = new Array()

  taskDeletedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )

  return taskDeletedEvent
}

export function createTaskToggleCompletedEvent(
  id: BigInt,
  task: string,
  completed: boolean
): TaskToggleCompleted {
  let taskToggleCompletedEvent = changetype<TaskToggleCompleted>(newMockEvent())

  taskToggleCompletedEvent.parameters = new Array()

  taskToggleCompletedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  taskToggleCompletedEvent.parameters.push(
    new ethereum.EventParam("task", ethereum.Value.fromString(task))
  )
  taskToggleCompletedEvent.parameters.push(
    new ethereum.EventParam("completed", ethereum.Value.fromBoolean(completed))
  )

  return taskToggleCompletedEvent
}

export function createTaskUpdatedEvent(
  id: BigInt,
  task: string,
  completed: boolean
): TaskUpdated {
  let taskUpdatedEvent = changetype<TaskUpdated>(newMockEvent())

  taskUpdatedEvent.parameters = new Array()

  taskUpdatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  taskUpdatedEvent.parameters.push(
    new ethereum.EventParam("task", ethereum.Value.fromString(task))
  )
  taskUpdatedEvent.parameters.push(
    new ethereum.EventParam("completed", ethereum.Value.fromBoolean(completed))
  )

  return taskUpdatedEvent
}
