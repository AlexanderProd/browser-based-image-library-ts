import {
  Model,
  DataTypes,
  ForeignKey,
  NonAttribute,
  InferAttributes,
  InferCreationAttributes,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyGetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
} from 'sequelize';
import { fileNameFromPath } from '../utils';
import { v4 as uuidv4 } from 'uuid';

import sequelize from '.';
import Tag from './Tag';

// order of InferAttributes & InferCreationAttributes is important.
class File extends Model<
  InferAttributes<File, { omit: 'tags' }>,
  InferCreationAttributes<File, { omit: 'tags' }>
> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare id: string;
  declare path: string;
  declare parentId: ForeignKey<File['id']>;
  declare type: 'folder' | 'file';

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

  declare tags?: NonAttribute<Tag[]>;

  get fileName(): NonAttribute<string> {
    return fileNameFromPath(this.path);
  }
}

File.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      set(value: string) {
        if (value) {
          this.setDataValue('id', value);
        } else {
          this.setDataValue('id', uuidv4());
        }
      },
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
  },
  {
    sequelize,
    modelName: 'file',
    tableName: 'files',
    timestamps: false,
  }
);

export default File;
