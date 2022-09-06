import { writable } from "svelte/store";
import { supabase } from "../supabase.js";
import type { ITask } from '../interfaces/ITask';

const tasks = writable<ITask[]>([])
async function loadTodos() {
  const { data, error} = await supabase.from('todos').select()
  if (error) {
    return console.error(error);
  }
  tasks.set(data);
}
async function addTask(task: string) {
  const { data, error } = await supabase.from('todos').insert([{label: task}])
  if(error) {
    return console.log(error)
  } 

  const newTask = data[0] as ITask
  tasks.update(tasks => [newTask, ...tasks])
}

async function checkTask(taskId: number, currentState: boolean) {
  const { data, error } = await supabase.from('todos').update({isDone: !currentState}).match({id: taskId})
  if(error) {
    return console.log(error)
  } 

  tasks.update(tasks => {
    const index = tasks.findIndex(task => task.id === taskId);
    if(index >= 0) {
      tasks[index] = { ...tasks[index], isDone: !tasks[index].isDone }
    }
    return [...tasks]
  })
}

async function deleteTask(taskId: number) {
  const { _, error } = await supabase.from('todos').delete().match({id: taskId})
  if(error) {
    return console.log(error)
  } 

  tasks.update(tasks => tasks.filter(task => task.id !== taskId))
}

const customStorage = {
  subscribe: tasks.subscribe,
  checkTask,
  deleteTask,
  addTask
}
await loadTodos();

export default customStorage