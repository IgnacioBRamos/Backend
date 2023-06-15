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
        console.log(req.user.role)
        if(req.user.role !== rol){
            return res.status(400).send({status:"Error",message: error})
        }
        next()
    }
}

export {checkLogged,checkLogin,authorization}