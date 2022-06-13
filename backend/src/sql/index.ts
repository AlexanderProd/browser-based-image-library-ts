import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'image_database.db',
  logging: false,
});

sequelize.sync({ alter: false });

export default sequelize;
