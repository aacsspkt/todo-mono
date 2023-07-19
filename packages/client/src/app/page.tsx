"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useConnect } from 'wagmi';

import Toggle from '@/components/Toggle';
import { TODO_CONTRACT_ADDRESS } from '@/constants';
import { Todos__factory } from '@/contract';
import { useEthersSigner } from '@/hooks/useEthersSigner';
import {
  ParsedTodo,
  parseTodo,
} from '@/utils/parseTodos';

type TaskFormInput = {
	value: string;
	error: string | null;
};

export default function Home() {
	const [isSaving, setIsSaving] = useState(false);
	const [task, setTask] = useState<TaskFormInput>({
		value: "",
		error: null,
	});
	const [parsedTodos, setParsedTodos] = useState<ParsedTodo[]>([]);

	const { connect } = useConnect();

	const signer = useEthersSigner();
	const todos = useMemo(() => {
		return signer ? Todos__factory.connect(TODO_CONTRACT_ADDRESS, signer) : undefined;
	}, [signer]);

	const fetchTodos = useCallback(async () => {
		const parsedTodos: ParsedTodo[] = [];
		if (todos) {
			const rawTodos = await todos.getTasks();

			rawTodos.forEach((t) => {
				parsedTodos.push(parseTodo(t));
			});
		}
		return parsedTodos;
	}, [todos]);

	const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTask({
			value: e.target.value,
			error: null,
		});
	};

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if (task.value.trim() === "") {
			setTask({
				...task,
				error: "Task is empty",
			});
			return;
		}

		if (signer == undefined) {
			connect();
		}

		if (todos) {
			setIsSaving(true);
			const tx = await todos.addTask(task.value);
			try {
				const reciept = await tx.wait();
				console.log("receipt", reciept);
				fetchTodos().then((value) => setParsedTodos(value));
				setIsSaving(false);
			} catch (error) {}
		}
	};

	const handleToggleChange = (index: number, status: boolean) => {
		console.log("toggled value", status);
		if (todos) {
			todos
				.toggleCompleted(index)
				.then((tx) => {
					tx
						.wait()
						.then((receipt) => {
							console.log("receipt", receipt);
							fetchTodos().then((value) => setParsedTodos(value));
						})
						.catch((error) => console.log(error));
				})
				.catch((error) => console.log(error));
		}
	};

	const handleDeleteButtonClick = async (index: number) => {
		if (todos) {
			const tx = await todos.deleteTask(index);
			const receipt = await tx.wait();
			fetchTodos().then((value) => setParsedTodos(value));
		}
	}

	

	useEffect(() => {
		fetchTodos().then((value) => setParsedTodos(value));
	}, [fetchTodos]);

	return (
		<div className="max-w-6xl px-4 container mx-auto flex flex-col">
			<div className="my-6">
				<h1 className="text-4xl font-light">Todos</h1>
			</div>
			<div className="mb-4">
				<form className="flex flex-row space-x-5">
					<input
						value={task.value}
						onChange={handleTaskChange}
						className="px-3 py-2 border-none rounded outline-none w-96"
						placeholder="Enter Task"
						type="text"
						name="task"
						required
					/>
					<button
						disabled={isSaving}
						className="w-32 hover:shadow-lg bg-emerald-600 text-white disabled:bg-emerald-300 rounded px-3 py-2"
						type="submit"
						onClick={handleSubmit}
					>
						{isSaving ? "Saving" : "Save"}
					</button>
				</form>
			</div>
			<div className="inline-block overflow-hidden">
				<table className="min-w-full text-left text-sm font-light">
					<thead className="border-b border-gray-700 font-medium">
						<tr>
							<th scope="col" className="px-6 py-3">
								#
							</th>
							<th scope="col" className="px-6 py-3">
								Task
							</th>
							<th scope="col" className="px-6 py-3">
								Completed
							</th>
							<th scope="col" className="px-6 py-3">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{parsedTodos.length > 0 &&
							parsedTodos.map((t, i) => {
								return (
									<tr key={i} className="border-b border-gray-400 transition duration-300 ease-in-out hover:bg-neutral-100">
										<td className="whitespace-nowrap px-6 py-3">{i + 1}</td>
										<td className="whitespace-nowrap px-6 py-3">{t.completed ? <s>{t.task}</s> : <span>{t.task}</span>}</td>
										<td className="whitespace-nowrap px-6 py-3">
											{/* <input
												className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
												type="checkbox"
												role="switch"
												checked={t.completed}
												title="task completed"
												onClick={handleToggleCompleted}
											/> */}

											<Toggle status={t.completed} index={i} onToggleChange={handleToggleChange} />
										</td>
										<td className="whitespace-nowrap px-6 py-3"><button className='underline text-blue-500' type='button' onClick={(e) => handleDeleteButtonClick(i)}>Delete</button></td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
