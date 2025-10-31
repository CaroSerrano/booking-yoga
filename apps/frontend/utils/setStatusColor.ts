import { ClassStatus } from 'booking-domain';

export function setStatusColor(status: ClassStatus): string {
  switch (status) {
    case ClassStatus.SCHEDULE:
      return 'bg-green-500/70';
    case ClassStatus.CANCELLED:
      return 'bg-red-500/80';
    default:
      return 'bg-gray-500/80';
  }
}
