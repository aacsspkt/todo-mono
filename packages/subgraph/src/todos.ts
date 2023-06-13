import {
  TaskCreated as TaskCreatedEvent,
  TaskDeleted as TaskDeletedEvent,
  TaskToggleCompleted as TaskToggleCompletedEvent,
  TaskUpdated as TaskUpdatedEvent
} from "../generated/Todos/Todos"
import {
  TaskCreated,
  TaskDeleted,
  TaskToggleCompleted,
  TaskUpdated
} from "../generated/schema"

export function handleTaskCreated(event: TaskCreatedEvent): void {
  let entity = new TaskCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Todos_id = event.params.id
  entity.task = event.params.task
  entity.completed = event.params.completed

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTaskDeleted(event: TaskDeletedEvent): void {
  let entity = new TaskDeleted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Todos_id = event.params.id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTaskToggleCompleted(
  event: TaskToggleCompletedEvent
): void {
  let entity = new TaskToggleCompleted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Todos_id = event.params.id
  entity.task = event.params.task
  entity.completed = event.params.completed

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTaskUpdated(event: TaskUpdatedEvent): void {
  let entity = new TaskUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Todos_id = event.params.id
  entity.task = event.params.task
  entity.completed = event.params.completed

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
