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

export interface DataCellTypeCommon {
  /**
   * The label of the column.
   */
  label: string;
}

export interface DataCellTypeWithRender<T, K> extends DataCellTypeCommon {
  /**
   * A cell with custom renderer.
   */
  type: "custom";
  renderCell: (value: K, data: T) => React.ReactNode;
}

export interface DataCellWithText<T> extends DataCellTypeCommon {
  /**
   * A cell with a text.
   */
  type: "text";
  onClick?: (value: T) => void;
  /**
   * If true, the cell will be aligned to the center.
   * Else it will be aligned to the left.
   */
  centered?: boolean;
}

export type Property<T, K> = DataCellWithText<T> | DataCellTypeWithRender<T, K>;

/**
 * This type is used to describe a data cell.
 * @template T The type of the data.
 * @template K The key of the data.
 *
 */
export type DataTableType<T, K extends keyof T> = {
  /**
   * The keys of the data.
   */
  properties: Partial<{
    [P in K]: Property<T, T[P]>;
  }>;
  /**
   * This property is used to add additional cells.
   * @template T The type of the data.
   * @example
   * ```
   *  [{
        type: "edit",
        onClick: (value) => {
          openModal(value);
        },
      }]
    * ```
   */
  extraOptions?: Array<ExtraOption<T>>;
};

/**
 * This type is used to describe a custom extra option.
 */
export type ExtraOption<T> =
  | ExtraOptionTypeCustom<T>
  | ExtraOptionTypeWithLabel<T>
  | ExtraOptionTypeWithIcons<T>;

export type ExtraOptionTypeCustom<T> = {
  type: "custom";
  Component: (value: T) => React.ReactNode;
};

/**
 * This type is used to describe a label extra option.
 */
export type ExtraOptionTypeWithLabel<T> = {
  type: "label";
  onClick: (value: T) => void;
  label: string;
};

/**
 * This type is used to describe an icon extra option.
 */
export type ExtraOptionTypeWithIcons<T> = {
  type: "edit" | "delete";
  onClick: (value: T) => void;
};

/**
 * This type is used to describe a toolbar buttons.
 */
export type ToolbarType = Array<
  ToolbarButtonWithLabelType | ToolbarButtonTypeWithCustomRender
>;

export type ToolbarTypeCommon = {
  /**
   * The tooltip for the button.
   */
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
