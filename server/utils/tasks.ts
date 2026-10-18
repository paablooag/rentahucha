import type { Task, TaskInput } from '#shared/utils/tasks'

const COLS = 'id, title, description, status, owner, priority, area, position, created_at, updated_at'

export function listTasks(): Promise<Task[]> {
  return query<Task>(`SELECT ${COLS} FROM tasks ORDER BY status, position, created_at`)
}

export async function createTask(t: TaskInput): Promise<Task> {
  // Nueva tarea al final de su columna salvo que se indique la posición.
  const position = t.position ?? Number((await queryOne<{ max: number | null }>('SELECT max(position) AS max FROM tasks WHERE status = $1', [t.status]))?.max ?? 0) + 1
  const row = await queryOne<Task>(
    `INSERT INTO tasks (title, description, status, owner, priority, area, position) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING ${COLS}`,
    [t.title, t.description, t.status, t.owner, t.priority, t.area, position],
  )
  return row!
}

export async function updateTask(id: string, t: TaskInput): Promise<Task | null> {
  return queryOne<Task>(
    `UPDATE tasks SET title = $2, description = $3, status = $4, owner = $5, priority = $6, area = $7,
       position = COALESCE($8, position), updated_at = now() WHERE id = $1 RETURNING ${COLS}`,
    [id, t.title, t.description, t.status, t.owner, t.priority, t.area, t.position ?? null],
  )
}

export async function deleteTask(id: string) {
  await query('DELETE FROM tasks WHERE id = $1', [id])
}
