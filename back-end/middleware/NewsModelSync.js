import NewsModel from "../model/NewsModel";

export default async function NewsModelSync(req, res, next)
{
    await NewsModel.sync();
    next();
};