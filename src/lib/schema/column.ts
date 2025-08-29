import { z } from 'zod';
import { baseEntitySchema } from './base';

export const columnSchema = z.object({
  ...baseEntitySchema.shape,
  boardId: z.string({ error: 'Column must belong to a board (with ID)' }),
  taskIds: z.array(z.string()),
});

export type Column = z.infer<typeof columnSchema>;
