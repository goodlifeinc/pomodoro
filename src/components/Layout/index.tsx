import React from "react";
import { Box } from "grommet";

const Layout: React.FC = ({ children }) => {
  return (
    <Box fill>{children}</Box>
  );
};

export default Layout;
