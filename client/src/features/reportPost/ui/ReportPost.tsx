import { updateThreadPost, type ThreadPost } from '../../../entities/thread';
import {
  clearPost,
  clearPostError,
  reportPost,
  usePost,
} from '../../../entities/post';
import { useForm } from '../../../shared/lib/hooks/useForm';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Form } from '../../../shared/ui/Form';
import { validate } from '../../../shared/lib/utils/validate';
import { reportReasonSchema } from '../../../shared/lib/validators/reportSchema';
import styled from 'styled-components';

interface ReportPostProps {
  post: ThreadPost;
  closeModal?: () => void;
}

const StyledForm = styled(Form)`
  background-color: var(--color-bg);
`;

const StyledInputError = styled(Form.InputError)``;

export function ReportPost({ post, closeModal = () => {} }: ReportPostProps) {
  const { post: serverPost, isLoading, error: serverError } = usePost();
  const { register, getValues, getErrors, setError, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const values = getValues();
  const errors = getErrors();

  useEffect(() => {
    if (serverError?.type === 'validation') {
      for (const err of serverError.fields) {
        setError(err.field, err.message);
      }
    } else if (serverError?.type === 'general') {
      toast.error(serverError.message);
      dispatch(clearPostError());
    } else if (
      !serverError &&
      !isLoading &&
      serverPost &&
      post.id === serverPost.id
    ) {
      dispatch(
        updateThreadPost({
          postId: serverPost.id,
          post: {
            isReported: true,
          },
        }),
      );
      dispatch(clearPost());
      closeModal();
      toast.success('Your report has been received and will be reviewed');
    }
  }, [serverError, isLoading, serverPost, post]);

  function submit(formData: { reason: string }) {
    dispatch(reportPost({ postId: post.id, reason: formData.reason }));
  }

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Form.Heading>Report post #{post.id}</Form.Heading>

      <Form.Row hasError={!!errors['reason']}>
        <Form.Label htmlFor="reason" hasValue={!!values['reason']}>
          Reason
        </Form.Label>
        <Form.TextArea
          id="reason"
          name="content"
          minLength={1}
          maxLength={1024}
          value={values['reason']}
          {...register('reason', { validate: validate(reportReasonSchema) })}
        />
        <StyledInputError message={errors['reason']} />
      </Form.Row>

      <Form.Submit disabled={isLoading}>Report</Form.Submit>

      <Form.Loader isLoading={isLoading} />
    </StyledForm>
  );
}
