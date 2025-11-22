import styled from 'styled-components';
import { useForm } from '../../../shared/lib/hooks/useForm';
import { validate } from '../../../shared/lib/utils/validate';
import { Form } from '../../../shared/ui/form';
import { titleSchema } from '../lib/validators/titleSchema';
import { addCategory, useCategories } from '../../../entities/category';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import type { CategoryData } from '../../../entities/category/model/types/CategoryData';

interface CategoryFormProps {
  closeModal?: () => void;
}

const Container = styled.div`
  background-color: var(--color-bg);
`;

export function AddCategoryForm({ closeModal = () => {} }: CategoryFormProps) {
  const dispatch = useAppDispatch();
  const { isLoading } = useCategories();
  const { register, getValues, getErrors, handleSubmit } = useForm();
  const values = getValues();
  const errors = getErrors();

  function submit(formData: CategoryData) {
    dispatch(
      addCategory({
        title: formData.title,
      })
    );

    closeModal();
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
