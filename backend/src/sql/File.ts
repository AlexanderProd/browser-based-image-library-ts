import {
  Model,
  DataTypes,
  ForeignKey,
  NonAttribute,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyGetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
} from 'sequelize';
import { fileNameFromPath, fileTypeFromPath } from '../utils';

import sequelize from '.';
import Tag from './Tag';
import Category from './Category';

// order of InferAttributes & InferCreationAttributes is important.
class File extends Model<
  InferAttributes<File, { omit: 'tags' }>,
  InferCreationAttributes<File, { omit: 'tags' }>
> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare id: CreationOptional<string>;
  declare path: string;
  declare type: 'folder' | 'file';
  declare rating: number | null;
  declare parentId: ForeignKey<File['id']>;

  declare getChildren: HasManyGetAssociationsMixin<File>;
  declare addChild: HasManyAddAssociationMixin<File, string>;
  declare addChildren: HasManyAddAssociationsMixin<File, string>;
  declare setChildren: HasManySetAssociationsMixin<File, string>;
  declare removeChild: HasManyRemoveAssociationMixin<File, string>;
  declare removeChildren: HasManyRemoveAssociationsMixin<File, string>;
  declare getParent: HasManyGetAssociationsMixin<File>;

  declare getTags: HasManyGetAssociationsMixin<Tag>;
  declare addTag: HasManyAddAssociationMixin<Tag, string>;
  declare addTags: HasManyAddAssociationsMixin<Tag, string>;
  declare removeTag: HasManyRemoveAssociationMixin<Tag, string>;
  declare removeTags: HasManyRemoveAssociationsMixin<Tag, string>;

  declare getCategories: HasManyGetAssociationsMixin<Category>;
  declare addCategory: HasManyAddAssociationMixin<Category, string>;
  declare addCategories: HasManyAddAssociationsMixin<Category, string>;
  declare removeCategory: HasManyRemoveAssociationMixin<Category, string>;
  declare removeCategories: HasManyRemoveAssociationsMixin<Category, string>;

  declare tags?: NonAttribute<Tag[]>;

  get fileName(): NonAttribute<string> {
    return fileNameFromPath(this.path);
  }

  get fileType(): NonAttribute<string> {
    return fileTypeFromPath(this.path);
  }
}

File.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'file',
    tableName: 'files',
    timestamps: false,
  }
);

export default File;
