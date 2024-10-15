import { Task } from './types';

// Simula un servicio de datos
export const taskService = {
  getTasks: (): Task[] => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  },

  saveTasks: (tasks: Task[]): void => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  },

  addTask: (task: Omit<Task, 'id'>): Task => {
    const newTask = { ...task, id: Date.now().toString() };
    const tasks = taskService.getTasks();
    tasks.push(newTask);
    taskService.saveTasks(tasks);
    return newTask;
  },

  updateTask: (updatedTask: Task): void => {
    const tasks = taskService.getTasks();
    const index = tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      taskService.saveTasks(tasks);
    }
  },

  deleteTask: (taskId: string): void => {
    const tasks = taskService.getTasks();
    const updatedTasks = tasks.filter(t => t.id !== taskId);
    taskService.saveTasks(updatedTasks);
  }
};