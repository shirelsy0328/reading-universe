import type { BookStatus } from "@/lib/mockData";

export type BookInput = {
  title: string;
  author: string;
  coverUrl: string;
  rating: number;
  status: BookStatus;
  progress?: string;
  quote?: string;
  thoughts?: string;
};
