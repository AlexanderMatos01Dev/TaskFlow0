import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Task, statusOrder } from '../../TaskFlow0.Data/types';

interface TaskListProps {
  tasks: Task[];
  onDragEnd: (result: any) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export function TaskList({ tasks, onDragEnd, onEditTask, onDeleteTask }: TaskListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendiente": return "bg-gray-500";
      case "En Progreso": return "bg-blue-500";
      case "Completado": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
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
                                  onClick={() => onEditTask(task)}
                                  className="p-1"
                                >
                                  <PencilIcon className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => onDeleteTask(task.id)}
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
  );
}