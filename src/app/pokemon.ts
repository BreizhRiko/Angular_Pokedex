export interface Pokemon {
  id: number;
  name: string;
  description?: string;
  types?: string[];
  height?: number;
  weight?: number;
}

export interface PagedData<T> {
  data: T[];
  limit: number;
  offset: number;
}
