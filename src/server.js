import express, { json, urlencoded } from "express";
import ProductsRouter from "./routes/productos.route.js";
import BaseRouter from "./routes/base.route.js";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api/productos", ProductsRouter);
app.use("/", BaseRouter);

app.listen(8080, (error) => {
  if (error) {
    console.log("Error al iniciar la app", error);
  } else {
    console.log("Servidor escuchando puerto 8080");
  }
});
