import {
  Model,
  DataTypes,
  NonAttribute,
  InferAttributes,
  InferCreationAttributes,
  HasManyHasAssociationMixin,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  CreationOptional,
} from 'sequelize';

import sequelize from '.';
import File from './File';

// order of InferAttributes & InferCreationAttributes is important.
class Tag extends Model<InferAttributes<Tag>, InferCreationAttributes<Tag>> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare id: CreationOptional<string>;
  declare name: string;
  declare color: string | null;

  declare getFiles: HasManyGetAssociationsMixin<File>;
  declare addFile: HasManyAddAssociationMixin<File, string>;
  declare addFiles: HasManyAddAssociationsMixin<File, string>;
  declare setFiles: HasManySetAssociationsMixin<File, string>;
  declare removeFile: HasManyRemoveAssociationMixin<File, string>;
  declare removeFiles: HasManyRemoveAssociationsMixin<File, string>;
  declare hasFile: HasManyHasAssociationMixin<File, string>;
  declare hasFiles: HasManyHasAssociationsMixin<File, string>;
  declare countFiles: HasManyCountAssociationsMixin;

  declare files?: NonAttribute<File[]>;
}

Tag.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
