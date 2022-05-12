import { gql, GraphQLClient } from 'graphql-request';

import { SNAPSHOT_GRAPH_URL } from '../Constants';
import getSnapshotProposalsQuery from './getSnapshotProposals';

export default async function getSnapshotVoters(snapshotSpaceId: string): Promise<any> {
  const proposals = await getSnapshotProposalsQuery(snapshotSpaceId);

  const client = new GraphQLClient(SNAPSHOT_GRAPH_URL, { headers: {} });

  const results = await proposals.map(async (proposal: { id: string }) => {
    const queryString = `{
      votes (
        first: 2500
        skip: 0
        where: {
          proposal: "${proposal.id}"
        }
        orderBy: "created",
        orderDirection: desc
      ) {
        voter
      }
    }`;

    const query = gql`
      ${queryString}
    `;

    const data = await client.request(query);

    const voters: { voter: string }[] = [];

    await data.votes.map(({ voter }: { voter: string }) =>
      voters.push({ voter: voter.toLowerCase() })
    );

    return voters;
  });

  return (await Promise.all(results)).flat(1);
}
