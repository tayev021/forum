import { database } from '../config/database';
import { ErrorLog } from './ErrorLogModel';
import { Post } from './PostModel';
import { Thread } from './ThreadModel';
import { Forum } from './ForumModel';
import { Category } from './CategoryModel';
import { User } from './UserModel';
import { Attachment } from './AttachmentModel';
import { Like } from './LikeModel';
import { Report } from './ReportModel';
import { Subscription } from './SubscriptionModel';

User.hasMany(Post, { foreignKey: 'authorId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

User.hasMany(Like, { foreignKey: 'userId', as: 'likes' });
Like.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Report, { foreignKey: 'reporterId', as: 'reports' });
Report.belongsTo(User, { foreignKey: 'reporterId', as: 'reporter' });

User.hasMany(Thread, { foreignKey: 'authorId', as: 'threads' });
Thread.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

User.hasMany(Forum, { foreignKey: 'authorId', as: 'forums' });
Forum.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

User.hasMany(Category, { foreignKey: 'authorId', as: 'categories' });
Category.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

User.hasMany(Subscription, {
  foreignKey: 'userId',
  as: 'subscriptions',
  onDelete: 'CASCADE',
  hooks: true,
});
Subscription.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Post.hasMany(Attachment, {
  foreignKey: 'postId',
  as: 'attachments',
  onDelete: 'CASCADE',
  hooks: true,
});
Attachment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

Post.hasMany(Report, { foreignKey: 'postId', as: 'reports' });
Report.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

Post.hasMany(Like, { foreignKey: 'postId', as: 'likes' });
Like.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

Thread.hasMany(Post, {
  foreignKey: 'threadId',
  as: 'posts',
  onDelete: 'CASCADE',
  hooks: true,
});
Post.belongsTo(Thread, { foreignKey: 'threadId', as: 'thread' });

Thread.hasMany(Subscription, {
  foreignKey: 'threadId',
  as: 'subscriptions',
  onDelete: 'CASCADE',
  hooks: true,
});
Subscription.belongsTo(Thread, { foreignKey: 'threadId', as: 'thread' });

Forum.hasMany(Thread, { foreignKey: 'forumId', as: 'threads' });
Thread.belongsTo(Forum, { foreignKey: 'forumId', as: 'forum' });

Category.hasMany(Forum, { foreignKey: 'categoryId', as: 'forums' });
Forum.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

export {
  database,
  ErrorLog,
  User,
  Category,
  Forum,
  Thread,
  Post,
  Attachment,
  Like,
  Report,
  Subscription,
};
