import express from 'express';
import fallback from 'express-history-api-fallback';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

const graphqlApiUri =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/';

const root = `${__dirname}/build`;
app.use(express.static(root));

// add proxy
app.use(
  '/graphql',
  createProxyMiddleware({
    target: graphqlApiUri,
    changeOrigin: true
  })
);

// history fallback
app.use(fallback('index.html', { root }));

const port = process.argv[2]; // get port from command line argument

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server is listening on port ${port}`));
