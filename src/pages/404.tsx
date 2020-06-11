import * as React from "react";
import { NotFound404 } from "components";

export const NotFound: React.FC = () => {
  React.useEffect(() => {
    document.title = "404 Page not found";
  }, []);

  return <NotFound404 />;
};
