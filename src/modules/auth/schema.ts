import z from "zod"

export const adminUserSchema = z.object({
    username: z.string().min(5, { message: 'A usuario deve conter ao menos 5 caracteres' }).max(10, {
        message: 'O usuario n deve passar de 10 caractares',
    }),
    password: z.string().min(5, { message: 'A senha deve conter ao menos 5 caracteres' }).max(10, {
        message: 'A senha n deve passar de 10 caractares',
    }),
});

export type TAdminUser = z.infer<typeof adminUserSchema>;