import { TileDocument } from '@ceramicnetwork/stream-tile';
import { Proposal } from './proposal';

export interface SimpleProposalInterface {
  title: string;
  description: string;
  dao_stream?: string;
  onsuccess?: string;
}

interface _SimpleProposalInterface extends SimpleProposalInterface {
  options?: string[];
}

export class SimpleProposal extends Proposal {
  async create(params: SimpleProposalInterface): Promise<TileDocument> {
    if (this.ceramic_client) {
      const content: _SimpleProposalInterface = params;
      content.options = ['For', 'Against'];
      let proposal = await TileDocument.create(this.ceramic_client, content);
      this.proposal_stream = proposal.id.toString();
      return proposal;
    } else {
      throw new Error("Ceramic client wasn't provided. Do it initializing SimpleDao with a client");
    }
  }

  async get(): Promise<any> {
    if (this.proposal_stream) {
      let stream = await this.ceramic_client.loadStream(this.proposal_stream);
      return stream.content;
    } else {
      throw new Error(
        "DAO wasn't registered. Do it initializing SimpleDao with providing dao_stream or create a new dao using create().",
      );
    }
  }
}
