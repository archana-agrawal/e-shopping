const express = require('express');
const app = express();
let cors = require('cors');
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const multer = require('multer');


const uri = "mongodb+srv://dbshopping:passwordshopping@cluster0.vui1u.mongodb.net/dbshopping?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

async function main(client) {
    try {
        await client.connect();
        console.log('Connected to Database!');
    } catch (error) {
        console.log(error);
    }
}

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'e-shopping/src/assets/uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `image-${file.originalname}`)
    }
})

const upload = multer({ storage: storage });
app.use(express.static('public'))
//const upload = multer({ dest: 'uploads' });


main(client).catch(console.error);

async function checkUser(user, client) {
    const findUser = await client.db().collection('Users').findOne({ email: user.email });
    console.log(findUser);
    const result = {};
    if (!findUser) {
        console.log("User doesn't exist!");
        result['status'] = 'error';
        result['error'] = 'error';
        return result;
    }

    if (findUser.password === user.password) {
        result['status'] = 'success';
        result['data'] = findUser;
        return result;
    } else {
        console.log("Password doesn't matched!");
        result['error'] = 'error';
        return result;
    }

}

app.post('/login', async (req, res) => {

    try {
        const user = req.body;
        const findUser = await checkUser(user, client);
        res.status(200).send(findUser);
    } catch (error) {
        console.log(error);
        res.status(201).send();
    }

})

async function addUser(user, client) {
    await client.db().collection('Users').insertOne(user);
    console.log("Added user Successfully");
}

app.post('/register', async (req, res) => {
    const result = {};
    try {
        // const temp = req.file.filename;
        // var image = req.file.path;
        // image = temp;
        // console.log(image);

        const user = req.body;

        // const { userId, username, firstname, lastname, phoneno, email, password} = req.body;
        // const user = {
        //     userId, username, firstname, lastname, phoneno, email, password  
        // };
       
        await addUser(user, client);
        result['status'] = 'success';
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        result['error'] = 'error';
        res.status(201).send(result);
    }
})

async function getAllUsers() {
    var result = '';
    await client.db().collection('Users').find({}).toArray().then((ans) => {
        result = ans;
    })
    console.log("All users get!");
    return result;
}

app.get('/allUsers', async (req, res) => {
    var result = {};
    try {
        const allUsers = await getAllUsers();
        result['status'] = 'success';
        result['data'] = allUsers;
        res.status(200).send(result);
    } catch (error) {
        result['error'] = 'error';
        console.log(error);
        res.status(201).send(result);
    }
});

async function getUserDetails(id, client) {
    var result = {};
    const details = await client.db().collection('Users').findOne({ userId: id });
    if (!details) {
        result['error'] = 'errror';
        return result;
    }
    result['status'] = 'success';
    result['data'] = details;
    return result;
}

app.get('/login/myprofile/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const userDetails = await getUserDetails(id, client);
        console.log('Get Profile Details!');
        res.status(200).send(userDetails);
    } catch (error) {
        console.log(error);
        res.status(201).send();
    }

});

async function updateUserDetails(myquery, user, client){
    await client.db().collection('Users').replaceOne(myquery, user);
    console.log('Updated details!');
}

async function getOldDetails(id, client){
    return await client.db().collection('Users').findOne({userId: id});
}

app.put('/login/myprofile/editdetails/:id',  upload.single('image'), async (req, res) => {
    var result = {};
    try{
        const myquery = getOldDetails(req.params.id, client);
        console.log(req.file);
        const temp = req.file.filename;
        var image = req.file.path;
        image = temp;
        console.log(image);

        const { userId, username, firstname, lastname, phoneno, email, password} = req.body;
        const user = {
            userId, username, firstname, lastname, phoneno, email, password, image  
        };
        await updateUserDetails(myquery, user, client);
        result['status'] = 'success';
        res.status(200).send(result);
    }catch(error){
        console.log(error);
        result['error'] = 'error';
        res.status(201).send(result);
    }
})

async function addProduct(product, client) {
    await client.db().collection('product').insertOne(product);
    console.log('Product Added!');
}

app.post('/adminlogin/dashboard/product/add_product', upload.single('image'), async (req, res) => {
    const result = {};
    try {

        const temp = req.file.filename;
        var image = req.file.path;
        image = temp;
        console.log(image);

        const { productId, name, price, discount, priceWithDiscount, mgfdate, description, categoryId, QuantityAvailable } = req.body;
        const product = {
            productId, name, price, discount, priceWithDiscount, mgfdate, description, image, categoryId, QuantityAvailable
        }
        console.log(product);
        await addProduct(product, client);
        result['status'] = 'success';
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        result['error'] = 'error';
        res.status(201).send(result);
    }
})

async function UpdateProduct(product, myquery, client) {
    await client.db().collection('product').replaceOne(myquery, product);
    console.log("Product Updated!");
}

async function getOldProduct(id, client) {
    const product = await client.db().collection('product').findOne({ productId: id });
    return product;
}

app.put('/login/dashboard/product/editproduct/:productId', async (req, res) => {
    var result = {};
    try {

        const product = req.body;
        console.log(product);
        const myquery = await getOldProduct(req.params.productId, client);
        await UpdateProduct(product, myquery, client);
        result['status'] = 'success';
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        result['error'] = 'error';
        res.status(201).send(result);
    }
});

async function deleteProduct(id, client) {
    await client.db().collection('product').deleteOne({ productId: id });
    console.log('Product Deleted!');
}

app.delete('/adminlogin/dashboard/product/deleteproduct/:productId', async (req, res) => {
    var result = {};
    try {
        const id = req.params.productId;
        console.log(id);
        await deleteProduct(id, client);
        result['status'] = 'success';
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        result['error'] = 'error';
        res.status(201).send(result);
    }
});

async function getAllProducts() {
    var result = '';
    await client.db().collection('product').find({}).toArray().then((ans) => {
        //console.log(ans);
        result = ans;
    })
    console.log("All Product List!");
    return result;
}

app.get('/adminlogin/dashboard/allproduct', async (req, res) => {
    const result = {};
    try {
        const getAllProduct = await getAllProducts();
        result['status'] = 'success';
        result['data'] = getAllProduct;
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        result['error'] = 'error';
        res.status(201).send(result);
    }
});

async function findProductById(id, client) {
    console.log('Archuu');
    const findProduct = await client.db().collection('product').findOne({ productId: id });
    const result = {};
    //console.log(findProduct);
    if (!findProduct) {
        result['error'] = 'error';
        return result;
    }
    result['status'] = 'success';
    result['data'] = findProduct;
    return result;
}

// to get single result of product by id for product details
app.get('/login/product/:productId', async (req, res) => {
    try {
        const id = req.params.productId;
        console.log(id);
        const getProductDetails = await findProductById(id, client);
        //console.log(getProductDetails);
        res.status(200).send(getProductDetails);
    } catch (error) {
        console.log(error);
        res.status(201).send();
    }
});


async function addCategory(cat, client) {
    await client.db().collection('Category').insertOne(cat);
    console.log('Category Added!');
}

app.post('/category', async (req, res) => {
    var result = {};
    try {
        const {id, title} = req.body;
        const cat = {
            id, title
        }
        await addCategory(cat, client);
        result['status'] = 'success';
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        result['error'] = 'error';
        res.status(201).send(result);
    }
})

async function getAllCategory() {
    var result = '';
    await client.db().collection('Category').find({}).toArray().then((ans) => {
        result = ans;
    })
    return result;
}

app.get('/category', async (req, res) => {
    const result = {};
    try {
        const categories = await getAllCategory();
        result['status'] = 'success';
        result['data'] = categories;
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        result['error'] = 'error';
        res.status(201).send(result);
    }
})

async function deleteCategory(id, client){
    await client.db().collection('Category').deleteOne({id: id});
    console.log('Category Deleted!');
}

app.delete('/category/:id', async (req, res) => {
    var result = {};
    try{
        const id = req.params.id;
        await deleteCategory(id, client);
        result['status'] = 'success';
        res.status(200).send(result);
    }catch(error){
        console.log(error);
        result['error'] = 'error';
        res.status(201).send(result);
    }
})

async function getCategorybyid(id, client){
    const res = await client.db().collection('Category').findOne({id: id});
    return res;
}

app.get('/category/:id', async (req, res) => {
    var result = {};
    try{
        const id = req.params.id;
        const cat = await getCategorybyid(id, client);
        result['status'] = 'success';
        result['data'] = cat;
        res.status(200).send(result);
    }catch(error){
        console.log(error);
        result['error'] = 'error';
        res.status(201).send(result);
    }
});

async function updateCategory(cat, myquery, client){
    await client.db().collection('Category').replaceOne(myquery, cat);
}

app.put('/category/:id', async (req, res) => {
    var result = {};
    try{
        const cat = req.body;
        const myquery = getCategorybyid(req.params.id, client);
        await updateCategory(cat, myquery, client);
        result['status'] = 'success';
        res.status(200).send(result);
    }catch(error){
        console.log(error);
        result['error'] = 'error';
        res.status(201).send(result);
    }
});

async function addCartItems(cartItem, client) {
    await client.db().collection('Cart').insertOne(cartItem);
    console.log("Item Added to Cart!");
}

app.post('/login/cart', async (req, res) => {
    const result = {};
    try {
        const cartItem = req.body;
        await addCartItems(cartItem, client);
        result['status'] = 'success';
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        result['error'] = 'error';
        res.status(201).send(result);
    }
});

async function getCartItemByUserId(userId, client) {
    var result = '';
    await client.db().collection('Cart').find({ userId: userId }).toArray().then((ans) => {
        result = ans;
    });
    return result;
}

app.post('/login/addCart', async (req, res) => {
    const result = {};
    try {
        const userId = req.body.userId;
        //console.log(userId);
        const getCartList = await getCartItemByUserId(userId, client);
        console.log(getCartList);
        console.log("Cart Open!");
        result['status'] = 'success';
        result['data'] = getCartList;
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        result['error'] = 'error';
        res.status(201).send(result);
    }
});

async function getCartProductByProductId(id, client){
    var result;
    await client.db().collection('Cart').find({productId: id}).toArray().then((ans) => {
        result = ans;
    })
    return result;
}

app.get('/login/cart/product', async (req, res) => {
    try{
        const productid = req.params.productId;
        const list = await getCartProductByProductId(productid, client);
        result['status'] = 'success';
        result['data'] = list;
        res.status(200).send(result);
    }catch(error){
        console.log(error);
        result['error'] = 'error';
        res.status(201).send(result);
    }
})

async function updateCartItem(myquery, product, client){
    await client.db().collection('Cart').replaceOne(myquery, product);
    console.log('Cart Item Updated!');
}

async function getOldItemfromCart(product, client){
    console.log("get item");
    const result =  await client.db().collection('Cart').findOne({$and: [{userId: product.userId}, {productId: product.productId} ]});
    //console.log(result);
    return result;
}

app.put('/login/cart/product', async (req, res) => {
    var result = {};
    try{
        const product = req.body;
        const myquery = await getOldItemfromCart(product, client);
        await updateCartItem(myquery, product, client);
        result['status'] = 'success';
        res.status(200).send(result);
    }catch(error){
        console.log(error);
        result['error'] = 'error';
        res.status(201).send(result);
    }
});

async function deleteProductFromCart(product, client){
    await client.db().collection('Cart').deleteOne({$and: [{userId: product.userId}, {productId: product.productId} ]});
    console.log("Product from cart deleted!");
}

app.post('/login/cart/deleteproduct', async (req, res) => {
    var result = {};
    try{
        const product = req.body;
        await deleteProductFromCart(product, client);
        result['status'] = 'success';
        res.status(200).send(result);
    }catch(error){
        console.log(error);
        result['error'] = 'error';
        res.status(201).send(result);
    }
})

async function addLocation(location, client) {
    await client.db().collection('User Location').insertOne(location);
    console.log('Placed Order Added!');
}

app.post('/login/user/location', async (req, res) => {
    var result = {};
    try {
        const location = req.body;
        await addLocation(location, client);
        result['status'] = 'success';
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        result['error'] = 'error';
        res.status(201).send(result);
    }
});

// async function updateUserLocation(location, myquery, client) {
//     await client.db().collection('User Location').update(location, myquery);
//     console.log('Update Location!');
// }

// async function getOldLocation(userId, client) {
//     const useroldLocation = await client.db().collection('User Location').findOne({ userId: userId });
//     return useroldLocation;
// }

// async function placedOrderDetails(order, client){
//     await client.db().collection('Placed Order Details').insertOne(order);
//     console.log('Order details added!');
// }

// app.post('/login/cart/confirmorder', async (req, res) => {
//     var result = {};
//     try {
//         const Orderdetails = req.body;
//         await placedOrderDetails(Orderdetails, client);
//         result['status'] = 'success';
//         res.status(200).send(result);
//     } catch (error) {
//         console.log(error);
//         result['error'] = 'error';
//         res.status(201).send(result);
//     }
// });

async function addinPlacedOrder(product, client){
    await client.db().collection('Placed Order Prdoucts').insertOne(product);
    console.log('Placed Order Item Inserted!');
}

app.post('/login/orderplaced', async (req, res) => {
    var result = {};
    try{
        const cartproduct = req.body;
        await addinPlacedOrder(cartproduct, client);
        result['status'] = 'success';
        res.status(200).send(result);
    }catch(error){
        console.log(error);
        result['error'] = 'error';
        res.status(201).send(result);
    }
})

async function getplacedordered(userId, client){
    var list = '';
    await client.db().collection('Placed Order Prdoucts').find({userId: userId}).toArray().then((ans) => {
        list = ans;
    });
    console.log("My Order list!");
    return list;
}

// async function getplacedorderdeta(id, client){
//     const list = await client.db().collection('Placed order Details').find({id: id});
//     return list;
// }

app.get('/login/myorder/:id', async(req, res) => {
    var result = {};
    try{
        const id = req.params.id;
        console.log(id);
        const placedordered = await getplacedordered(id, client);
        result['status'] = 'success';
        result['data'] = placedordered;
        console.log(placedordered);
        res.status(200).send(result);
    }catch(error){
        console.log(error);
        result['error'] = 'error';
        res.status(201).send(result);
    }
});

async function OutOfStock(item, client){
    await client.db().collection('Out of Stock').insertOne(item);
    console.log("Out of Stock Item Added!")
}


app.post('/login/order/outofstock', async (req, res) =>{
    var result = {};
    try {
        const item = req.body;
        await OutOfStock(item, client);
        result['status'] = 'success';
        res.status(200).send(result);
    } catch(error) {
        console.log(error);
        result['error'] = 'error';
        res.status(201).send(result);
    }
});

async function getlist(id, client){
    var list;
    await client.db().collection('Out of Stock').find( {productId: id}).toArray().then((ans) => {
        list = ans;
    })
    return list;
}

app.get('/login/order/outofstock/:productId', async (req, res) => {
    var result = {};
    try {
        const id = req.params.productId;
        const list = await getlist(id, client);
        result['status'] = 'success';
        result['data'] = list;
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        result['error'] = 'error';
        res.status(201).send(result);
    }
})


async function searchProduct(product, client) {
    var result = '';
    await client.db().collection('product').find({ name: product }).toArray().then((ans) => {
        result = ans;
    });
    return result;
}

app.post('/login/search', async (req, res) => {
    var result = {};
    try {
        console.log('Archana');
        const product = req.body.ProductName;
        console.log(product);
        const searchPro = await searchProduct(product, client);
        console.log(searchPro);
        result['status'] = 'success';
        result['data'] = searchPro;
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        result['error'] = 'error';
        res.status(201).send(result);
    }
});

async function sendMail(user, callback){
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        service: 'gmail',
        auth: {
            user: 'agrawalarchana2015',
            pass: 'rajniniraj',
        }
    });

    let mailOptions = {
        from: '"Nodemialer Contact" <agrawalarchana2015@gmail.com>',
    
        to: 'archana7agrawal@gmail.com',
        subject: "Product Available!",
        html: `<h1> Your Product is waiting in your cart !!!</h1> <br>
        <h4>Please Come and Check it out !!!!</h4>`

    };

    let info = await transporter.sendMail(mailOptions);
    callback(info);
}


app.post('/sendmail', async(req, res) => {
    try{
        console.log("request came");
        const user = req.body;
        sendMail(user, info => {
            console.log('success');
            res.send(info);
        });
        // console.log("Successsssss");
        // res.status(200).send(info);
    }catch(error){
        console.log(error);
        res.status(201).send();
    }
})

app.listen(3000);
