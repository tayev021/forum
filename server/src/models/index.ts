import { database } from '../config/database';
import { ErrorLog } from './ErrorLogModel';
import { Post } from './PostModel';
import { User } from './UserModel';

User.hasMany(Post, { foreignKey: 'authorId' });
Post.belongsTo(User, { foreignKey: 'authorId' });

export { database, ErrorLog, User, Post };
