// Implements schema described in simple_dao_proposal.json
export interface SimpleProposal {
  description: string;
  options: string[];
  onsuccess?: string;
  schema_commit?: string;
}
