/**
 * Application entry point
 */

import { createApp } from './api/app.js';

const PORT = process.env.PORT || 3000;
const app = createApp();

app.listen(PORT, () => {
  console.log(`Aion Hello Console running on http://localhost:${PORT}`);
});
