import { MenuModel } from "../model/MenuModel";
import error500 from "./error500";


async function add(req, res) {
    const menu = req.body; 
    const slug = menu.title.toLocaleLowerCase().split(' ').join('-');
    await MenuModel.create({slug, ...menu});
    res.json([]);
}

async function edit(req, res) {
    const menu = req.body;    
    const entity = await MenuModel.findOne({where: {id: menu.id}});
    if(entity != null) {
        entity.set({...menu});    
        await entity.save();
        res.json(entity);
    } else {
        await error500(req, res);
    } 
}

async function del(req, res) {
    const menuId = req.params.id;    
    const entity = await MenuModel.findOne({where: {id: menuId}});
    if(entity != null) {
        entity.destroy();        
        res.json(entity);
    } else {
        await error500(req, res);
    } 
}

async function all(req, res) {
    const menus = await MenuModel.findAll({include: [MenuModel.SubMenu]});
    res.json(menus);
}

export {add, edit, del, all};