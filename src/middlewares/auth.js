function checkLogin(req, res, next) {
    if (!req.session.user) return res.redirect("/login");
    next();
}
  
function checkLogged(req, res, next) {
    if (req.session.user) return res.redirect("/current");
    next();
}

function authorization(rol){
    return (req, res, next) => {
        const prueba = rol.some(el => el == req.user.role)
        if(prueba != true){
            return res.status(400).send({status:"Error",message: "You are not authorized"})
        }
        next()
    }
}

export {checkLogged,checkLogin,authorization}