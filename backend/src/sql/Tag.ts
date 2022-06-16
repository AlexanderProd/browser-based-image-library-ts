import {
  Model,
  DataTypes,
  NonAttribute,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
} from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import sequelize from '.';
import File from './File';

// order of InferAttributes & InferCreationAttributes is important.
class Tag extends Model<InferAttributes<Tag>, InferCreationAttributes<Tag>> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare id: CreationOptional<string>;
  declare name: string;
  declare color: string | null;

  declare addParent: HasManyAddAssociationMixin<File, string>;
  declare getChildren: HasManyGetAssociationsMixin<File>;

  declare files?: NonAttribute<File[]>;
}

Tag.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      defaultValue: uuidv4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'tag',
    tableName: 'tags',
    timestamps: false,
  }
);

export default Tag;
