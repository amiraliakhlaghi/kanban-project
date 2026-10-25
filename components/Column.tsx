"use client";

import { Status, useTaskStore } from "@/lib/store";
import { useEffect, useMemo } from "react";
import Task from "./Task";

const Column = ({ title, status }: { title: string; status: string }) => {
  const { tasks, updateTask, dragTask, draggedTask } = useTaskStore();

  const filteredTasks = useMemo(
    () => tasks.filter((task) => task.status === status),
    [tasks, status],
  );

  useEffect(() => {
    useTaskStore.persist.rehydrate();
  }, []);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!draggedTask) return;
    updateTask(draggedTask, status as Status);
    dragTask(null);
  };
  return (
    <section className="h-140 flex-1">
      <h2 className="ml-1 font-serif text-2xl font-semibold">{title}</h2>

      <div
        className="mt-3.5 h-full w-full rounded-xl bg-gray-700/50 p-4"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-4">
          {filteredTasks.map((task) => (
            <Task key={task.id} {...task} />
          ))}

          {filteredTasks.length === 0 && status === "TODO" && (
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>Create a new task</p>
            </div>
          )}

          {tasks.length && filteredTasks.length === 0 && status !== "TODO" ? (
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>Drag your tasks here</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Column;
