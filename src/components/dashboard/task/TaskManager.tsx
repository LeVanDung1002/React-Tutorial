import { useDispatch, useSelector } from "react-redux";

import type {
  AppDispatch,
  RootState,
} from "../../../store/store";

import {
  addTodo,
  deleteTodo,
  TodoFilter,
  toggleTodo,
} from "../../../reducer/TodoSlice";

import { useMemo, useState } from "react";

import { useSearchParams } from "react-router-dom";

type TaskManagerProps = {
  isOpen: boolean;
};

export default function TaskManager({
  isOpen,
}: TaskManagerProps) {

  const dispatch =
    useDispatch<AppDispatch>();

  const [searchParams, setSearchParams] =
    useSearchParams();

  /*
    LOCAL STATE
  */

  const [nameTask, setNameTask] =
    useState("");

  /*
    STORE
  */

  const tasks = useSelector(
    (state: RootState) => state.todos.todos
  );

  /*
    URL STATE
  */

  const filterTag =
    searchParams.get("taskFilter") ||
    TodoFilter.ALL;

  /*
    DERIVED STATE
  */

  const remaining = tasks.filter(
    (t) => !t.isCompleted
  ).length;

  const filteredTasks = useMemo(() => {

    if (filterTag === TodoFilter.ALL) {
      return tasks;
    }

    if (filterTag === TodoFilter.ACTIVE) {
      return tasks.filter(
        (task) => !task.isCompleted
      );
    }

    return tasks.filter(
      (task) => task.isCompleted
    );

  }, [tasks, filterTag]);

  /*
    HANDLERS
  */

  const handleFilter = (
    filter: string
  ) => {

    setSearchParams((prev) => {

      prev.set("taskFilter", filter);

      // clear product pagination state
      prev.delete("page");

      return prev;
    });
  };

  const handleAddTask = () => {

    if (!nameTask.trim()) return;

    dispatch(addTodo(nameTask));

    setNameTask("");
  };

  /*
    UI
  */

  if (!isOpen) return null;

  return (
    <main
      className={`
        absolute inset-0 box-border
        overflow-y-auto overflow-x-hidden
        p-8
        transition-all duration-300 ease-in-out
        ${isOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none"}
      `}
    >

      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">

          <h1 className="text-2xl font-bold text-gray-800">
            Task Manager
          </h1>

          <span className="text-sm text-gray-500">
            {remaining}{" "}
            {remaining > 1
              ? "tasks"
              : "task"} left
          </span>

        </div>

        {/* Add Task */}
        <div
          className="
            flex items-center gap-2
            bg-white p-3 rounded-xl shadow-sm
            focus-within:ring-2
            focus-within:ring-blue-500
          "
        >

          <input
            placeholder="What do you need to do?"
            className="flex-1 px-3 py-2 outline-none text-sm"
            value={nameTask}
            onChange={(e) =>
              setNameTask(e.target.value)
            }
          />

          <button
            className="
              px-4 py-2
              bg-blue-600 text-white
              rounded-lg
              hover:bg-blue-700
              active:scale-95
              transition
              text-sm font-medium
            "
            onClick={handleAddTask}
          >
            + Add
          </button>

        </div>

        {/* Filter */}
        <div className="flex gap-2">

          {[
            TodoFilter.ALL,
            TodoFilter.ACTIVE,
            TodoFilter.COMPLETED,
          ].map((item, i) => (

            <button
              key={i}
              className={`
                px-4 py-1.5 rounded-full
                text-sm font-medium
                transition
                ${filterTag === item
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white text-gray-600 hover:bg-gray-100"}
              `}
              onClick={() =>
                handleFilter(item)
              }
            >
              {item}
            </button>

          ))}

        </div>

        {/* Task List */}
        <div className="space-y-3">

          {filteredTasks.map((task) => (

            <div
              key={task.id}
              className="
                bg-white p-4 rounded-xl
                shadow-sm hover:shadow-md
                transition
                flex items-center justify-between
                group
              "
            >

              <div className="flex items-center gap-3">

                {/* Toggle */}
                <button
                  className={`
                    w-6 h-6 rounded-full border-2
                    flex items-center justify-center
                    text-xs transition
                    ${task.isCompleted
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-gray-300 hover:border-blue-500 active:scale-90"}
                  `}
                  onClick={() =>
                    dispatch(
                      toggleTodo(task.id)
                    )
                  }
                >
                  {task.isCompleted && "✓"}
                </button>

                {/* Text */}
                <div>

                  <p
                    className={`
                      font-medium
                      ${task.isCompleted
                        ? "text-gray-400 line-through"
                        : "text-gray-800"}
                    `}
                  >
                    {task.name}
                  </p>

                  <p className="text-xs text-gray-400">
                    {task.date}
                  </p>

                </div>

              </div>

              {/* Delete */}
              <button
                className="
                  opacity-0
                  group-hover:opacity-100
                  text-gray-400
                  hover:text-red-500
                  transition
                "
                onClick={() =>
                  dispatch(
                    deleteTodo(task.id)
                  )
                }
              >
                ✕
              </button>

            </div>

          ))}

        </div>

        {/* Empty */}
        {filteredTasks.length === 0 && (

          <div className="text-center pt-8">

            <div className="text-5xl mb-2">
              📭
            </div>

            <p className="text-gray-400 text-sm">
              No tasks yet. Start by adding one!
            </p>

          </div>

        )}

      </div>

    </main>
  );
}