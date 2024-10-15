import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Task } from '../../TaskFlow0.Data/types';

interface TaskFormProps {
  task: Partial<Task>;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  onChange: (field: keyof Task, value: string) => void;
}

export function TaskForm({ task, onSubmit, onCancel, onChange }: TaskFormProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">{task.id ? 'Editar Tarea' : 'Agregar Nueva Tarea'}</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            value={task.title || ''}
            onChange={(e) => onChange('title', e.target.value)}
            placeholder="Título de la Tarea"
            required
            className="rounded-lg"
          />
          <Textarea
            value={task.description || ''}
            onChange={(e) => onChange('description', e.target.value)}
            placeholder="Descripción de la Tarea"
            className="rounded-lg"
          />
          <div className="flex space-x-2">
            <Select
              value={task.status || ''}
              onValueChange={(value) => onChange('status', value)}
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
              value={task.priority || ''}
              onValueChange={(value) => onChange('priority', value)}
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
            <Button type="submit" className="rounded-lg">{task.id ? 'Actualizar' : 'Agregar'} Tarea</Button>
            <Button type="button" variant="outline" onClick={onCancel} className="rounded-lg">Cancelar</Button>
          </div>
        </form>
      </div>
    </div>
  );
}