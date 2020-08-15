import { env, port } from "./config/vars";
import { app } from "./config/express";

app.listen(port, () =>
  console.info(`Event API started on port ${port} (${env})`)
);
 
export default app;
