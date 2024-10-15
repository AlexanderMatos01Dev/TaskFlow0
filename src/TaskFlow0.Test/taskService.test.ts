import { taskService } from '../TaskFlow0.Data/taskService';
import { Task } from '../TaskFlow0.Data/types';

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('taskService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('addTask should add a new task', () => {
    const newTask = { title: 'Test Task', description: 'Test Description', status: 'Pendiente', priority: 'Media' };
    const addedTask = taskService.addTask(newTask);
    expect(addedTask.id).toBeDefined();
    expect(addedTask.title).toBe(newTask.title);
    
    const tasks = taskService.getTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0]).toEqual(addedTask);
  });

  test('updateTask should update an existing task', () => {
    const newTask = taskService.addTask({ title: 'Test Task', description: 'Test Description', status: 'Pendiente', priority: 'Media' });
    const updatedTask: Task = { ...newTask, title: 'Updated Task' };
    taskService.updateTask(updatedTask);
    
    const tasks = taskService.getTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Updated Task');
  });

  test('deleteTask should remove a task', () => {
    const task = taskService.addTask({ title: 'Test Task', description: 'Test Description', status: 'Pendiente', priority: 'Media' });
    expect(taskService.getTasks().length).toBe(1);
    
    taskService.deleteTask(task.id);
    expect(taskService.getTasks().length).toBe(0);
  });
});