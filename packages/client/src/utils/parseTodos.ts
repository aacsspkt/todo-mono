import { Todos } from '@/contract';

export type ParsedTodo = {
	task: string;
	completed: boolean;
};

export function parseTodo(todo: Todos.TaskStructOutput): ParsedTodo {
	return {
		task: todo[0],
		completed: todo[1],
	};
}
