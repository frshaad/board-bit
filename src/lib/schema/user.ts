import { z } from 'zod';
import { baseEntitySchema } from './base';

export const baseUserSchema = z.object({
  ...baseEntitySchema.pick({ id: true, createdAt: true, updatedAt: true })
    .shape,
  name: z.string().min(3),
});

export const cloudUserSchema = baseUserSchema.extend({
  email: z.email().optional(),
  mode: z.literal('cloud'),
  avatarUrl: z.url().optional(),
});

export const localUserSchema = baseUserSchema.extend({
  mode: z.literal('local'),
});

export const userSchema = z.union([cloudUserSchema, localUserSchema]);
export type User = z.infer<typeof userSchema>;
