import { Container } from '../../../../shared/ui/Container';
import { SignupForm } from '../../../../features/signup';

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
