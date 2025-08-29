import { z } from 'zod';
import { baseEntitySchema } from './base';

export const boardSchema = z.object({
  ...baseEntitySchema.shape,
  spaceId: z.string({ error: 'Board must belong to a space (with ID)' }),
  columnIds: z.array(z.string()),
});

export type Board = z.infer<typeof boardSchema>;
