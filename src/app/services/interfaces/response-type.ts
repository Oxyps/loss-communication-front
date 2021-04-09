export interface ResponseType<T> {
  previous_page: number;
  next_page: number;
  page_size: number;
  data_length: number;

  data: T[];
}
