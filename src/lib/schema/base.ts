import { z } from 'zod';
import { TITLE_MAX_LEN } from './constants';

export const baseEntitySchema = z.object({
  id: z.string(),
  title: z
    .string({ error: 'Title is required' })
    .max(TITLE_MAX_LEN, `Title must be under ${TITLE_MAX_LEN} characters`),
  rank: z.string({ error: 'Rank cannot be empty' }),
  createdAt: z.iso.datetime({ offset: true }),
  updatedAt: z.iso.datetime({ offset: true }),
  version: z.number().int().nonnegative(),
});

export type BaseEntity = z.infer<typeof baseEntitySchema>;
