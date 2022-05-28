import { Box, BoxProps } from "@mui/material";
import LeftBar, { drawerWidth } from "../../features/LeftBar";

export const Main: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box m={2} {...props}>
      <LeftBar />
      <Box
        sx={{
          ml: `${drawerWidth}px`,
          position: "relative",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
