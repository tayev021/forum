import styled from 'styled-components';
import { useEffect, useState } from 'react';
import {
  addForum,
  clearForumError,
  type ForumData,
} from '../../../entities/forum';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import { useForm } from '../../../shared/lib/hooks/useForm';
import { Form } from '../../../shared/ui/form';
import { validate } from '../../../shared/lib/utils/validate';
import { titleSchema } from '../lib/validators/titleSchema';
import { useForum } from '../../../entities/forum/lib/hooks/useForum';
import toast from 'react-hot-toast';

interface AddForumFormProps {
  categoryId: number;
  closeModal?: () => void;
}

const Container = styled.div`
  background-color: var(--color-bg);
`;

export function AddForumForm({
  categoryId,
  closeModal = () => {},
}: AddForumFormProps) {
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { isLoading, error: serverError } = useForum();
  const { register, getValues, getErrors, handleSubmit } = useForm();
  const values = getValues();
  const errors = getErrors();

  useEffect(() => {
    if (serverError?.type === 'general') {
      toast.error(serverError.message);
      dispatch(clearForumError());
      setIsAdded(false);
    } else if (!serverError && !isLoading && isAdded) {
      closeModal();
    }
  }, [serverError, isLoading, isAdded]);

  function submit(formData: ForumData) {
    dispatch(addForum({ categoryId, title: formData.title }));
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(submit)}>
        <Form.Heading>Add New Forum</Form.Heading>

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
