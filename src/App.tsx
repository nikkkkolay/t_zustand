import { useCallback, useEffect, useState } from "react";
import { useBToDoStore } from "./state/store/useToDoStore";
import { Task } from "./components/Task";

const App: React.FC = () => {
    const [inputValue, setInputValue] = useState("");
    const [doneCounter, setDoneCounter] = useState(0);

    const [tasks, createTask] = useBToDoStore((state) => [state.tasks, state.createTask]);

    useEffect(() => {
        const doneTasks = tasks.filter((task) => task.done);
        setDoneCounter(doneTasks.length);
    }, [tasks]);

    const addTask = useCallback(
        (e) => {
            e.preventDefault();
            if (inputValue) {
                createTask(inputValue);
                setInputValue("");
            }
        },
        [inputValue]
    );

    return (
        <div className="site-main">
            <div className="container">
                <div className="grid grid-center">
                    <div className="cell cell-6">
                        <h1>todo</h1>

                        <div className="progress-bar progress-bar-show-percent progress-success m-b-1">
                            <div
                                style={{
                                    width: `${(doneCounter / tasks.length) * 100}%`,
                                }}
                            >
                                {tasks.length} / {doneCounter}
                            </div>
                        </div>

                        <form className="form">
                            <label className="form-group">
                                <span className="form-label">название</span>
                                <input
                                    type="text"
                                    placeholder="задачи..."
                                    className="form-control"
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key == "Enter") addTask(e);
                                    }}
                                    value={inputValue}
                                />
                            </label>
                            <button className="btn btn-primary full-width" onClick={(e) => addTask(e)}>
                                добавить
                            </button>
                        </form>
                        <h2>список todo</h2>
                        {!tasks.length && <p>тасок нет</p>}
                        {tasks && tasks.map((task) => <Task id={task.id} title={task.title} done={task.done} createdAt={task.createdAt} key={task.id} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
