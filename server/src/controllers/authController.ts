import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { Op } from 'sequelize';
import { User } from '../models';
import { AppError } from '../utils/AppError';
import { signToken } from '../utils/signToken';

export const me = catchAsync(async (req: Request, res: Response) => {
  const user = req.user!;

  res.status(200).json({
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      role: user.role,
      lastSignIn: user.lastSignIn,
      createdAt: user.createdAt,
    },
  });
});

export const signup = catchAsync(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ username }, { email }],
    },
  });

  if (existingUser) {
    const field = existingUser.username === username ? 'username' : 'email';

    throw new AppError(400, 'Fail to sign up!', {
      type: 'validation',
      fields: [
        {
          field: field,
          message: `A user with this ${field} already exists`,
        },
      ],
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = signToken({ id: user.id });

  user.lastSignIn = new Date();
  await user.save();

  const expiresInHours = Number(process.env.JWT_EXPIRES_IN_HOURS);

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + expiresInHours * 60 * 60 * 1000),
  });
  res.status(201).json({
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      lastSignIn: user.lastSignIn,
      createdAt: user.createdAt,
    },
  });
});

export const signin = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new AppError(400, 'Fail to sign in!', {
      type: 'general',
      message: 'Wrong email address or password',
    });
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword) {
    throw new AppError(400, 'Fail to sign in!', {
      type: 'general',
      message: 'Wrong email address or password',
    });
  }

  const token = signToken({ id: user.id });

  user.lastSignIn = new Date();
  await user.save();

  const expiresInHours = Number(process.env.JWT_EXPIRES_IN_HOURS);

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + expiresInHours * 60 * 60 * 1000),
  });
  res.status(200).json({
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      lastSignIn: user.lastSignIn,
      createdAt: user.createdAt,
    },
  });
});

export const signout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
  });
  res.status(200).json({});
});
