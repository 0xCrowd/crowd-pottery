import CeramicClient from '@ceramicnetwork/http-client';
import { DaoProviderInterface } from '../dao_providers/provider';
import { TileDocument } from '@ceramicnetwork/stream-tile';
import { SimpleProposalInterface } from './simple_proposal';

export abstract class Proposal {
  stream: string | undefined;
  schema: string | undefined;
  votes_stream: string | undefined;
  ceramic_client: CeramicClient;

  constructor(provider: DaoProviderInterface, stream?: string, schema?: string) {
    this.ceramic_client = provider.ceramic_client.client;
    this.stream = stream;
    this.schema = schema;
  }

  abstract create(params: SimpleProposalInterface): Promise<TileDocument>;
  abstract get(): Promise<any>;
  abstract vote(l1_address: string, voting_power: string): Promise<any>;
}
