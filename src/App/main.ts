import app from './express';
import routes from './routes/index';
import { run } from './database';

run();
routes(app);

export const server = app.listen(3000, () => {
  console.log('Server is running');
});

export default app;
