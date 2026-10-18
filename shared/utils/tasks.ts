// Tablero de tareas del panel: tipos, columnas y validación compartidos por la web y el servidor.

export const TASK_STATUSES = {
  pendiente: 'Pendiente',
  en_curso: 'En curso',
  esperando: 'Esperando a Pablo',
  hecha: 'Hecha',
} as const
export type TaskStatus = keyof typeof TASK_STATUSES

export const TASK_OWNERS = { pablo: 'Pablo', claude: 'Claude' } as const
export type TaskOwner = keyof typeof TASK_OWNERS

export const TASK_PRIORITIES = { alta: 'Alta', media: 'Media', baja: 'Baja' } as const
export type TaskPriority = keyof typeof TASK_PRIORITIES

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  owner: TaskOwner
  priority: TaskPriority
  area: string
  position: number
  createdAt: string
  updatedAt: string
}

export type TaskInput = Pick<Task, 'title' | 'description' | 'status' | 'owner' | 'priority' | 'area'> & { position?: number }

const oneOf = <T extends string>(v: unknown, map: Record<T, string>, fallback: T): T => (typeof v === 'string' && v in map ? v as T : fallback)

export function validateTask(input: Record<string, unknown>): { ok: true; task: TaskInput } | { ok: false; error: string } {
  const title = typeof input.title === 'string' ? input.title.trim().slice(0, 140) : ''
  if (title.length < 3) return { ok: false, error: 'Escribe un título de al menos 3 caracteres.' }
  const position = Number(input.position)
  return {
    ok: true,
    task: {
      title,
      description: typeof input.description === 'string' ? input.description.trim().slice(0, 2000) : '',
      status: oneOf(input.status, TASK_STATUSES, 'pendiente'),
      owner: oneOf(input.owner, TASK_OWNERS, 'claude'),
      priority: oneOf(input.priority, TASK_PRIORITIES, 'media'),
      area: typeof input.area === 'string' ? input.area.trim().slice(0, 40) : '',
      ...(Number.isFinite(position) ? { position } : {}),
    },
  }
}
