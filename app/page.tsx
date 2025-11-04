"use client";

import { useQuery } from "@tanstack/react-query";
import { Todo } from "@prisma/client";
import AddTodo from "@/components/AddTodo";

export default function Home() {
    const { data: todos, isLoading } = useQuery({
        queryKey: ["todos"],
        queryFn: async () => {
            const res = await fetch("/api/todos");
            return res.json();
        },
    });

    if (isLoading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

    return (
        <main className="max-w-md mx-auto mt-10 p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>
            <AddTodo />
            <ul className="space-y-2 mt-4">
                {todos.map((todo: Todo) => (
                    <li key={todo.id} className="flex justify-between items-center bg-gray-100 rounded-md p-2">
                        <span className={todo.completed ? "line-through text-gray-500" : ""}>{todo.title}</span>
                        {todo.completed && <span>Complete</span>}
                    </li>
                ))}
            </ul>
        </main>
    );
}
