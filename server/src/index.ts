import express from 'express';
import { graphqlHTTP } from 'express-graphql';
const path = require('path');
import cors from 'cors';
import { schema } from './Schema';

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

// production ready
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

let PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Running a GraphQL API server at ${PORT}`));