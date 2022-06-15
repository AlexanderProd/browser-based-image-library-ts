import File from './File';
import Tag from './Tag';

File.belongsToMany(Tag, { through: 'filetags' });
Tag.belongsToMany(File, { through: 'filetags' });
