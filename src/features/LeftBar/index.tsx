import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { useNavigate, matchPath, useLocation } from "react-router-dom";
import routes from "../../config/routes";

export const drawerWidth = 240;

const LeftBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as
    | {
        backgroundLocation?: Location;
      }
    | undefined;

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: `${drawerWidth}px`,
        },
      }}
    >
      <List>
        {routes.map(
          ({
            props: {
              options: { tag, icon, label, disabled },
              provider: {
                options: { withPagination },
              },
            },
          }) => (
            <ListItem
              button
              key={label}
              disabled={disabled}
              onClick={() => {
                navigate("/" + tag + (withPagination ? "/1" : ""));
              }}
              selected={
                matchPath(
                  {
                    path: tag,
                    end: false,
                  },
                  state && state.backgroundLocation
                    ? state.backgroundLocation.pathname
                    : location.pathname
                )
                  ? true
                  : false
              }
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          )
        )}
        <Divider />
        <ListItem button>
          <ListItemText primary="Выйти" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default LeftBar;
