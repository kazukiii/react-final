import { z } from 'zod'

export const validationSchema = z.object({
  id: z.string().nonempty('Required field'),
  title: z.string().nonempty('Required field'),
  state: z.string().nonempty('Required field').max(10, 'State cannot exceed 10 characters'),
  url: z.string().url('Invalid URL'),
  createdAt: z.string(),
  updatedAt: z.string(),
})
