import { SubMenuModel } from "../model/MenuModel";
import error500 from "./error500";


async function add(req, res) {
    const submenu = req.body;   
    const slug = submenu.title.toLocaleLowerCase().split(' ').join('-'); 
    await SubMenuModel.create(
        {slug, ...submenu},
        {
            include: [{association: SubMenuModel.Menu}]
        });
    res.json([]);
}

async function edit(req, res) {
    const submenu = req.body;    
    const entity = await SubMenuModel.findOne({where: {id: submenu.id}});
    if(entity != null) {
        entity.set({...submenu});    
        await entity.save();
        res.json(entity);
    } else {
        await error500(req, res);
    } 
}

async function del(req, res) {
    const submenuId = req.params.id;    
    const entity = await SubMenuModel.findOne({where: {id: submenuId}});
    if(entity != null) {
        entity.destroy();        
        res.json(entity);
    } else {
        await error500(req, res);
    } 
}

async function all(req, res) {
    const menus = await SubMenuModel.findAll({include: [SubMenuModel.Page]});
    res.json(menus);
}

export {add, edit, del, all};