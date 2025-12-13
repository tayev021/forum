import styled from 'styled-components';
import { useForm } from '../../../shared/lib/hooks/useForm';
import { validate } from '../../../shared/lib/utils/validate';
import { Form } from '../../../shared/ui/Form';
import { titleSchema } from '../lib/validators/titleSchema';
import {
  createCategory,
  clearCategoryError,
  useCategory,
} from '../../../entities/category';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import type { CategoryData } from '../../../entities/category/model/types/CategoryData';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface CategoryFormProps {
  closeModal?: () => void;
}

const Container = styled.div`
  background-color: var(--color-bg);
`;

export function CreateCategoryForm({
  closeModal = () => {},
}: CategoryFormProps) {
  const [isCreated, setIsCreated] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { isLoading, error: serverError } = useCategory();
  const { register, getValues, getErrors, setError, handleSubmit } = useForm();
  const values = getValues();
  const errors = getErrors();

  useEffect(() => {
    if (serverError?.type === 'validation') {
      for (const err of serverError.fields) {
        setError(err.field, err.message);
      }
    }
  }, [serverError]);

  useEffect(() => {
    if (serverError?.type === 'general') {
      toast.error(serverError.message);
      dispatch(clearCategoryError());
      setIsCreated(false);
    } else if (!serverError && !isLoading && isCreated) {
      closeModal();
    }
  }, [serverError, isLoading, isCreated]);

  function submit(formData: CategoryData) {
    dispatch(createCategory({ title: formData.title }));
    setIsCreated(true);
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(submit)}>
        <Form.Heading>Create Category</Form.Heading>

        <Form.Row hasError={!!errors['title']}>
          <Form.Label htmlFor="title" hasValue={!!values['title']}>
            Title
          </Form.Label>
          <Form.Input
            id="title"
            type="text"
            value={values['title']}
            {...register('title', { validate: validate(titleSchema) })}
          />
          <Form.InputError message={errors['title']} />
        </Form.Row>

        <Form.Submit disabled={isLoading}>Create</Form.Submit>

        <Form.Loader isLoading={isLoading} />
      </Form>
    </Container>
  );
}
