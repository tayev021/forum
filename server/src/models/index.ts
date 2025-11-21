import { database } from '../config/database';
import { ErrorLog } from './ErrorLogModel';
import { Post } from './PostModel';
import { Thread } from './ThreadModel';
import { Forum } from './ForumModel';
import { Category } from './CategoryModel';
import { User } from './UserModel';

User.hasMany(Post, { foreignKey: 'authorId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

User.hasMany(Thread, { foreignKey: 'authorId', as: 'threads' });
Thread.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

User.hasMany(Forum, { foreignKey: 'authorId', as: 'forums' });
Forum.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

User.hasMany(Category, { foreignKey: 'authorId', as: 'categories' });
Category.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

Thread.hasMany(Post, { foreignKey: 'threadId', as: 'posts' });
Post.belongsTo(Thread, { foreignKey: 'threadId', as: 'thread' });

Forum.hasMany(Thread, { foreignKey: 'forumId', as: 'treads' });
Thread.belongsTo(Forum, { foreignKey: 'forumId', as: 'forum' });

Category.hasMany(Forum, { foreignKey: 'categoryId', as: 'forums' });
Forum.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

export { database, ErrorLog, User, Category, Forum, Thread, Post };
