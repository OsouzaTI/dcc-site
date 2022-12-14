import { SubMenuModel } from "../model/MenuModel";
import PageModel from "../model/PageModel";
import error500 from "./error500";


async function add(req, res) {
    const page = req.body;   
    await PageModel.create(
        {...page},
        {
            include: [{association: PageModel.SubMenu}]
        });
    res.json([]);
}

async function edit(req, res) {
    const page = req.body;    
    const entity = await PageModel.findOne({where: {id: page.id}});
    if(entity != null) {
        entity.set({...page});    
        await entity.save();
        res.json(entity);
    } else {
        await error500(req, res);
    } 
}

async function del(req, res) {
    const page = req.params.id;    
    const entity = await PageModel.findOne({where: {id: page}});
    if(entity != null) {
        entity.destroy();        
        res.json(entity);
    } else {
        await error500(req, res);
    } 
}

async function all(req, res) {
    const menus = await PageModel.findAll();
    res.json(menus);
}

async function allBySubMenuSlug(req, res) {
    const slug = req.params.slug; 

    const submenu = await SubMenuModel.findOne({where: {slug: slug}});
    if(submenu) {
        const pages = await PageModel.findAll({
            where: { SubMenuId: submenu.get('id') }
        });
        res.json(pages);
    } else {
        res.json([]);
    }
}

export {add, edit, del, all, allBySubMenuSlug};