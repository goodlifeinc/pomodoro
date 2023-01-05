import React from "react";
import { Box, Button } from "grommet";
import { navigate } from "../../utils";

const Header: React.FC = () => {
  return (
    <Box
          tag="header"
          direction="row"
          align="center"
          justify="start"
          background="brand"
          pad={{ left: "medium", right: "small", vertical: "small" }}
          elevation="medium"
        >
          <Button label="All Pomodoros" onClick={() => navigate('/')} />
          <Button label="Add Pomodoro" onClick={() => navigate('/new')} />
        </Box>
  );
};

export default Header;
