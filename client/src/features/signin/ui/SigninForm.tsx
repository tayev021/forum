import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import { useForm } from '../../../shared/lib/hooks/useForm';
import { Form } from '../../../shared/ui/form';
import { HiEnvelope, HiLockClosed } from 'react-icons/hi2';
import { validate } from '../../../shared/lib/utils/validate';
import { emailSchema } from '../../../shared/lib/validators/emailSchema';
import { passwordSchema } from '../../../shared/lib/validators/passwordSchema';
import type { SigninData } from '../../../entities/user/model/types/SigninData';
import { clearUserError, signin, useUser } from '../../../entities/user';
import toast from 'react-hot-toast';

export function SigninForm() {
  const navigate = useNavigate();
  const { user, isLoading, error: serverError } = useUser();
  const dispatch = useAppDispatch();
  const { register, getValues, getErrors, setError, handleSubmit } = useForm();
  const values = getValues();
  const errors = getErrors();

  useEffect(() => {
    if (user) {
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

  function submit(formData: SigninData) {
    dispatch(
      signin({
        email: formData.email,
        password: formData.password,
      })
    );
  }

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Form.Heading>Sign in</Form.Heading>

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
            defaultValue: 'test@test.com',
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
            defaultValue: 'test',
          })}
        />
        <Form.InputError message={errors['password']} />
      </Form.Row>

      <Form.Submit disabled={isLoading}>Sign Up</Form.Submit>

      <Form.Loader isLoading={isLoading} />
    </Form>
  );
}
