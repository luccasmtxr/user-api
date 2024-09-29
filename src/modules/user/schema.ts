import { z } from 'zod';

export const UserSchema = z.object({
  //id: z.string().uuid()
  tipo: z.enum(['FISICA', 'JURIDICA']), 
  identificador: z.string().min(1), 
  nome: z.string().min(1), 
  celular: z.number().int().optional(), 
  telefone: z.number().int().optional(), 
  email: z.string().email(),
  email_confirmacao: z.string().email(),
  cep: z.number().int(), 
  logradouro: z.string().min(1), 
  numero: z.number().int(), 
  complemento: z.string().optional(), 
  cidade: z.string().min(1), 
  bairro: z.string().min(1), 
  estado: z.string().min(1), 
  termos: z.boolean(),
});