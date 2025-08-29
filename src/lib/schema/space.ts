import { z } from 'zod';
import { baseEntitySchema } from './base';

export const spaceSchema = z.object({
  ...baseEntitySchema.shape,
  boardIds: z.array(z.string()),
  emoji: z.emoji(),
});

export type Space = z.infer<typeof spaceSchema>;
