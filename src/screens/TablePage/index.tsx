import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Button,
  Tooltip,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Pagination } from "../../features/Pagination";
import { Main } from "../Main";
import { Placeholder } from "../../features/EmptyPlaceholder";
import { Fragment, ReactNode, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataProvider,
  DataProviderWithPagination,
  Schema,
  ToolbarType,
} from "./core/types";

export type TablePageProps<T> = {
  options: {
    icon: ReactNode;
    tag: string;
    label: string;
    disabled?: boolean;
  };
  schema: Schema<T, keyof T>;
  provider: DataProvider<T> | DataProviderWithPagination<T>;
  toolbar?: ToolbarType;
};

const TablePage = <T,>({
  options: { tag, label },
  schema,
  provider,
  toolbar,
}: TablePageProps<T>) => {
  const { withPagination } = provider.options;
  const { page } = useParams();
  const currentPage = page ? +page : 1;
  const { getList } = provider;
  const [list, setList] =
    useState<Awaited<ReturnType<typeof provider.getList>>>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (withPagination) {
      setIsLoading(true);
      getList({
        limit: provider.options.perPage,
        skip:
          currentPage === 1
            ? 0
            : provider.options.perPage * currentPage - provider.options.perPage,
      })
        .then(setList)
        .then(() => setIsLoading(false))
        .catch(() => setIsError(true));
    }
  }, [currentPage, getList, withPagination]);

  return (
    <Main>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {label}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {toolbar?.map((button, i) => {
            const tooltip = button.tooltip;

            const renderToolbarButton = () => {
              switch (button.type) {
                case "label":
                  return (
                    <Button
                      key={i}
                      variant="contained"
                      onClick={button.onClick}
                      sx={{
                        mr: 2,
                      }}
                    >
                      {label}
                    </Button>
                  );
                case "custom":
                  return <Fragment key={i}>{button.render()}</Fragment>;
                default:
                  throw new Error("Unknown button type");
              }
            };

            return tooltip ? (
              <Tooltip key={i} title={tooltip}>
                {renderToolbarButton()}
              </Tooltip>
            ) : (
              renderToolbarButton()
            );
          })}
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" overflow="auto">
        <Table size="small">
          <TableHead>
            <TableRow>
              {Object.keys(schema.properties).map((key) => {
                const property = schema.properties[key as keyof T];

                if (!property) {
                  throw new Error("Unknown property");
                }

                if (!property.type) {
                  throw new Error("Property type is not defined");
                }

                const { type } = property;

                switch (type) {
                  case "text":
                    return (
                      <TableCell key={key}>
                        <strong>{property.label}</strong>
                      </TableCell>
                    );
                  case "custom":
                    return (
                      <TableCell key={key}>
                        <strong>{property.label}</strong>
                      </TableCell>
                    );
                  default:
                    throw new Error("Unknown cell type");
                }
              })}
              {schema.extraOptions &&
                Object.keys(schema.extraOptions).map((key) => (
                  <TableCell key={key}></TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              {isLoading ||
                list?.data.result?.map((row, i) => (
                  <TableRow key={i}>
                    {Object.keys(schema.properties).map((key) => {
                      const value = row[key as keyof T];
                      const cell = schema.properties[key as keyof T];

                      switch (cell?.type) {
                        case "text":
                          return (
                            <TableCell
                              key={key}
                              sx={{
                                width: "100%",
                                textAlign: cell.centered ? "center" : "left",
                              }}
                              onClick={() => cell.onClick && cell.onClick(row)}
                            >
                              {cell.onClick ? (
                                <button>{value as unknown as ReactNode}</button>
                              ) : (
                                (value as unknown as ReactNode)
                              )}
                            </TableCell>
                          );
                        case "custom":
                          return (
                            <TableCell
                              key={key}
                              sx={{
                                width: "100%",
                              }}
                            >
                              {cell.renderCell(value, row)}
                            </TableCell>
                          );
                        default:
                          throw new Error("Unknown cell type");
                      }
                    })}
                    {schema.extraOptions?.map((extraOption, i) => {
                      switch (extraOption.type) {
                        case "label":
                          return (
                            <TableCell
                              key={i}
                              onClick={() => extraOption.onClick(row)}
                            >
                              {extraOption.label}
                            </TableCell>
                          );
                        case "edit":
                          return (
                            <TableCell
                              key={i}
                              onClick={() => extraOption.onClick(row)}
                            >
                              <EditIcon />
                            </TableCell>
                          );
                        case "delete":
                          return (
                            <TableCell
                              key={i}
                              onClick={() => extraOption.onClick(row)}
                            >
                              <DeleteIcon
                                sx={{
                                  fill: "red",
                                }}
                              />
                            </TableCell>
                          );
                        case "custom":
                          return (
                            <TableCell key={i}>
                              {extraOption.Component(row)}
                            </TableCell>
                          );

                        default: {
                          throw new Error("Invalid extra option key");
                        }
                      }
                    })}
                  </TableRow>
                ))}
            </>
          </TableBody>
        </Table>
        {isLoading && (
          <CircularProgress
            sx={{
              mt: 2,
              alignSelf: "center",
            }}
          />
        )}
        {isError && <Placeholder type="error" />}
        {list?.data.result?.length === 0 && <Placeholder />}
        {list &&
        "total" in list &&
        list.total &&
        "perPage" in provider.options &&
        provider.options.perPage &&
        list?.data.result?.length ? (
          <Pagination
            currentPage={currentPage}
            totalPages={list.total / provider.options.perPage}
            tag={tag}
          />
        ) : null}
      </Box>
    </Main>
  );
};

export default TablePage;
