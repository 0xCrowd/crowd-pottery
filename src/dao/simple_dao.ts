import { TileDocument } from '@ceramicnetwork/stream-tile';
import { Dao } from './dao';
import { SimpleProposal, SimpleProposalInterface } from '../proposals/simple_proposal';

export interface SimpleDaoInterface {
  name: string; // DAO name
  l1_type: string; // L1 type
  l1_vault: string; // L1 DAO Asset vault address
  l1_token: string; // L1 DAO Token address
  proposal_total_threshold: number; // 0 - 1 which share of all holders should vote to proposal be legit?
  proposal_for_threshold: number; // 0 - 1 which share of VOTED users should vote "for" for proposal pass?
  proposal_timeout?: number; // (secs) every proposal will be resolved after the timeout
  proposals_registry?: string;
}

// Yay, "out of the box" simplified experience!
export class SimpleDao extends Dao {
  async create(params: SimpleDaoInterface): Promise<TileDocument> {
    if (this.ceramic_client) {
      // Creating proposals registry
      if (!params.proposals_registry) {
        params.proposals_registry = (await TileDocument.create(this.ceramic_client, [])).id.toString();
      }
      // Creating a DAO
      let dao_stream = await TileDocument.create(this.ceramic_client, params, {
        schema: 'k3y52l7qbv1fryon63ri7x3famp8n0l0329nbt5197ov1t688pwyuwmpbii3edd6o',
      }); // Currently only one controller is supported per document
      this.dao_stream = dao_stream.id.toString();
      this.proposals_registry = params.proposals_registry;
      await this.lock();
      return dao_stream;
      // ToDo add opts and metadata.schema
    } else {
      throw new Error("Ceramic client wasn't provided. Do it initializing SimpleDao with a client");
    }
  }

  async edit(params: Object): Promise<[commit: string]> {
    return Promise.resolve(['']);
  }

  async lock(): Promise<[commit: string]> {
    return Promise.resolve(['']);
  }

  async get(): Promise<any> {
    if (this.ceramic_client && this.dao_stream) {
      let stream = await this.ceramic_client.loadStream(this.dao_stream);
      return stream.content;
    } else {
      throw new Error(
        "DAO wasn't registered. Do it initializing SimpleDao with providing dao_stream or create a new dao using create().",
      );
    }
  }

  async new_proposal(params: SimpleProposalInterface): Promise<string> {
    if (this.ceramic_client && this.dao_stream) {
      // Creating proposal
      let proposal = new SimpleProposal(this.provider);
      params.dao_stream = this.dao_stream;
      await proposal.create(params);

      // Add the proposal to the registry
      if (!this.proposals_registry) {
        this.proposals_registry = (await this.ceramic_client.loadStream(this.dao_stream)).content.proposals_registry;
      }
      const registry = await TileDocument.load(this.ceramic_client, this.proposals_registry as string);
      const proposals = registry.content as string[];
      proposals.push(proposal.proposal_stream as string);
      await registry.update(proposals);

      return proposal.proposal_stream as string;
    } else {
      throw new Error(
        "Ceramic client wasn't provided or DAO wasn't registered. Do it initializing SimpleDao with a client providing dao_stream or create a new dao using create().",
      );
    }
  }

  async get_proposals(): Promise<string[]> {
    if (this.ceramic_client && this.dao_stream) {
      return (await this.ceramic_client.loadStream(this.dao_stream)).content.proposals_registry;
    } else {
      throw new Error(
        "Ceramic client wasn't provided or DAO wasn't registered. Do it initializing SimpleDao with a client providing dao_stream or create a new dao using create().",
      );
    }
  }
}
