import express from "express";
import cookieParser from 'cookie-parser';
import userRouter from "./modules/user/routes"
import cepRouter from "./modules/cep/routes"
import authRouter from "./modules/auth/routes"
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from "./middleware/notFound";

const app = express();
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 
app.use(cookieParser());

const port = process.env.PORT || 4568;


app.get("/ping", (_req, res) => {
  return res.send("pong"); 
});

app.use("/user", userRouter);
app.use("/cep", cepRouter);
app.use('/auth', authRouter);

app.use(errorHandler);
app.use(notFoundHandler)

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
