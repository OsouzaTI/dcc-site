import UserModel from "../model/UserModel";

async function add(req, res) {
    const user = req.body;    
    await UserModel.create({...user});
    res.json([]);
}

async function edit(req, res) {
    const user = req.body;    
    const entity = await UserModel.findOne({where: user.id});
    entity.set({...user});    
    await entity.save();
    res.json(entity);
}

async function all(req, res) {
    const users = await UserModel.findAll();
    res.json(users);
}


export {add, edit, all};