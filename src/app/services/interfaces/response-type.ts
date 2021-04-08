export interface ResponseType<T> {
  data: T[];

  current_page: number;
  previous_page: number;
  next_page: number;

  total: number;
}
