import { SignupForm } from '../../../features/signup';
import { Container } from '../../../shared/ui/Container';

export function SignupPage() {
  return (
    <>
      <title>{`Forum | Sign Up`}</title>
      <Container>
        <SignupForm />
      </Container>
    </>
  );
}
