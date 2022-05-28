import { Snackbar } from "@mui/material";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import routes from "./config/routes";

function App() {
  const location = useLocation();

  const state = location.state as {
    backgroundLocation?: Location;
  };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        {routes.map((route) => (
          <Route
            key={route.props.options.tag}
            path={`/${route.props.options.tag}${
              route.props.provider.options.withPagination ? "/:page" : ""
            }`}
            element={route}
          />
        ))}
        <Route
          path="/"
          element={
            <Navigate
              to={`/${routes[0].props.options.tag}${
                routes[0].props.provider.options.withPagination ? "/1" : ""
              }`}
              replace={true}
            />
          }
        />
      </Routes>
      <Snackbar />
    </>
  );
}

export default App;
