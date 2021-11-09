import { TileDocument } from '@ceramicnetwork/stream-tile';
import { Proposal } from './proposal';

const proposal_types = ['initial', 'tx', 'buyout', 'sell'];
const proposal_statuses = ['fail', 'success', 'pending'];

export interface SimpleProposalInterface {
  type: string; // buyout, sell, tx
  title: string;
  description: string;
  status: string; // fail, success, pending, closed
  dao_stream?: string; // ToDo Do we need to store the backlink?
  onsuccess?: string;
}

interface _SimpleProposalInterface extends SimpleProposalInterface {
  votes_stream?: string;
  options?: string[];
  fulfilled?: boolean;
}

export class SimpleProposal extends Proposal {
  async create(params: SimpleProposalInterface): Promise<TileDocument> {
    if (this.ceramic_client && proposal_types.includes(params.type)) {
      let votes_stream = (await TileDocument.create(this.ceramic_client, {})).id.toString();
      const content: _SimpleProposalInterface = params;
      content.votes_stream = votes_stream;
      content.options = ['For', 'Against'];
      content.fulfilled = false;
      let proposal = await TileDocument.create(this.ceramic_client, content);
      this.stream = proposal.id.toString();
      return proposal;
    } else {
      throw new Error(`Ceramic client wasn't provided or proposal type is not in ${proposal_types}.`);
    }
  }

  async get(): Promise<any> {
    if (this.stream) {
      let stream = await this.ceramic_client.loadStream(this.stream);
      this.votes_stream = stream.content.votes_stream;
      return stream.content;
    } else {
      throw new Error(
        "Proposal has no stream! Init an object with stream property or use create() to create a new proposal"
      );
    }
  }

  async vote(l1_address: string, voting_power: string): Promise<any> {
    if(!this.votes_stream) {
      await this.get()
    }
    let votes_stream = await TileDocument.load(this.ceramic_client, this.votes_stream as string);
    let votes = votes_stream.content as any;
    votes[l1_address] = voting_power;
    await votes_stream.update(votes);
    return votes;
  }
}
