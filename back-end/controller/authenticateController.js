import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from "../model/UserModel";

function generateTokenAccess(payload) {
    return jwt.sign(payload, process.env.SERVER_SECRET_TOKEN, {expiresIn: '3600s'});
}

async function login(req, res) {

    // vamos supor que chegou uma requisição de login de um usuario
    const { email, password } = req.body;
    
    if(!email || !password) {
        return res.status(500);
    }

    // buscando usuario
    const data = await UserModel.findOne({
        where: {email: email, password: password}
    });
            
    // verificação no banco se usuario existe, e os dados batem
    if(data == null) {
        // usuario invalido
        return res.status(500).json({msg: 'invalid user'});
    }

    const user = data;
    const payload = {
        id: user.id,
        username: user.name,
    };  

    // criação de um token JWT para o usuario em questão
    const token = generateTokenAccess(payload);

    // enviando de volta ao usuario
    res.status(200).json({token});

}

function validation(req, res) {
    // obtendo o token do cabeçalho da requisição
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.SERVER_SECRET_TOKEN, (err, user) => {
        if(err) {
            return res.sendStatus(403);
        } else {
            return res.json(user);
        }
    });
}

function authenticate(req, res, next) {

    // obtendo o token do cabeçalho da requisição
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.SERVER_SECRET_TOKEN, (err, user) => {
        if(err) {
            return res.sendStatus(403);
        }
        console.log(user);
        // proxima rota
        next();        
    });

}

// lista de middlewares
const middlewares = {
    authenticate
};

export {
    login,
    validation,
    middlewares,
};