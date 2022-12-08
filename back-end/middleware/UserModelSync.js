import UserModel from "../model/UserModel";

export default async function UserModelSync(req, res, next)
{
    await UserModel.sync();
    next();
};