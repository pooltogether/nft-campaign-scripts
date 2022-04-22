import { getTWABDelegatorSubgraphUrl } from '../network/getSubgraphUrl';
import getAccountsDelegationsQuery from '../query/getAccountsDelegations';

export default async function getAccountsDelegations(
  chainId: string,
  ticket: string,
  blockNumber: number
): Promise<any[]> {
  const subgraphURL = getTWABDelegatorSubgraphUrl(chainId);
  const accountsDelegations = await getAccountsDelegationsQuery(
    subgraphURL,
    ticket.toLowerCase(),
    blockNumber
  );

  return accountsDelegations.flat(1);
}
