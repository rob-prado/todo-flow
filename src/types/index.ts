import { z } from 'zod'

export const TodoDTOSchema = z.object({
  id: z.string().min(1, 'ID inválido'),
  title: z.string().min(1, 'Título obrigatório').max(500, 'Máximo 500 caracteres'),
  completed: z.boolean(),
  createdAt: z.number(),
})

export type TodoDTO = z.infer<typeof TodoDTOSchema>

export const TodoInputSchema = z.object({
  title: z
    .string()
    .transform((s) => s.trim())
    .pipe(z.string().min(1, 'O título não pode estar vazio').max(500, 'Máximo 500 caracteres')),
})

export type TodoInputDTO = z.infer<typeof TodoInputSchema>
