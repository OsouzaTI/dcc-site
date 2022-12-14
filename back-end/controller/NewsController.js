import NewsModel from "../model/NewsModel";
import error500 from "./error500";


async function add(req, res) {
    const news = req.body; 
    const slug = news.title.toLocaleLowerCase().split(' ').join('-');
    await NewsModel.create({slug, ...news});
    res.json([]);
}

async function edit(req, res) {
    const news = req.body;    
    const entity = await NewsModel.findOne({where: {id: news.id}});
    if(entity != null) {
        entity.set({...news});    
        await entity.save();
        res.json(entity);
    } else {
        await error500(req, res);
    } 
}

async function del(req, res) {
    const newsId = req.params.id;    
    const entity = await NewsModel.findOne({where: {id: newsId}});
    if(entity != null) {
        entity.destroy();        
        res.json(entity);
    } else {
        await error500(req, res);
    } 
}

async function all(req, res) {
    const menus = await NewsModel.findAll();
    res.json(menus);
}

async function newsBySlug(req, res) {
    const slug = req.params.slug; 

    const news = await NewsModel.findOne({where: {slug: slug}});
    if(news) {
        res.json(news);
    } else {
        res.json([]);
    }
}

export {add, edit, del, all, newsBySlug};