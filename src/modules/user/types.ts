import { User } from "@prisma/client";

export type TUserCreate = Omit<User, "id">
export type TUserUpdate = Partial<TUserCreate>
export type TUserRead = User