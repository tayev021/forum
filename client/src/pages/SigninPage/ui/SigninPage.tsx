import { Container } from '../../../shared/ui/Container';
import { SigninForm } from '../../../features/signin';

export function SigninPage() {
  return (
    <>
      <title>{`Forum | Sign In`}</title>
      <Container>
        <SigninForm />
      </Container>
    </>
  );
}
