export type TaskType = 'Trabajo' | 'Casa' | 'Negocios' | 'Personal' | 'Estudios' | 'Salud' | 'Finanzas' | 'Compras' | 'Viajes' | 'Deportes' | 'Entretenimiento' | 'Proyectos';
export type TaskTag = string;
export const PRESET_TAGS = [
  'Urgente', 'Mañana', 'Fin de semana', 'Prioritario', 'Importante',
  'Recordatorio', 'Reunión', 'Llamada', 'Email', 'Documento',
  'Revisión', 'Planificación', 'Investigación', 'Desarrollo', 'Testing',
  'Diseño', 'Creativo', 'Administrativo', 'Cliente', 'Equipo',
  'Personal', 'Familiar', 'Cumpleaños', 'Evento', 'Cita',
  'Pago', 'Factura', 'Presupuesto', 'Inversión', 'Ahorro',
  'Ejercicio', 'Dieta', 'Médico', 'Terapia', 'Bienestar',
  'Lectura', 'Curso', 'Aprendizaje', 'Práctica', 'Examen'
];
export type Task = { id: string; title: string; desc?: string; type: TaskType; tags: TaskTag[]; done: boolean; createdAt: number; dueDate?: number };

const LS_KEY = 'taskmaster.tasks';

export const loadTasks = (): Task[] => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    const data = raw ? JSON.parse(raw) as Partial<Task>[] : [];
    return data.map(d => ({
      id: d.id || String(Date.now()),
      title: d.title || '',
      desc: d.desc || '',
      type: (d.type as TaskType) || 'Trabajo',
      tags: d.tags || [],
      done: !!d.done,
      createdAt: d.createdAt || Date.now(),
      dueDate: d.dueDate,
    }));
  } catch {
    return [];
  }
};

export const saveTasks = (tasks: Task[]) => localStorage.setItem(LS_KEY, JSON.stringify(tasks));

export const addTask = (title: string, desc: string, type: TaskType, tags: TaskTag[] = [], dueDate?: number) => {
  const tasks = loadTasks();
  const id = crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
  tasks.push({ id, title, desc, type, tags, done: false, createdAt: Date.now(), dueDate });
  saveTasks(tasks);
};

export const updateTask = (id: string, title: string, desc: string, type: TaskType, tags: TaskTag[] = [], dueDate?: number) => {
  const tasks = loadTasks();
  const i = tasks.findIndex(t => t.id === id);
  if (i >= 0) {
    tasks[i] = { ...tasks[i], title, desc, type, tags, dueDate };
    saveTasks(tasks);
  }
};

export const toggleDone = (id: string) => {
  const tasks = loadTasks();
  const i = tasks.findIndex(t => t.id === id);
  if (i >= 0) { tasks[i].done = !tasks[i].done; saveTasks(tasks); }
};

export const removeTask = (id: string) => {
  const tasks = loadTasks().filter(t => t.id !== id);
  saveTasks(tasks);
};

export const getTask = (id: string) => loadTasks().find(t => t.id === id);
