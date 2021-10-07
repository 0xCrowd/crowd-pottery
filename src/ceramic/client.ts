import CeramicClient from '@ceramicnetwork/http-client';
import CeramicSingleton from './client_singleton';
import KeyDidResolver from 'key-did-resolver';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import { DID } from 'dids';
import { DaoProvider } from '../dao_providers/provider';

export class Client {
  api_url: string | undefined = undefined;
  client: CeramicClient | undefined;

  constructor(api_url: string) {
    if (api_url in Object.keys(CeramicSingleton.clients)) {
      return CeramicSingleton.clients[api_url];
    }
    this.api_url = api_url;
  }

  async auth(provider: DaoProvider) {
    if (!this.client) {
      this.client = new CeramicClient(this.api_url);
      const did_resolver = {
        ...KeyDidResolver.getResolver(),
        ...ThreeIdResolver.getResolver(this.client),
      };
      this.client.did = new DID({ resolver: did_resolver });
      this.client.did.setProvider(provider.provider);
      await this.client.did.authenticate();
    }
  }
}
