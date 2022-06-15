import {
  Model,
  DataTypes,
  ForeignKey,
  NonAttribute,
  InferAttributes,
  InferCreationAttributes,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyGetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
} from 'sequelize';
import { fileNameFromPath } from '../utils';
import { v4 as uuidv4 } from 'uuid';

import sequelize from '.';
import Tag from './Tag';

// order of InferAttributes & InferCreationAttributes is important.
class File extends Model<InferAttributes<File>, InferCreationAttributes<File>> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare id: string;
  declare path: string;
  declare parent: ForeignKey<File['id']>;
  declare type: 'folder' | 'file';

  declare getFiles: HasManyGetAssociationsMixin<File>;

  declare getTags: HasManyGetAssociationsMixin<Tag>;
  declare addTag: HasManyAddAssociationMixin<Tag, number>;
  declare addTags: HasManyAddAssociationsMixin<Tag, number>;
  declare removeTag: HasManyRemoveAssociationMixin<Tag, number>;
  declare removeTags: HasManyRemoveAssociationsMixin<Tag, number>;

  declare Tags?: NonAttribute<Tag[]>;

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
    parent: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: 'files',
  }
);

export default File;
