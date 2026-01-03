import type { User } from '../../../shared/types/User';
import styled from 'styled-components';
import { SERVER_URL } from '../../../shared/constants';
import { HiNoSymbol } from 'react-icons/hi2';

interface UserAvatarProps {
  user: Pick<User, 'username' | 'avatar'> | null;
  size?: number;
  className?: string;
}

interface AvatarProps {
  $size: number;
  $isDeleted?: boolean;
}

const Avatar = styled.div<AvatarProps>`
  width: ${(props) => props.$size}rem;
  height: ${(props) => props.$size}rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--color-text-secondary);
  border-radius: 50%;
  font-size: ${(props) => props.$size * 0.4}rem;
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
  color: var(--color-primary);
  background-color: var(--color-text-secondary);
  overflow: hidden;

  ${(props) =>
    props.$isDeleted &&
    `
    border-color: var(--color-rose-500);
    color: var(--color-rose-500);
    background-color: var(--color-rose-100);

    svg {
      width: 60%;
      height: 60%;
    }
  `}
`;

const Image = styled.img`
  width: 100%;
`;

export function UserAvatar({
  user = null,
  size = 2,
  className,
}: UserAvatarProps) {
  if (!user) {
    return (
      <Avatar className={className} $size={size} $isDeleted={true}>
        <HiNoSymbol />
      </Avatar>
    );
  }

  return (
    <Avatar $size={size} className={className}>
      {user.avatar ? (
        <Image
          src={`${SERVER_URL}/images/avatars/${user.avatar}`}
          alt={`${user.username} avatar`}
        />
      ) : (
        user.username.slice(0, 2)
      )}
    </Avatar>
  );
}
