import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
}

const statusOrder = ["Pendiente", "En Progreso", "Completado"];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddOrUpdateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask) {
      if (editingTask.id) {
        setTasks(prevTasks => prevTasks.map(task => 
          task.id === editingTask.id ? editingTask : task
        ));
      } else {
        const newTask = {
          ...editingTask,
          id: Date.now().toString()
        };
        setTasks(prevTasks => [...prevTasks, newTask]);
      }
      setEditingTask(null);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendiente":
        return "bg-gray-500";
      case "En Progreso":
        return "bg-blue-500";
      case "Completado":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    const newTasks = Array.from(tasks);
    const [movedTask] = newTasks.splice(source.index, 1);
    movedTask.status = statusOrder[parseInt(destination.droppableId)];
    newTasks.splice(destination.index, 0, movedTask);

    setTasks(newTasks);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">TaskFlow0</h1>
      
      <div className="flex justify-center space-x-2 mb-4">
        <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
      </div>
      
      <h2 className="text-2xl font-semibold mb-4 text-center">Lista de Tareas</h2>
      {tasks.length === 0 ? (
        <p className="text-center">No hay tareas aún. ¡Haz clic en el botón "+" para agregar una tarea!</p>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {statusOrder.map((status, statusIndex) => {
              const statusTasks = tasks.filter((task) => task.status === status);
              if (statusTasks.length === 0) return null;

              return (
                <Droppable key={status} droppableId={statusIndex.toString()}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex-1 min-w-[300px] p-4 rounded-xl ${
                        snapshot.isDraggingOver ? 'bg-gray-100' : 'bg-white'
                      }`}
                    >
                      <h3 className={`text-xl font-semibold mb-4 ${getStatusColor(status)} text-white p-2 rounded-lg`}>
                        {status}
                      </h3>
                      <div className="space-y-4">
                        {statusTasks.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-white p-4 rounded-xl shadow-md border border-gray-200"
                              >
                                <div className={`w-full h-2 ${getStatusColor(task.status)} rounded-t-xl mb-2`}></div>
                                <h4 className="text-lg font-semibold mb-2">{task.title}</h4>
                                <p className="text-gray-600 mb-2">{task.description}</p>
                                <div className="flex justify-between items-center text-sm">
                                  <span className="font-medium">Prioridad: {task.priority}</span>
                                  <div className="space-x-2">
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => setEditingTask(task)}
                                      className="p-1"
                                    >
                                      <PencilIcon className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => handleDeleteTask(task.id)}
                                      className="p-1 text-red-500 hover:text-red-700"
                                    >
                                      <TrashIcon className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              );
            })}
          </div>
        </DragDropContext>
      )}
      <Button
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 shadow-lg"
        onClick={() => setEditingTask({ id: '', title: '', description: '', status: 'Pendiente', priority: 'Media' })}
      >
        <PlusIcon className="w-6 h-6" />
      </Button>
      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">{editingTask.id ? 'Editar Tarea' : 'Agregar Nueva Tarea'}</h3>
            <form onSubmit={handleAddOrUpdateTask} className="space-y-4">
              <Input
                value={editingTask.title}
                onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                placeholder="Título de la Tarea"
                required
                className="rounded-lg"
              />
              <Textarea
                value={editingTask.description}
                onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                placeholder="Descripción de la Tarea"
                className="rounded-lg"
              />
              <div className="flex space-x-2">
                <Select
                  value={editingTask.status}
                  onValueChange={(value) => setEditingTask({ ...editingTask, status: value })}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="En Progreso">En Progreso</SelectItem>
                    <SelectItem value="Completado">Completado</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={editingTask.priority}
                  onValueChange={(value) => setEditingTask({ ...editingTask, priority: value })}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Baja">Baja</SelectItem>
                    <SelectItem value="Media">Media</SelectItem>
                    <SelectItem value="Alta">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="submit" className="rounded-lg">{editingTask.id ? 'Actualizar' : 'Agregar'} Tarea</Button>
                <Button type="button" variant="outline" onClick={() => setEditingTask(null)} className="rounded-lg">Cancelar</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}