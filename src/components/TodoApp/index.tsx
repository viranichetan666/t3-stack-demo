import React, { FC, useEffect, useState } from "react";
// Hooks
import { useTodos } from './../../hooks/useTodos';
import { useTodoMutation } from './../../hooks/useTodoMutation';
// Components
import Todo from "./Todo";
import ContentLoader from './../Common/ContentLoader';
// Interface types
import {
  SubTaskType,
  TaskType,
} from "../../interfaces/todo";

const TodoApp: FC = () => {
  // Local state
  const [taskInput, setTaskInput] = useState("");

  // Queries
  const { data: taskData, isLoading } = useTodos();

  // Add main task handler
  const { mutate: addTask } = useTodoMutation(
    "task.addTask",
    (oldItems, params) => {
      return oldItems ? [...oldItems, params] : [params];
    }
  );

  // Add Subtask handler
  const { mutate: addItem } = useTodoMutation(
    "subtask.addItem",
    (oldItem, currItem) => {
      return oldItem?.map((taskItem) => {
        if (taskItem.id == currItem?.taskId) {
          return {
            ...taskItem,
            todoItem: [...taskItem?.todoItem, currItem],
          };
        }
        return taskItem;
      });
    }
  );

  // Delete main task handler
  const { mutate: deleteTask } = useTodoMutation(
    "task.deleteTask",
    (old, params) => {
      return old?.filter((item) => params?.id !== item.id);
    }
  );

  // Delete subtask handler
  const { mutate: deleteSubtaskHandler } = useTodoMutation(
    "subtask.deleteItem",
    (oldItem, currItem) => {
      return oldItem?.map((taskItem) => {
        if (taskItem.id === currItem.taskId) {
          return {
            ...taskItem,
            todoItem: taskItem?.todoItem.filter(
              (item: SubTaskType) => item.id !== currItem.id
            ),
          };
        } else return taskItem;
      });
    }
  );

  // Task Mark as done handler
  const { mutate: toggleTaskChecked } = useTodoMutation(
    "task.toggleTaskChecked",
    (old, params) => {
      return old?.map((item) => {
        if (item.id === params.id) {
          return {
            ...item,
            checked: params.checked,
            todoItem: item.todoItem.map((item: SubTaskType) => ({
              ...item,
              checked: params.checked,
            })),
          };
        }
        return item;
      });
    }
  );

  // Subtask mark as done handler 
  const { mutate: toggleSubtaskChecked } = useTodoMutation(
    "subtask.markAsComplete",
    (oldItems, currItem) => {
      return oldItems?.map((taskItem) => {
        if (taskItem.id === currItem.taskId) {
          return {
            ...taskItem,
            todoItem: taskItem?.todoItem?.map((item: SubTaskType) => {
              if (item.id === currItem.id) {
                return {
                  ...item,
                  checked: !item.checked,
                };
              } else return item;
            }),
          };
        } else return taskItem;
      });
    }
  );

  // Tas/Subtask add handler
  const taskAddHandler = (subTask?: {name: string, taskId: string}) => {
    if(subTask && subTask.taskId) {
      addItem(subTask);
    } else {
      if(taskInput && taskInput !== "") {
        setTaskInput("")
        addTask({ name: taskInput, description: '' })
      }
    }
  }

  // Track keyborad enter event 
  const taskAddOnEnter = (e: { key: string; }) => {
    if (e.key === 'Enter') {
      taskAddHandler()
    }
  }

  return (
    <div className="shadow-card bg-white border border-grey border-solid w-2/4 m-auto rounded-lg">
      <div>
        <div>
          <div className="overflow-auto h-full">
            {
              isLoading && <ContentLoader/>
            }
            {taskData?.map((item: TaskType) => {
              return (
                <Todo
                  key={item.id}
                  task={item}
                  markAsComplete={toggleTaskChecked}
                  deletTaskHandler={deleteTask}
                  deleteSubtaskHandler={deleteSubtaskHandler}
                  addSubTaskHandler={taskAddHandler}
                />
              );
            })}
          </div>
          <div className="flex border-b border-gray-border items-center">
            <div className="flex-1">
              <input
                className="border-0 w-full p-3 outline-0"
                type="text"
                placeholder="New Task" 
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                onKeyDown={taskAddOnEnter}
              />
            </div>
            <div>
              <button
                type="button"
                onClick={() => taskAddHandler()}
                className="rounded-md bg-primary-main p-2 text-sm text-white transition mr-3"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
