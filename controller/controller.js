import { addSkaterQuery, getSkatersQuery, verifyUserQuery, updateSkaterQuery, deleteSkaterQuery, adminAprovalQuery } from "../model/queries.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { check, validationResult } from "express-validator";
process.loadEnvFile();

const secretKey = process.env.JWT_SECRET_KEY;
const godEmail = process.env.GOD_EMAIL;
const godPassword = process.env.GOD_PASSWORD;

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
    console.log(await getSkatersQuery())
    res.render("participants",
         {title: "Participants Skate Park",
         skaters: await getSkatersQuery()
         
         });

}

export const dataSkaters = async (req, res) => {
    try {
        const email = req.query.email;
        
        const skaters = await verifyUserQuery(email);
        
        res.render("datos", {
            title: "Datos Skate Park",
            skater: skaters,
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
};

export const admin =async (req, res) => {
    res.render("admin", {
        title: "Skate Park",
        skaters: await getSkatersQuery(),
    })
}

//funcion añadir skater
export const addSkater = async (req, res) => {
    try {
        const { email, nombre, password, confirm_password, anos_experiencia, especialidad } = req.body;
        
        const { image } = req.files;
        const estado = false;
        const imageName = nombre;
        const imageUrl = `/uploads/${imageName}.jpg`;
        image.mv(`public/uploads/${imageName}.jpg`);

        //validaciones de campos requeridos
        await check("email").isEmail().withMessage("Ingresa un correo valido").run(req);
        await check("nombre").notEmpty().withMessage("Ingresa un nombre").run(req);
        await check("password").isLength({ min: 6 }).withMessage("Ingresa un password de al menos 6 caracteres").run(req);
        await check("confirm_password").equals(password).withMessage("Las passwords no coinciden").run(req);
        await check("anos_experiencia").notEmpty().withMessage("Ingresa años de experiencia").run(req);
        await check("especialidad").notEmpty().withMessage("Ingresa truco especial").run(req);

        const errors = validationResult(req);
        //si hay errores en el formulario   
        if (!errors.isEmpty()) {
            res.render("register", {
                title: "Register Skate Park",
                errors: errors.array(),
                old: req.body
            })
        }

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
            
    
            
            
           await addSkaterQuery(email, nombre, passwordHash, anos_experiencia, especialidad, imageUrl, estado);

        

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

//funcion Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        //validaciones de campos requeridos
        await check("email").isEmail().withMessage("Ingresa un correo valido").run(req);
        await check("password").isLength({ min: 6 }).withMessage("Ingresa un password de al menos 6 caracteres").run(req);
        const errors = validationResult(req);
        //si hay errores en el formulario
        if (!errors.isEmpty()) {
            res.render("login", {
                title: "Login Skate Park",
                errors: errors.array(),
                old: req.body,
            });
        }
        //verificar si el usuario existe
        const userVerify = await verifyUserQuery(email);
        
        if (!userVerify) {
            res.render("login", {
                title: "Login Skate Park",
                errors: [{ msg: "El correo no existe" }],
                old: req.body,
            });
        }
        //si entra con contraseña de administrador
        if (email==godEmail && password==godPassword) {
            const token = jwt.sign({ email: email }, secretKey, {
                expiresIn: "180s",
            });
            
            res.cookie("jwtToken", token,{
                httpOnly: true,
                maxAge: 1800000,
            }).redirect("/admin");
        }else {
        //si entra con contraseña de usuario
        //verificar password
        const passwordVerify = await bcrypt.compare(password, userVerify.password);
        
        if (!passwordVerify) {
            res.render("login", {
                title: "Login Skate Park",
                errors: [{ msg: "Password incorrecto" }],
                old: req.body,
            });
        }
            //generar token
            const token = jwt.sign({ email: userVerify.email }, secretKey, {
                expiresIn: "180s",
            });
            
            res.cookie("jwtToken", token,{
                httpOnly: true,
                maxAge: 180000,
            }).status(200).redirect("/datos?email=" + encodeURIComponent(userVerify.email));
        }
        } catch (error) {
            res.status (500).send(error.message);
        }
};

export const updateSkater = async (req, res) => {
    try {
        
        const { email, nombre, password, anos_experiencia, especialidad } = req.body;
        //Validaciones
        await check("nombre").notEmpty().withMessage("Ingresa un nombre").run(req);
        
        await check("anos_experiencia").notEmpty().withMessage("Ingresa años de experiencia").run(req);
        await check("especialidad").notEmpty().withMessage("Ingresa truco especial").run(req);
        const errors = validationResult(req);
        //si hay errores en el formulario   
        if (!errors.isEmpty()) {
            res.render("register", {
                title: "Register Skate Park",
                errors: errors.array(),
                old: req.body
            })
        }
        //hashear el password y mail
        const passwordHash = await bcrypt.hash(password, 10);
        //enviar datos a la query
         await updateSkaterQuery(email, nombre, passwordHash, anos_experiencia, especialidad );
        
        res.status(200).redirect("/participants");
    } catch (error) {
        res.status (500).send(error.message);
    }
}

export const deleteSkater = async (req, res) => {
    const { email } = req.query;
    console.log(email)
    
    try {
        await deleteSkaterQuery(email);
        res.status(200).redirect("/participants");
    } catch (error) {
        res.status (500).send(error.message);
    }
}

export const adminAproval = async (req, res) => {
    const { email, estado } = req.body;
    console.log(email, estado)
    try {
        await adminAprovalQuery(email, estado);
        res.status(200).redirect("/admin");
    } catch (error) {
        res.status (500).send(error.message);
    }
}