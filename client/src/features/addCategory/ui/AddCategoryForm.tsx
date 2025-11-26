import styled from 'styled-components';
import { useForm } from '../../../shared/lib/hooks/useForm';
import { validate } from '../../../shared/lib/utils/validate';
import { Form } from '../../../shared/ui/form';
import { titleSchema } from '../lib/validators/titleSchema';
import {
  addCategory,
  clearCategoryError,
  useCategories,
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

export function AddCategoryForm({ closeModal = () => {} }: CategoryFormProps) {
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { isLoading, error: serverError } = useCategories();
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
      setIsAdded(false);
    } else if (!serverError && !isLoading && isAdded) {
      closeModal();
    }
  }, [serverError, isLoading, isAdded]);

  function submit(formData: CategoryData) {
    dispatch(addCategory({ title: formData.title }));
    setIsAdded(true);
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(submit)}>
        <Form.Heading>Add New Category</Form.Heading>

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

        <Form.Submit disabled={isLoading}>Add</Form.Submit>

        <Form.Loader isLoading={isLoading} />
      </Form>
    </Container>
  );
}
