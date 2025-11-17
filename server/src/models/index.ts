import { database } from '../config/database';
import { ErrorLog } from './ErrorLogModel';
import { Post } from './PostModel';
import { Thread } from './ThreadModel';
import { Forum } from './ForumModel';
import { Category } from './CategoryModel';
import { User } from './UserModel';

User.hasMany(Post, { foreignKey: 'authorId' });
Post.belongsTo(User, { foreignKey: 'authorId' });

User.hasMany(Thread, { foreignKey: 'authorId' });
Thread.belongsTo(User, { foreignKey: 'authorId' });

User.hasMany(Forum, { foreignKey: 'authorId' });
Forum.belongsTo(User, { foreignKey: 'authorId' });

User.hasMany(Category, { foreignKey: 'authorId' });
Category.belongsTo(User, { foreignKey: 'authorId' });

Thread.hasMany(Post, { foreignKey: 'threadId' });
Post.belongsTo(Thread, { foreignKey: 'threadId' });

Forum.hasMany(Thread, { foreignKey: 'forumId' });
Thread.belongsTo(Forum, { foreignKey: 'forumId' });

Category.hasMany(Forum, { foreignKey: 'categoryId' });
Forum.belongsTo(Category, { foreignKey: 'categoryId' });

export { database, ErrorLog, User, Category, Forum, Thread, Post };
