require('./db')

const express = require("express");
const app = express();
const port = 3000;
const router = express.Router();
const userRouter = require('./routes/userroutes');
const adminRoutes =require('./routes/adminroutes')
const productRoutes = require('./routes/productroutes')
app.use(express.json());

const Product = require('./modules/productmodel');
const User = require('./modules/usermodel');

// Controllers
const adminController = require('./controller/adminController');
//const productController = require('./controllers/productController');
const userController = require('./controller/userController');
const authController = require('./middleware');




app.use(['/users' , "/user"], userRouter);
app.use(['/admin','/admins'], adminRoutes);
app.use(['/product','/products'], productRoutes);





app.use((err , req ,res ,next)=>{
    res.status(err.status).send({
        message : err.message
    })
})

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
