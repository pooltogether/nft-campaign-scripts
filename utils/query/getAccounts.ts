import { gql, GraphQLClient } from 'graphql-request';

export default async function getAccounts(
  subgraphURL: string,
  ticket: string,
  blockNumber: number
): Promise<any> {
  const client = new GraphQLClient(subgraphURL, { headers: {} });

  const maxPageSize = 1000;
  const results = [];

  let lastId = '';

  while (true) {
    const queryString = `{
      ticket(
        id: "${ticket}",
        block: { number: ${blockNumber} }
      ) {
        accounts(
          first: ${maxPageSize},
          where: {
            id_gt: "${lastId}"
          }
        ) {
          id
          balance
          delegateBalance
          twabs(
            orderBy: timestamp,
            orderDirection: asc
          ) {
            id
            amount
            delegateBalance
            timestamp
          }
        }
      }
    }`;

    const query = gql`
      ${queryString}
    `;

    const data = await client.request(query);
    results.push(data.ticket.accounts);

    const numberOfResults = data.ticket.accounts.length;
    if (numberOfResults < maxPageSize) {
      break;
    }

    lastId = data.ticket.accounts[data.ticket.accounts.length - 1].id;
  }

  return results.flat(1);
}
