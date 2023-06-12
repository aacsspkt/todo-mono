interface ParsedTodo {
	id: bigint;
	task: string;
	completed: boolean;
	owner: string;
}

export function parseTodo(rawTodo: any): ParsedTodo {
	return {
		id: rawTodo[0],
		task: rawTodo[1],
		completed: rawTodo[2],
		owner: rawTodo[3],
	};
}
