interface ParsedTodo {
	task: string;
	completed: boolean;
}

export function parseTodo(rawTodo: any): ParsedTodo {
	return {
		task: rawTodo[0],
		completed: rawTodo[1],
	};
}
