

export async function login(req,res){
    if(!req.user) return res.status(400).send({status:"error",error:"Invalid Credentials"})
    req.session.user={
        firts_name: req.user.firts_name,
        last_name: req.user.last_name,
        age:req.user.age,
        email:req.user.email
    }
    
    res.send({status:"Success",payload:req.user})
}

export async function logout (req,res){
    req.session.destroy(err => {
        if (err) {
          console.error(err);
        } else {
          res.redirect('/login');
        }
      });
}