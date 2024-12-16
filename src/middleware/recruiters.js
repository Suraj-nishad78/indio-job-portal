
const auth = (req, res, next) =>{
    if(!req.session.user){
        let user = ''
        return res.render('home',{user})
    }
    next()
}

export {auth}