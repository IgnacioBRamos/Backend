

export async function login(req,res){
    if(!req.user) return res.status(400).send({status:"error",error:"Invalid Credentials"})
    req.session.user={
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        full_name:req.user.full_name,
        age:req.user.age,
        email:req.user.email
    }
    res.send({status:"Success",message: "Logged In", payload:req.session.user})
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