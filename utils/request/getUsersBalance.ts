import getSubgraphUrl from '../network/getSubgraphUrl';
import getUsersAccount from '../query/getUsersAccount';

export default async function getUsersBalance(
  chainId: string,
  ticket: string,
  blockNumber: number
): Promise<any[]> {
  const subgraphURL = getSubgraphUrl(chainId);
  const usersAccount = await getUsersAccount(subgraphURL, ticket.toLowerCase(), blockNumber);

  return usersAccount.flat(1);
}
