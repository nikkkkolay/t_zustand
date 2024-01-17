import { useState } from "react";
import { useBToDoStore } from "../state/store/useToDoStore";

interface Task {
    id: number;
    title: string;
    done: boolean;
    createdAt: number;
}

export const Task = ({ id, title, done }: Task) => {
    const [isEditMode, setEditMode] = useState(false);
    const [taskValue, setTaskValue] = useState(title);

    const [removeTask, updateTask, doneTask] = useBToDoStore((state) => [
        state.removeTask,
            state.updateTask,
        state.doneTask,
    ]);

    return (
        <label className="form-group todo">
            <input
                className={done ? "form-control done" : "form-control"}
                type="text"
                value={taskValue}
                disabled={!isEditMode}
                onChange={(e) => setTaskValue(e.target.value)}
            />

            <div className="btn-group">
                <button
                    className="btn btn-success"
                    onClick={() => doneTask(id)}
                >
                    <svg
                        className="i"
                        viewBox="0 0 32 32"
                        width="32"
                        height="32"
                        fill="none"
                        stroke="currentcolor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                    >
                        <path d="M2 20 L12 28 30 4" />
                    </svg>
                </button>
                <button
                    className="btn btn-info"
                    onClick={() => {
                        if (!done) {
                            setEditMode((state) => !state);
                            updateTask(id, taskValue);
                        }
                    }}
                >
                    {!isEditMode ? (
                        <svg
                            className="i"
                            viewBox="0 0 32 32"
                            width="32"
                            height="32"
                            fill="none"
                            stroke="currentcolor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                        >
                            <path d="M30 7 L25 2 5 22 3 29 10 27 Z M21 6 L26 11 Z M5 22 L10 27 Z" />
                        </svg>
                    ) : (
                        "ok"
                    )}
                </button>
                <button
                    className="btn btn-error"
                    onClick={() => removeTask(id)}
                >
                    <svg
                        className="i"
                        viewBox="0 0 32 32"
                        width="32"
                        height="32"
                        fill="none"
                        stroke="currentcolor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                    >
                        <path d="M28 6 L6 6 8 30 24 30 26 6 4 6 M16 12 L16 24 M21 12 L20 24 M11 12 L12 24 M12 6 L13 2 19 2 20 6" />
                    </svg>
                </button>
            </div>
        </label>
    );
};
