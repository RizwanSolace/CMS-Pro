export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  users: number;
  createdAt: string;
}