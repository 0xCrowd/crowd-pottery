import { TileDocument } from '@ceramicnetwork/stream-tile';
import { Dao } from './dao';
import { SimpleProposal } from '../proposals/simple_proposal';

export interface SimpleDaoInterface {
  name: string  // DAO name
  l1_type: string  // L1 type
  l1_vault: string  // L1 DAO Asset vault address
  l1_token: string  // L1 DAO Token address
  proposal_total_threshold: number  // 0 - 1 which share of all holders should vote to proposal be legit?
  proposal_for_threshold: number  // 0 - 1 which share of VOTED users should vote "for" for proposal pass?
  proposal_timeout?: number  // (secs) every proposal will be resolved after the timeout
}

// Yay, "out of the box" simplified experience!
export class SimpleDao extends Dao {
  async create(params: SimpleDaoInterface): Promise<TileDocument> {
    if (this.ceramic_client) {
      let dao_stream = await TileDocument.create(this.ceramic_client, params, {
        schema: 'k3y52l7qbv1fryon63ri7x3famp8n0l0329nbt5197ov1t688pwyuwmpbii3edd6o',
      }); // Currently only one controller is supported per document
      this.dao_stream = dao_stream.id.toString();
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
    if (this.dao_stream) {
      let stream = await this.ceramic_client.loadStream(this.dao_stream);
      return stream.content;
    } else {
      throw new Error(
        "DAO wasn't registered. Do it initializing SimpleDao with providing dao_stream or create a new dao using create().",
      );
    }
  }

  async new_proposal(params: SimpleProposal): Promise<string> {
    if (this.ceramic_client && this.dao_stream) {
      let new_proposal = await TileDocument.create(this.ceramic_client, params, {
        schema: 'k3y52l7qbv1fryi6l85o0tkwfkjbj1ey04yi5049de9m37n5kv5dsvx9qlq47os8w',
      });
      return new_proposal.id.toString();
    } else {
      throw new Error(
        "Ceramic client wasn't provided or DAO wasn't registered. Do it initializing SimpleDao with a client providing dao_stream or create a new dao using create().",
      );
    }
  }

  async get_proposals(): Promise<any> {
    return Promise.resolve(null);
  }
}
