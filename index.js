import express from "express";
import router from "./routes/router.js";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import expressFileUpload from 'express-fileupload';
const app = express();
const PORT = process.env.PORT || 3000;

//public folder
app.use(express.static("public"));

//Handlebars Engine
app.engine('hbs', engine({
    extname: '.hbs',
}));
app.set('view engine', 'hbs');
app.set('views', './views');

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressFileUpload({
    limits: { fileSize: 1000000 },
    responseOnLimit: 'El archivo es demasiado grande',
    abortOnLimit: true
}));

//routes
app.use("/", router);


app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));