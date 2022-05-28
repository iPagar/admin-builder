import exampleEndpoints, { Product } from "../app/slices/exampleEndpoints";
import { appDispatch } from "../app/store";
import { createTablePage } from "../screens/TablePage/core/utils";
import FeedIcon from "@mui/icons-material/Feed";

const supportEntity = createTablePage<Product>({
  options: {
    label: "Тикеты",
    tag: "tickets",
    icon: <FeedIcon />,
  },
  schema: {
    properties: {
      title: {
        type: "label",
        label: "Заголовок",
      },
      id: {
        type: "custom",
        label: "Номер",
        renderCell: (value) => <a href={`/tickets/${value}`}>{value}</a>,
      },
    },
    extraOptions: {
      edit: {
        type: "edit",
        onClick: (value) => {},
      },
      some: {
        type: "custom",
        Component: (value) => (
          <div
            onClick={() => {
              alert(value.title);
            }}
          >
            редактировать
          </div>
        ),
      },
    },
  },
  toolbar: [
    {
      type: "label",
      label: "Добавить",
      onClick: () => {},
    },
    {
      type: "custom",
      render: () => <div>Добавить</div>,
    },
  ],
  provider: {
    options: {
      withPagination: true,
      perPage: 10,
    },
    getList: async function ({ skip, limit }) {
      const { data } = await appDispatch(
        exampleEndpoints.endpoints.exampleControllerGetAllProducts.initiate({
          skip,
          limit,
        })
      );

      return {
        data: { result: data?.products },
        total: data?.total,
      };
    },
  },
});

const routes = [supportEntity];

export default routes;
