import { useEffect } from 'react';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import { useForm } from '../../../shared/lib/hooks/useForm';
import {
  clearUserError,
  signup,
  useUser,
  type SignupData,
} from '../../../entities/user';
import { Form } from '../../../shared/ui/Form';
import { validate } from '../../../shared/lib/utils/validate';
import { emailSchema } from '../../../shared/lib/validators/emailSchema';
import { usernameSchema } from '../../../shared/lib/validators/usernameSchema';
import { passwordSchema } from '../../../shared/lib/validators/passwordSchema';
import {
  HiEnvelope,
  HiLockClosed,
  HiOutlineLockClosed,
  HiUserCircle,
} from 'react-icons/hi2';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

export function SignupForm() {
  const navigate = useNavigate();
  const { user, isLoading, error: serverError } = useUser();
  const dispatch = useAppDispatch();
  const { register, getValues, getErrors, setError, handleSubmit } = useForm();
  const values = getValues();
  const errors = getErrors();

  useEffect(() => {
    if (user?.username) {
      navigate('/');
    }
  }, [user]);

  useEffect(() => {
    if (serverError?.type === 'validation') {
      for (const err of serverError.fields) {
        setError(err.field, err.message);
      }
    } else if (serverError?.type === 'general') {
      toast.error(serverError.message);
      dispatch(clearUserError());
    }
  }, [serverError]);

  const hasConfirmPasswordError =
    !errors['confirmPassword'] &&
    !!values['password'] &&
    !!values['confirmPassword'] &&
    values['password'] !== values['confirmPassword'];

  if (hasConfirmPasswordError) {
    errors['confirmPassword'] =
      'Confirm Password must be equal to the Password';
  }

  function submit(formData: SignupData) {
    dispatch(
      signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
    );
  }

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Form.Heading>Sign up to join the forum</Form.Heading>

      <Form.Row hasError={!!errors['username']}>
        <HiUserCircle />
        <Form.Label htmlFor="username" hasValue={!!values['username']}>
          Username
        </Form.Label>
        <Form.Input
          id="username"
          type="text"
          value={values['username']}
          {...register('username', {
            validate: validate(usernameSchema),
          })}
        />
        <Form.InputError message={errors['username']} />
      </Form.Row>

      <Form.Row hasError={!!errors['email']}>
        <HiEnvelope />
        <Form.Label htmlFor="email" hasValue={!!values['email']}>
          Email
        </Form.Label>
        <Form.Input
          id="email"
          type="text"
          value={values['email']}
          {...register('email', {
            validate: validate(emailSchema),
          })}
        />
        <Form.InputError message={errors['email']} />
      </Form.Row>

      <Form.Row hasError={!!errors['password']}>
        <HiLockClosed />
        <Form.Label htmlFor="password" hasValue={!!values['password']}>
          Password
        </Form.Label>
        <Form.Input
          id="password"
          type="password"
          value={values['password']}
          {...register('password', {
            validate: validate(passwordSchema),
          })}
        />
        <Form.InputError message={errors['password']} />
      </Form.Row>

      <Form.Row
        hasError={!!errors['confirmPassword'] || hasConfirmPasswordError}
      >
        <HiOutlineLockClosed />
        <Form.Label
          htmlFor="confirmPassword"
          hasValue={!!values['confirmPassword']}
        >
          Confirm Password
        </Form.Label>
        <Form.Input
          id="confirmPassword"
          type="password"
          value={values['confirmPassword']}
          {...register('confirmPassword', {
            validate: validate(passwordSchema),
          })}
        />
        <Form.InputError message={errors['confirmPassword']} />
      </Form.Row>

      <Form.Submit disabled={isLoading}>Sign Up</Form.Submit>

      <Form.Loader isLoading={isLoading} />
    </Form>
  );
}
