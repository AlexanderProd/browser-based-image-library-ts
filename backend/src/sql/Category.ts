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
class Category extends Model<
  InferAttributes<Category>,
  InferCreationAttributes<Category>
> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare id: CreationOptional<string>;
  declare name: string;
  declare description: string | null;

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

Category.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'category',
    tableName: 'categories',
    timestamps: false,
  }
);

export default Category;
