import { app } from './app';
import { database } from './models';

const PORT = process.env.SERVER_PORT || 8080;

database
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  })
  .catch((error) => {
    console.error(error);
  });
