export interface ProgressEntity {
  id: string;
  userId: string;
  courseId: string;
  completedLessonIds: string[];
  lastWatchedLessonId: string | null;
  updatedAt: string;
}

