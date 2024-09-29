import { z } from 'zod';
import { TUserCreate } from './types';

export const CreateUserSchema = z.object({
  tipo: z.enum(['FISICA', 'JURIDICA']),
  identificador: z.string().min(1).max(20),
  nome: z.string().min(1).max(60),
  celular: z.string().regex(new RegExp(/^\(?\d{2}\)?\s?9\d{4}-\d{4}$/), "Celular deve estar dentro do formato (11)91111-1111").optional(),
  telefone: z.string().regex(new RegExp(/^\(?\d{2}\)?\s?\d{4}-\d{4}$/), "Telefone deve estar dentro do formato (11)1111-1111").optional(),
  email: z.string().email(),
  email_confirmacao: z.string().email(),
  cep: z.string().regex(new RegExp(/^\d{5}-?\d{3}$/), "CEP deve estar dentro do formato XXXXX-XXX"),
  logradouro: z.string().min(1).max(60),
  numero: z.number().int().positive().safe(),
  complemento: z.string().optional(),
  cidade: z.string().min(1).max(45),
  bairro: z.string().min(1).max(60),
  estado: z.string().min(1).max(60),
  termos: z.boolean(),

})
.superRefine(({ email, email_confirmacao, identificador, celular, telefone, tipo }, ctx) => {
  if (email !== email_confirmacao) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "A confirmacao do email deve ser igual.",
      path: ["email_confirmacao"]
    })
  }
  if(celular === undefined && telefone === undefined){
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Celular ou telefone deve ser informado",
      path: ["celular", "telefone"]
    })    
  }
  if(tipo === "FISICA"){
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
    if(!cpfRegex.test(identificador)){
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "O CPF deve seguir o formato XXX.XXX.XXX-XX",
        path: ["identificador"]
      })
    }
  }
  if(tipo === "JURIDICA"){
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/
    if(!cnpjRegex.test(identificador)){
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "O CNPJ deve seguir o formato XX.XXX.XXX/XXXX-XX",
        path: ["identificador"]
      })
    }
  }
})
.transform(({email_confirmacao, ...values}) => {
  const TransformedUserIput: TUserCreate = {
    ...values,
    celular: values.celular ? parseInt(values.celular.replaceAll(/\D/g, '')) : null,
    telefone: values.telefone ? parseInt(values.telefone.replaceAll(/\D/g, '')) : null,
    cep: parseInt(values.cep.replaceAll('-', ''), 10),
    complemento: values.complemento ? values.complemento : null
  }
  return TransformedUserIput
})
