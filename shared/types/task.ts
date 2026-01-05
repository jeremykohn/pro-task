export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  isCompleted: boolean;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}
