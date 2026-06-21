export interface InstructorEntity {
  id: string;
  name: string;
  headline: string;
  avatarUrl?: string;
  bio?: string;
  social?: {
    twitter?: string;
    github?: string;
  };
  expertiseTags?: string[];
  studentCount?: number;
}

