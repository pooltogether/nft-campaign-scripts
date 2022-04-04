import { gql, GraphQLClient } from 'graphql-request';

export default async function getAccountsDelegations(
  subgraphURL: string,
  ticket: string,
  blockNumber: number
): Promise<any> {
  const client = new GraphQLClient(subgraphURL, { headers: {} });

  const maxPageSize = 1000;

  const accounts = [];
  let lastAccountId = '';

  while (true) {
    const accountsQueryString = `{
      ticket(
        id: "${ticket}",
        block: { number: ${blockNumber} }
      ) {
        accounts(
          first: ${maxPageSize},
          where: {
            id_gt: "${lastAccountId}"
          }
        ) {
          id
          delegations(first: ${maxPageSize}) {
            id
            delegator {
              id
            }
            delegatee {
              id
            }
            balance
          }
        }
      }
    }`;

    const accountsQuery = gql`
      ${accountsQueryString}
    `;

    const data = await client.request(accountsQuery);
    accounts.push(data.ticket.accounts);

    const numberOfAccounts = data.ticket.accounts.length;

    if (numberOfAccounts < maxPageSize) {
      // we have gotten all the results
      break;
    }

    lastAccountId = data.ticket.accounts[numberOfAccounts - 1].id;
  }

  return accounts.flat(1);
}
