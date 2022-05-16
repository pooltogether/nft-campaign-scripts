import getGovernanceProposalsQuery from './getGovernanceProposals';

type Proposal = {
  id: string;
  votes: [
    {
      voter: {
        id: string;
        tokenHoldersRepresented: [
          {
            id: string;
          }
        ];
      };
    }
  ];
};

export default async function getGovernanceVoters(): Promise<any> {
  const proposals = await getGovernanceProposalsQuery();

  const voters: { voter: string }[] = [];

  await proposals.map(async (proposal: Proposal) => {
    proposal.votes.map(({ voter }) => {
      voters.push({ voter: voter.id });
      voter.tokenHoldersRepresented.map((tokenHolderRepresented) => {
        voters.push({ voter: tokenHolderRepresented.id });
      });
    });
  });

  return voters;
}
