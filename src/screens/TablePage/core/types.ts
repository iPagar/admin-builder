import { ReactNode } from "react";

export type GetListType<T> = {
  data: { result?: T[] };
};

export type ListWithPaginationType<T> = GetListType<T> & {
  total?: number;
};

export type GetPaginationParams = {
  limit: number;
  skip: number;
};

export type DataProviderWithPagination<T> = {
  options: {
    withPagination: true;
    perPage: number;
  };
  getList: (props: GetPaginationParams) => Promise<ListWithPaginationType<T>>;
};

export type DataProvider<T> = {
  options: {
    withPagination: false;
  };
  getList: () => Promise<GetListType<T>>;
};

export type Schema<T, K extends keyof T> = DataTableType<T, K>;

export type DataCellTypeCommon = {
  label: string;
};

export type DataCellTypeWithRender<T> = DataCellTypeCommon & {
  type: "custom";
  renderCell: (value: T) => React.ReactNode;
};

export type DataCellTypeWithLabel = DataCellTypeCommon & {
  type: "label";
};

export type DataTableType<T, K extends keyof T> = {
  properties: Partial<{
    [P in K]: DataCellTypeWithLabel | DataCellTypeWithRender<T[P]>;
  }>;
  extraOptions?: {
    [n: string]:
      | ExtraOptionType<T>
      | ExtraOptionTypeEdit<T>
      | ExtraOptionTypeRemove<T>;
  };
};

export type ExtraOptionType<T> = {
  type: "custom";
  Component: (value: T) => React.ReactNode;
};

export type ExtraOptionTypeEdit<T> = {
  type: "edit";
  onClick: (value: T) => void;
};

export type ExtraOptionTypeRemove<T> = {
  type: "remove";
  onClick: (value: T) => void;
};

export type ToolbarType = Array<
  ToolbarButtonWithLabelType | ToolbarButtonTypeWithCustomRender
>;

export type ToolbarTypeCommon = {
  tooltip?: string;
};

export type ToolbarButtonWithLabelType = ToolbarTypeCommon & {
  type: "label";
  label: string;
  onClick: () => void;
};

export type ToolbarButtonTypeWithCustomRender = ToolbarTypeCommon & {
  type: "custom";
  render: () => ReactNode;
};
