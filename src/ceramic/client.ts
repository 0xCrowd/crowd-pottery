import CeramicClient from '@ceramicnetwork/http-client';
import KeyDidResolver from 'key-did-resolver';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import { DID } from 'dids';

export class Client {
  api_url: string | undefined;
  client: CeramicClient;

  constructor(api_url: string | undefined) {
    // Do we need singleton?
    // if (api_url in Object.keys(CeramicSingleton.clients)) {
    //   return CeramicSingleton.clients[api_url];
    // }
    this.api_url = api_url;
  }

  async auth(provider: any) {
    if (!this.client) {
      this.client = new CeramicClient(this.api_url);
      const did_resolver = {
        ...KeyDidResolver.getResolver(),
        ...ThreeIdResolver.getResolver(this.client),
      };
      this.client.did = new DID({ resolver: did_resolver });
      this.client.did.setProvider(provider);
      await this.client.did.authenticate();
    }
  }
}
