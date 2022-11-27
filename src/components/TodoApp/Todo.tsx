import React, { FC, useState } from "react";
import { BiTrashAlt, BiListOl } from "react-icons/bi";
import { TaskType } from "../../interfaces/todo";
import clsx from 'clsx';

interface markAsCompleteProps {
  id: string;
  checked: boolean;
  taskId?: string;
}

interface TodoProps {
  task: TaskType;
  markAsComplete: ({ id, checked, taskId }: markAsCompleteProps) => void;
  deletTaskHandler: ({ id }: { id: string; }) => void;
  deleteSubtaskHandler: ({ id}: { id: string; taskId: string }) => void;
  addSubTaskHandler: (props: {name: string;taskId: string}) => void
}

const Todo: FC<TodoProps> = ({
  task,
  markAsComplete,
  deletTaskHandler,
  deleteSubtaskHandler,
  addSubTaskHandler
}) => {
  // Local states
  const [taskInput, setTaskInput] = useState("")
  const [checklist, showChecklist] = useState(false)
  const { id, name, checked, todoItem = [] } = task

  // Add Subtask Handler
  const taskAddOnEnter = (e: { key: string; }) => {
    if (e.key === 'Enter') {
      setTaskInput("")
      addSubTaskHandler({ name: taskInput, taskId: id })
    }
  }

  return (
    <div
      key={id}
      className="border-b border-gray-border py-3"
    >
      <div className="flex w-full">
        <div className="flex-1">
          <div className="px-3">
            <div>
              <input
                onClick={() => {
                  markAsComplete({
                    id, 
                    checked: !checked
                  });
                }}
                checked={checked}
                type="checkbox"
                className="mx-1 h-4 w-4 mr-3 cursor-pointer"
              />
              <label className={clsx("align-text-bottom", checked && 'line-through')}>{name}</label>
            </div>
            {
              checklist &&
              <ul className="list-decimal ml-12">
                {
                  todoItem?.map((item) => {
                    return (
                      <li key={item.id}>
                        <div className={clsx('flex items-center', checked && 'line-through')}>
                          {item.name}
                          <BiTrashAlt
                            onClick={() => deleteSubtaskHandler({ id: item.id, taskId: id })}
                            className="cursor-pointer bg-white text-red-500 ml-3 text-xs"
                          />
                        </div>
                      </li>
                    )
                  })
                }
              </ul>             
            }
          </div>
        </div>
        <div className="pr-3 flex items-start">
          <BiListOl 
            className="cursor-pointer text-primary-main text-lg mr-1"
            onClick={() => showChecklist(!checklist)}
          />
          <BiTrashAlt
            className="cursor-pointer bg-white text-lg text-red-500"
            onClick={() => deletTaskHandler({ id })}
          />
        </div>
      </div>
      {
        checklist &&
        <div className="flex items-start w-full">
          <div className="flex-1 pl-10">
            <input
              className="border-0 w-full outline-0 text-xs"
              type="text"
              placeholder="Create Subtasks" 
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              onKeyDown={taskAddOnEnter}
            />
          </div>
        </div>
      }
    </div>
  );
};

export default Todo;
