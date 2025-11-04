import { database } from '../config/database';
import { ErrorLog } from './ErrorLogModel';
import { Post } from './PostModel';
import { User } from './UserModel';
import { Thread } from './ThreadModel';

User.hasMany(Post, { foreignKey: 'authorId' });
Post.belongsTo(User, { foreignKey: 'authorId' });

User.hasMany(Thread, { foreignKey: 'authorId' });
Thread.belongsTo(User, { foreignKey: 'authorId' });

Thread.hasMany(Post, { foreignKey: 'threadId' });
Post.belongsTo(Thread, { foreignKey: 'threadId' });

export { database, ErrorLog, User, Thread, Post };
