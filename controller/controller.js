
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

export const participants = (req, res) => {
    res.render("participants",
         {title: "Participants Skate Park"});
}