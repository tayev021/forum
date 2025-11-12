import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { User } from '../models';
import { AppError } from '../utils/AppError';
import { signToken } from '../utils/signToken';

export const signup = catchAsync(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    throw new AppError(401, 'Signup error!', [
      {
        field: 'email',
        message: 'A user with this email address already exists.',
      },
    ]);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    user: {
      username: user.dataValues.username,
    },
  });
});

export const signin = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new AppError(401, 'Wrong email address or password.');
  }

  const isCorrectPassword = await bcrypt.compare(
    password,
    user.dataValues.password
  );

  if (!isCorrectPassword) {
    throw new AppError(401, 'Wrong email address or password.');
  }

  const token = signToken({ id: user.dataValues.id });

  user.lastSignIn = new Date();
  await user.save();

  const expiresInHours = Number(process.env.JWT_EXPIRES_IN_HOURS);

  res.cookie('jwt', token, {
    expires: new Date(Date.now() + expiresInHours * 60 * 60 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    user: {
      id: user.dataValues.id,
      username: user.dataValues.username,
      email: user.dataValues.email,
      avatar: user.dataValues.avatar,
      role: user.dataValues.role,
      lastSignIn: user.dataValues.lastSignIn,
      createdAt: user.dataValues.createdAt,
    },
  });
});

export const signout = catchAsync(async (req: Request, res: Response) => {
  res.cookie('jwt', 'sign out', {
    expires: new Date(Date.now() + 1000),
    httpOnly: true,
  });
  res.status(200).json({});
});
