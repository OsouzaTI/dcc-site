import { sequelize, DataTypes } from "../database/sequelize";
import { SubMenuModel } from './MenuModel'

const PageModel = sequelize.define('Page', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
    },
});

SubMenuModel.Page = SubMenuModel.hasMany(PageModel);
PageModel.SubMenu = PageModel.belongsTo(SubMenuModel);

export default PageModel;