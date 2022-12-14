import UserModel from "../model/UserModel";
import error500 from "./error500";

async function add(req, res) {
    const user = req.body;    
    await UserModel.create({...user});
    res.json([]);
}

async function edit(req, res) {
    const user = req.body;    
    const entity = await UserModel.findOne({where: {id: user.id}});
    if(entity != null) {
        entity.set({...user});    
        await entity.save();
        res.json(entity);
    } else {
        await error500(req, res);
    }
}

async function all(req, res) {
    const users = await UserModel.findAll();
    res.json(users);
}


export {add, edit, all};