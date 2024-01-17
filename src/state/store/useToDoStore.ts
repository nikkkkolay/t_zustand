import { create } from "zustand";

interface Task {
    id: number;
    title: string;
    done: boolean;
    createdAt: number;
}

interface ToDoStore {
    tasks: Task[];
    createTask: (title: string) => void;
    updateTask: (id: number, title: string) => void;
    removeTask: (id: number) => void;
    doneTask: (id: number) => void;
}

export const useBToDoStore = create<ToDoStore>((set, get) => ({
    tasks: [],
    createTask: (title: string) => {
        const { tasks } = get();
        const newTask = {
            id: Math.floor(Math.random() * 1000),
            title: title,
            done: false,
            createdAt: Number(Date.now()),
        };
        set({ tasks: [newTask].concat(tasks) });
    },
    doneTask: (id: number) => {
        const { tasks } = get();
        set({
            tasks: tasks.map((task) => ({
                ...task,
                done: task.id === id ? !task.done : task.done,
            })),
        });
    },
    updateTask: (id: number, title: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.map((task) => ({
                ...task,
                title: task.id === id ? title : task.title,
            })),
        });
    },
    removeTask: (id) => {
        const { tasks } = get();
        set({
            tasks: tasks.filter((task) => task.id !== id),
        });
    },
}));
