export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
}

export const statusOrder = ["Pendiente", "En Progreso", "Completado"];