export function formatRelativeTime(inputTime: Date | number | string): string {
  const time =
    typeof inputTime === 'number' || typeof inputTime === 'string'
      ? new Date(inputTime)
      : inputTime;
  const now = new Date();
  const diffMs = now.getTime() - time.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const startOfYesterday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1
  );

  if (diffMins < 1) {
    return '1 minute ago';
  } else if (diffMins < 60) {
    return `${diffMins} minutes ago`;
  } else if (diffHours < 12) {
    return `${diffHours} hours ago`;
  } else if (time >= startOfToday) {
    return `today at ${time.getMinutes()}:${time.getHours()}`;
  } else if (time >= startOfYesterday) {
    return `yesterday at ${time.getMinutes()}:${time.getHours()}`;
  } else {
    return `${new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(time)}`;
  }
}
