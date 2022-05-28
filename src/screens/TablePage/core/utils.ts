import { createElement } from "react";
import TablePage, { TablePageProps } from "..";

/**
 * @description This function is used to create a table page.
 * @param props The props of the table page.
 * @returns Created page.
 */
export function createTablePage<T>(props: TablePageProps<T>) {
  return createElement<TablePageProps<T>>(TablePage, props);
}
