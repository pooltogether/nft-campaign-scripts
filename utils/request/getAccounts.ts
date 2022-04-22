import { getTWABSubgraphUrl } from '../network/getSubgraphUrl';
import getAccountsQuery from '../query/getAccounts';

export default async function getAccounts(
  chainId: string,
  ticket: string,
  blockNumber: number
): Promise<any[]> {
  const subgraphURL = getTWABSubgraphUrl(chainId);
  const accounts = await getAccountsQuery(subgraphURL, ticket.toLowerCase(), blockNumber);

  return accounts.flat(1);
}
