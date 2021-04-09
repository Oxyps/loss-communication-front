export interface RequestQueryType<T> {
  search?: string;
  page?: number | string;

  // only for models that have this field
  cpf?: string;
}
