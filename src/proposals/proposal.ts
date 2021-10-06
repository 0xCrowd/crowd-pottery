export type CeramicSchema = {
  stream_id: string;
  commit: string;
};

export interface Proposal {
  ceramic_proposal_schema: CeramicSchema; // It's very important for all proposals of one type to follow specified schema
  ceramic_vote_schema: CeramicSchema;
  proposal: Object | undefined; // The content of the Proposal in Ceramic Network
}
