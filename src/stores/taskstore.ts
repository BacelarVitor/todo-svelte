import { writable } from "svelte/store";
import type { ITask } from '../interfaces/ITask';

const tasks = writable<ITask[]>([
    {
        id: 1,
        label: "Finish ignite challenge",
        isDone: false, 
    },
    {
        id: 2,
        label: "Cardio",
        isDone: false, 
    },
    {
        id: 3,
        label: "do the dishes",
        isDone: true, 
    },
    {
        id: 4,
        label: "watch anime",
        isDone: false, 
    },
    {
        id: 5,
        label: "play vavazin",
        isDone: false, 
    },
])

function addTask(task: string) {
  let id = 0;
  const unsubscribe = tasks.subscribe(tasks => id = tasks.length  + 1); 
  const newTask: ITask = { id, label: task, isDone: false }
  tasks.update(tasks => [newTask, ...tasks])
  unsubscribe();
}

function checkTask(taskId: number) {
  tasks.update(tasks => {
    const index = tasks.findIndex(task => task.id === taskId);
    if(index >= 0) {
      tasks[index] = { ...tasks[index], isDone: !tasks[index].isDone }
    }
    return [...tasks]
  })
}

function deleteTask(taskId: number) {
  tasks.update(tasks => tasks.filter(task => task.id !== taskId))
}

const customStorage = {
  subscribe: tasks.subscribe,
  checkTask,
  deleteTask,
  addTask
}

export default customStorage