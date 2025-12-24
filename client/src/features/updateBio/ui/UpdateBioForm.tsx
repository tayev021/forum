import styled from 'styled-components';
import { PrimaryButton } from '../../../shared/ui/PrimaryButton';
import { clearUserError, useUser } from '../../../entities/user';
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch';
import toast from 'react-hot-toast';
import { updateBio } from '../../../entities/user/model/thunks/updateBio';
import { HiArrowTurnDownLeft, HiChevronRight } from 'react-icons/hi2';

interface UpdateBioFormProps {
  handleClose: () => void;
}

const Form = styled.form`
  display: grid;
  grid-template-rows: 1fr min-content;
  gap: 1rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 15rem;
  padding: 1rem;
  border-color: transparent;
  background-color: var(--color-grey-200);
  border-radius: 0.4rem;
  resize: none;
`;

const Actions = styled.div`
  display: flex;
  justify-content: end;
  gap: 2rem;
`;

const Button = styled(PrimaryButton)`
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: none;

  &:hover {
    transform: translateX(-2px);
    box-shadow: none;
  }

  &:active {
    transform: translateX(0);
    box-shadow: none;
  }
`;

const CancelButton = styled(Button)`
  background-color: var(--color-rose-500);
`;

export function UpdateBioForm({ handleClose }: UpdateBioFormProps) {
  const { user, isLoading, error: serverError } = useUser();
  const [bio, setBio] = useState(user?.bio ? user.bio : '');
  const [isUpdated, setIsUpdated] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (serverError?.type === 'general') {
      toast.error(serverError.message);
      dispatch(clearUserError());
      handleClose();
    } else if (!serverError && !isLoading && isUpdated) {
      handleClose();
    }
  }, [serverError, isLoading, isUpdated]);

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setBio(event.target.value);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    dispatch(updateBio({ bio }));
    setIsUpdated(true);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Textarea
        name="content"
        minLength={1}
        maxLength={1024}
        required
        placeholder="Write information about yourself here…"
        value={bio}
        onChange={handleChange}
      />
      <Actions>
        <CancelButton type="button" onClick={handleClose}>
          <HiArrowTurnDownLeft /> Cancel
        </CancelButton>
        <Button type="submit">
          Edit <HiChevronRight />
        </Button>
      </Actions>
    </Form>
  );
}
