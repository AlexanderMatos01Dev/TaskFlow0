import { Task } from './types';

class TaskService {
  private tasks: Task[] = [];
  private nextId = 1;

  constructor() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
      this.nextId = Math.max(...this.tasks.map(task => parseInt(task.id))) + 1;
    }
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Omit<Task, 'id'>): void {
    const newTask = { ...task, id: this.nextId.toString() };
    this.tasks.push(newTask);
    this.nextId++;
    this.saveTasks();
  }

  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.saveTasks();
    }
  }

  deleteTask(taskId: string): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.saveTasks();
  }

  saveTasks(tasks?: Task[]): void {
    if (tasks) {
      this.tasks = tasks;
    }
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}

export const taskService = new TaskService();