import styled from 'styled-components';
import { Form } from '../../../shared/ui/Form';
import {
  changePassword,
  clearUserError,
  useUser,
  type PasswordData,
} from '../../../entities/user';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import { useForm } from '../../../shared/lib/hooks/useForm';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { validate } from '../../../shared/lib/utils/validate';
import { passwordSchema } from '../../../shared/lib/validators/passwordSchema';
import { HiKey, HiLockClosed, HiOutlineLockClosed } from 'react-icons/hi2';

const StyledForm = styled(Form)`
  max-width: 30rem;
  padding: 2rem;
  margin: 0 auto;
  border: 2px solid var(--color-primary);
  box-shadow: none;
  background-color: var(--color-bg);
`;

export function ChangePasswordForm() {
  const { isLoading, error: serverError } = useUser();
  const [isChanged, setIsChanged] = useState(false);
  const dispatch = useAppDispatch();
  const { register, getValues, getErrors, setError, handleSubmit, reset } =
    useForm();
  const values = getValues();
  const errors = getErrors();

  useEffect(() => {
    if (serverError?.type === 'validation') {
      for (const err of serverError.fields) {
        setError(err.field, err.message);
      }
      setIsChanged(true);
    } else if (serverError?.type === 'general') {
      toast.error(serverError.message);
      dispatch(clearUserError());
      setIsChanged(false);
    } else if (isChanged) {
      reset();
      toast.success('Password changed successfully');
    }
  }, [serverError, isChanged]);

  const hasConfirmPasswordError =
    !errors['confirmPassword'] &&
    !!values['password'] &&
    !!values['confirmPassword'] &&
    values['password'] !== values['confirmPassword'];

  if (hasConfirmPasswordError) {
    errors['confirmPassword'] =
      'Confirm Password must be equal to the Password';
  }

  function submit(formData: PasswordData) {
    if (document.activeElement instanceof HTMLInputElement) {
      document.activeElement.blur();
    }

    dispatch(
      changePassword({
        previousPassword: formData.previousPassword,
        password: formData.password,
      })
    );

    setIsChanged(true);
  }

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Form.Heading>Change Password</Form.Heading>

      <Form.Row hasError={!!errors['previousPassword']}>
        <HiKey />
        <Form.Label
          htmlFor="previousPassword"
          hasValue={!!values['previousPassword']}
        >
          Previous Password
        </Form.Label>
        <Form.Input
          id="previousPassword"
          type="password"
          value={values['previousPassword']}
          {...register('previousPassword', {
            validate: validate(passwordSchema),
          })}
        />
        <Form.InputError message={errors['previousPassword']} />
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
          {...register('password', { validate: validate(passwordSchema) })}
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

      <Form.Submit disabled={isLoading}>Change Password</Form.Submit>

      <Form.Loader isLoading={isLoading} />
    </StyledForm>
  );
}
