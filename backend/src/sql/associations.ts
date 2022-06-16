import File from './File';
import Tag from './Tag';

File.hasMany(File, {
  foreignKey: 'parentId',
  as: { singular: 'child', plural: 'children' },
});
File.belongsTo(File, { foreignKey: 'id', as: 'parent' });

File.belongsToMany(Tag, { through: 'filetags' });
Tag.belongsToMany(File, { through: 'filetags' });
