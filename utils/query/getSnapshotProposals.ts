import { gql, GraphQLClient } from 'graphql-request';

import { SNAPSHOT_GRAPH_URL } from '../Constants';

export default async function getSnapshotProposals(snapshotSpaceId: string): Promise<any> {
  const client = new GraphQLClient(SNAPSHOT_GRAPH_URL, { headers: {} });

  const queryString = `{
      proposals (
          first: 100,
          skip: 0,
          where: {
            space_in: ["${snapshotSpaceId}"],
            state: "closed"
          },
          orderBy: "created",
          orderDirection: desc
        ) {
          id
      }
    }`;

  const query = gql`
    ${queryString}
  `;

  const data = await client.request(query);

  return data.proposals;
}
