import { sequelize, DataTypes } from "../database/sequelize";

const NewsModel = sequelize.define('News', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default NewsModel;