import { createElement } from "react";
import TablePage, { TablePageProps } from "..";

export function createTablePage<T>(props: TablePageProps<T>) {
  return createElement<TablePageProps<T>>(TablePage, props);
}
