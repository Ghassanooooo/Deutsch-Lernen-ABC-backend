// i can check if user auth by req.user becuse i set the user in req in app file
// so if wanna to find user by id i wright req.user._id  :)
// to create predect routes we can call login middleware from  ../../middlewares/login
// user login like this router.post('/', login, (req,res)=>{})

const hdgg = require("../../middlewares/login");
