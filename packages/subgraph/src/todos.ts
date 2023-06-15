import { Task } from '../generated/schema';
import {
  TaskCreated as TaskCreatedEvent,
  TaskDeleted as TaskDeletedEvent,
  TaskToggleCompleted as TaskToggleCompletedEvent,
  TaskUpdated as TaskUpdatedEvent,
} from '../generated/Todos/Todos';

export function handleTaskCreated(event: TaskCreatedEvent): void {
	let entity = new Task(event.params.id.toString());
	entity.task = event.params.task;
	entity.completed = event.params.completed;
	entity.owner = event.transaction.from;
	entity.deleted = false;
	entity.save();
}

export function handleTaskDeleted(event: TaskDeletedEvent): void {
	let entity = Task.load(event.params.id.toString());
	
  if (entity) {
		entity.deleted = true;
		entity.save();
	}
}

export function handleTaskToggleCompleted(event: TaskToggleCompletedEvent): void {
	let entity = Task.load(event.params.id.toString());

	if (entity) {
		entity.completed = event.params.completed;
		entity.save();
	}
}

export function handleTaskUpdated(event: TaskUpdatedEvent): void {
	let entity = Task.load(event.params.id.toString());

	if (entity) {
		entity.task = event.params.task;
		entity.completed = event.params.completed;
		entity.save();
	}
}
