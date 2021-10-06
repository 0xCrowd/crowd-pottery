import { Proposal, CeramicSchema } from './proposal';

export class SimpleProposal implements Proposal {
  ceramic_proposal_schema: CeramicSchema;
  ceramic_vote_schema: CeramicSchema;
  proposal: Object | undefined;
}
