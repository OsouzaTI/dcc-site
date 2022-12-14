import { sequelize, DataTypes } from "../database/sequelize";

const MenuModel = sequelize.define('Menu', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const SubMenuModel = sequelize.define('SubMenu', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

SubMenuModel.Menu = SubMenuModel.belongsTo(MenuModel, {onDelete: 'CASCADE'});
MenuModel.SubMenu = MenuModel.hasMany(SubMenuModel);

export {MenuModel, SubMenuModel};