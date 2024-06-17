import { addSkaterQuery, getSkatersQuery, verifyUserQuery } from "../model/queries.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
process.loadEnvFile();



export const home = (req, res) => {
    res.render("home",
         {title: "Skate Park"});
}

export const loginForm = (req, res) => {
    res.render("login",
         {title: "Login Skate Park"});
}

export const registerForm = (req, res) => {
    res.render("register",
         {title: "Register Skate Park"});
}

export const participants =  async (req, res) => {
    res.render("participants",
         {title: "Participants Skate Park",
         skaters: await getSkatersQuery()
         });
}

//funcion añadir skater
export const addSkater = async (req, res) => {
    try {
        const { email, nombre, password, anos_experiencia, especialidad } = req.body;
        
        const { image } = req.files;
        const estado = false;
        const imageName = nombre;
        const imageUrl = `/uploads/${imageName}.jpg`;
        image.mv(`./uploads/${imageName}.jpg`);



        //verificacion de correo existente
        const userVerify = await verifyUserQuery(email);
        if (userVerify) {
            res.render("register", {
                title: "Register Skate Park",
                errors: [{ msg: "El correo ya existe" }],
            })
        }

        //hashear el password y mail
        const passwordHash = await bcrypt.hash(password, 10);
        const emailHash = await bcrypt.hash(email, 10);

        console.log(emailHash, nombre, passwordHash, anos_experiencia, especialidad, estado, imageUrl);
        await addSkaterQuery(emailHash, nombre, passwordHash, anos_experiencia, especialidad, imageUrl, estado);
    } catch (error) {
        res.status (500).send(error.message);
    }
}

//funcion obtener skaters
export const getSkaters = async (req, res) => {
    try {
        const skaters = await getSkatersQuery();
        res.status(200).json(skaters);
    } catch (error) {
        res.status (500).send(error.message);
    }
}