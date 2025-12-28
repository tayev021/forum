import { ChangePasswordForm } from '../../../features/changePassword';
import { Widget } from '../../../shared/ui/WidgetKit';

export function AccountPasswordWidget() {
  return (
    <Widget.Container>
      <Widget.Header>
        <Widget.Title>Change Password</Widget.Title>
      </Widget.Header>
      <div>
        <ChangePasswordForm />
      </div>
    </Widget.Container>
  );
}
