// src/TaskFlow0.Web/components/TaskList.tsx
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Task } from 'src/TaskFlow0.Data/types';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2 } from "lucide-react";
import { taskColors } from '@/constants/taskColors';

interface TaskListProps {
    tasks: Task[];
    onDragEnd: (result: any) => void;
    onEditTask: (task: Task) => void;
    onDeleteTask: (taskId: string) => void;
}

export function TaskList({ tasks, onDragEnd, onEditTask, onDeleteTask }: TaskListProps) {
    const statusColumns = ['Pendiente', 'En Progreso', 'Completado'];

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {statusColumns.map((status, statusIndex) => (
                    <Droppable key={status} droppableId={statusIndex.toString()}>
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="bg-gray-100 p-4 rounded-lg"
                            >
                                <h3 className="font-semibold mb-2">{status}</h3>
                                {tasks
                                    .filter((task) => task.status === status)
                                    .map((task, index) => (
                                        <Draggable key={task.id} draggableId={task.id} index={index}>
                                            {(provided) => (
                                                <Card
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`mb-2 ${taskColors[task.status.toLowerCase()]}`}
                                                >
                                                    <CardContent className="p-4">
                                                        <h4 className="font-medium mb-1">{task.title}</h4>
                                                        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                                                        <div className="flex justify-between items-center">
                                                            <Badge variant={task.priority === 'Alta' ? 'destructive' : task.priority === 'Media' ? 'default' : 'secondary'}>
                                                                {task.priority}
                                                            </Badge>
                                                            <div>
                                                                <Button variant="ghost" size="icon" onClick={() => onEditTask(task)}>
                                                                    <Edit2 className="h-4 w-4" />
                                                                </Button>
                                                                <Button variant="ghost" size="icon" onClick={() => onDeleteTask(task.id)}>
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            )}
                                        </Draggable>
                                    ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
}