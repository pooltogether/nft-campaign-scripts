import { SNAPSHOT_POOLTOGETHER_ID, SNAPSHOT_POOL_POOL_ID } from '../Constants';
import getSnapshotVotersQuery from '../query/getSnapshotVoters';
import getGovernanceVotersQuery from '../query/getGovernanceVoters';

export default async function getSnapshotVoters(): Promise<any[]> {
  const poolTogetherSnapshotVoters = await getSnapshotVotersQuery(SNAPSHOT_POOLTOGETHER_ID);
  const poolPOOLSnapshotVoters = await getSnapshotVotersQuery(SNAPSHOT_POOL_POOL_ID);
  const governanceVoters = await getGovernanceVotersQuery();

  return [...governanceVoters, ...poolTogetherSnapshotVoters, ...poolPOOLSnapshotVoters];
}
