import styled from 'styled-components';
import { Widget } from '../../../shared/ui/WidgetKit';
import { useState } from 'react';
import { useUser } from '../../../entities/user';
import { UserAvatar } from '../../../entities/user/ui/UserAvatar';
import { ChangeAvatar } from '../../../features/changeAvatar';
import { HiPencilSquare } from 'react-icons/hi2';
import { UpdateBioForm } from '../../../features/updateBio';

const Main = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 4rem;
  padding: 2rem 4rem;

  @media (max-width: 1100px) {
    gap: 2rem;
    padding: 2rem;
  }

  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, max-content);
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const StyledEditButton = styled(Widget.EditButton)`
  width: 2.4rem;
  height: 2.4rem;
  float: right;
  margin: 0 0 1rem 1rem;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const NoBio = styled.p`
  padding: 2rem 0;
  text-align: center;
  font-style: italic;
  color: var(--color-grey-500);
`;

export function AccountBioWidget() {
  const [isUpdating, setIsUpdating] = useState(false);
  const { user } = useUser();

  if (!user) return null;

  return (
    <Widget.Container>
      <Widget.Header>
        <Widget.Title>Bio</Widget.Title>
      </Widget.Header>
      <Main>
        <AvatarContainer>
          <UserAvatar user={user} size={16} />
          <ChangeAvatar />
        </AvatarContainer>
        <div>
          {isUpdating ? (
            <UpdateBioForm handleClose={() => setIsUpdating(false)} />
          ) : (
            <>
              <StyledEditButton onClick={() => setIsUpdating(true)}>
                <HiPencilSquare />
              </StyledEditButton>
              {user.bio ? (
                <p>{user.bio}</p>
              ) : (
                <NoBio>
                  You have not added any information about yourself yet
                </NoBio>
              )}
            </>
          )}
        </div>
      </Main>
    </Widget.Container>
  );
}
