import { app } from './app';
import { database } from './config/database';

const PORT = process.env.PORT || 3000;

database
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log('Server is listening'));
  })
  .catch((error) => {
    console.error(error);
  });
