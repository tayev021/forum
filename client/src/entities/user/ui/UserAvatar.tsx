import styled from 'styled-components';

interface UserAvatarProps {
  username: string;
  avatar: string | null;
  size?: number;
  className?: string;
}

interface AvatarProps {
  $size: number;
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
`;

const Image = styled.img`
  width: 100%;
`;

export function UserAvatar({
  username,
  avatar,
  size = 2,
  className,
}: UserAvatarProps) {
  return (
    <Avatar $size={size} className={className}>
      {avatar ? (
        <Image src={avatar} alt={`${username} avatar`} />
      ) : (
        username.slice(0, 2)
      )}
    </Avatar>
  );
}
