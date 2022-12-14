import PageModel from "../model/PageModel";


export default async function PageModelSync(req, res, next)
{
    await PageModel.sync();
    next();
};