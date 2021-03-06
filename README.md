# NFT Campaign Scripts

Repository containing the scripts used to compile the list of eligible addresses that will be able to claim NFTs through [Galaxy](https://galaxy.eco).

## Development

This project uses [graphql-request](https://www.npmjs.com/package/graphql-request) to query GraphQL endpoints.

### Networks

This project uses two subgraphs, the TWAB subgraph and the TWAB Delegator one.
Use the following functions in `utils/network/getTWABSubgraphUrl.ts` to retrieve the subgraph url per network:
- getTWABSubgraphUrl
- getTWABDelegatorSubgraphUrl

### Queries

GraphQL queries are stored in the `utils/query` directory. Each query are stored in a separate file.

### Requests

Requests are stored in the `utils/request` directory. Each request are stored in a separate file.

To create a request, first call the `getTWABSubgraphUrl` function and pass the chain id for which you want to query the subgraph. Then, import the query you want to perform. For example:
```
  const subgraphURL = getTWABSubgraphUrl(chainId);
  const accounts = await getAccounts(subgraphURL, ticket.toLowerCase(), blockNumber);

  return accounts.flat(1);
```

### Commands

To compute results per season and per week:

```
yarn compute:season-one:week-one
yarn compute:season-one:week-four
```

### Scripts

Scripts are stored per NFT season and week in the `scripts` directory. For example, the script for week one of the first season is stored in `season/one/scripts/week-one.ts`.

## Results

Results are exported as CSV per season and week. For example, results for week one of the first season are exported in `season/one/results/week-one.csv`.

## Code quality

[Prettier](https://prettier.io) is used to format TypeScript code. Use it by running:

```
yarn format
```
Or per file:

```
yarn format:file utils/network/getTWABSubgraphUrl.ts
```
