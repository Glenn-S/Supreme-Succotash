import { Guid } from 'guid-typescript';

export type User = {
  id: Guid;
  name: string;
  email: string;
  phone: string;
};