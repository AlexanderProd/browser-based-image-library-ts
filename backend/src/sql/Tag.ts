import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
} from 'sequelize';

import sequelize from '.';
import File from './File';

// order of InferAttributes & InferCreationAttributes is important.
class Tag extends Model<InferAttributes<Tag>, InferCreationAttributes<Tag>> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare id: string;
  declare name: string;
  declare color: string;

  declare addParent: HasManyAddAssociationMixin<File, string>;
  declare getChildren: HasManyGetAssociationsMixin<File>;
}

Tag.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'tags',
  }
);

Tag.hasMany(File);

export default Tag;
