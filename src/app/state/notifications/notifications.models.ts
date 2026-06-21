export interface NotificationEntity {
  id: string;
  userId: string;
  type: 'progress' | 'recommendation' | string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}

