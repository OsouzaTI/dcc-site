import {SubMenuModel} from "../model/MenuModel";

export default async function SubMenuModelSync(req, res, next)
{
    await SubMenuModel.sync();
    next();
};