export interface CourseEntity {
  id: string;
  title: string;
  subtitle?: string;
  thumbnailUrl?: string;
  categoryIds: string[];
  instructorId: string;
  difficulty: string;
  durationHours: number;
  studentCount: number;
  rating: number;
  ratingCount: number;
  tags: string[];
  lastUpdatedAt: string;
  language?: string;
  learningObjectives?: string[];
}

