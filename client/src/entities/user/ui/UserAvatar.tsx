import styled from 'styled-components';

interface UserAvatarProps {
  username: string;
  avatar: string | null;
}

const Avatar = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  border: 1px solid var(--color-text-secondary);
  border-radius: 50%;
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1;
  color: var(--color-primary);
  background-color: var(--color-text-secondary);
`;

const Placeholder = styled.div``;

const Image = styled.img`
  width: 100%;
`;

export function UserAvatar({ username, avatar }: UserAvatarProps) {
  return (
    <Avatar>
      {avatar ? (
        <Image src={avatar} alt={`${username} avatar`} />
      ) : (
        <Placeholder>{username.slice(0, 2)}</Placeholder>
      )}
    </Avatar>
  );
}
