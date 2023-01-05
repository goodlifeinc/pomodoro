import React, { useMemo } from "react";
import { Box } from "grommet";

import AddPomodoro from "../../pages/AddPomodoro";
import Main from "../../pages/Main";
import usePathname from "../../hooks/usePathname";

const routes: any = {
  '/new': <AddPomodoro />,
  '/': <Main />
};

const Content: React.FC = () => {
  const pathname = usePathname();
  const view = useMemo(() => {
    return routes[pathname] || <Main />;
  }, [pathname]);
  
  return (
    <Box flex pad="large">
          {view}
        </Box>
  );
};

export default Content;
