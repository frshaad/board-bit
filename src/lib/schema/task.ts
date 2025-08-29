import { z } from 'zod';
import { baseEntitySchema } from './base';

export const taskSchema = z.object({
  ...baseEntitySchema.shape,
  columnId: z.string({ error: 'Task must belong to a column (with ID)' }),
  isDone: z.boolean().default(false),
});

export type Task = z.infer<typeof taskSchema>;
