import CeramicClient from '@ceramicnetwork/http-client';
import { DaoProviderInterface } from '../dao_providers/provider';
import { TileDocument } from '@ceramicnetwork/stream-tile';
import { SimpleProposalInterface } from './simple_proposal';

export abstract class Proposal {
  proposal_stream: string | undefined;
  schema: string | undefined;
  ceramic_client: CeramicClient;

  constructor(provider: DaoProviderInterface, proposal_stream?: string, schema?: string) {
    this.ceramic_client = provider.ceramic_client.client;
    this.proposal_stream = proposal_stream;
    this.schema = schema;
  }

  abstract create(params: SimpleProposalInterface): Promise<TileDocument>;
  abstract get(): Promise<any>;
}
