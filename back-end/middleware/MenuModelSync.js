import {MenuModel} from "../model/MenuModel";

export default async function MenuModelSync(req, res, next)
{
    await MenuModel.sync();
    next();
};