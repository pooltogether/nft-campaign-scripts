import { gql, GraphQLClient } from 'graphql-request';

import { GOVERNANCE_SUBGRAPH_URL } from '../Constants';

export default async function getGovernanceProposals(): Promise<any> {
  const client = new GraphQLClient(GOVERNANCE_SUBGRAPH_URL, { headers: {} });

  const queryString = `{
    proposals (
      first: 50,
      orderBy: startBlock,
      orderDirection: asc
    ) {
        id
        votes {
          id
          voter {
            id
            tokenHoldersRepresented {
              id
            }
          }
        }
      }
    }`;

  const query = gql`
    ${queryString}
  `;

  const data = await client.request(query);

  return data.proposals;
}
