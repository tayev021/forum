import { app } from './app';
import { database } from './models';

const PORT = process.env.PORT || 3000;

database
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log('Server is listening'));
  })
  .catch((error) => {
    console.error(error);
  });
