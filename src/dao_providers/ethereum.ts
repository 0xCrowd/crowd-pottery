import { ThreeIdConnect, EthereumAuthProvider } from '@3id/connect';
import { DaoProviderInterface } from './provider';
import { Client } from '../ceramic/client';
import { Ed25519Provider } from 'key-did-provider-ed25519';

export class EthDaoProvider implements DaoProviderInterface {
  external_provider: any;
  external_address: string | undefined;
  ceramic_node_url: string;
  did_key: Uint8Array | undefined;

  connected: boolean = false;
  ceramic_client: Client;

  constructor(provider: any, ceramic_node_url: string, addresses?: string, did_key?: Uint8Array) {
    this.external_provider = provider;
    this.external_address = addresses;
    this.ceramic_node_url = ceramic_node_url;
    this.did_key = did_key;
  }

  async connect() {
    try {
      let did_provider;

      if (this.did_key) {
        did_provider = new Ed25519Provider(this.did_key);
      } else if (this.external_address) {
        // Setting up 3id provider for auth
        const threeIdConnect = new ThreeIdConnect();
        const authProvider = new EthereumAuthProvider(this.external_provider, this.external_address);
        await threeIdConnect.connect(authProvider);
        did_provider = await threeIdConnect.getDidProvider();
      }

      // Connecting to Ceramic
      this.ceramic_client = new Client(this.ceramic_node_url);
      await this.ceramic_client.auth(did_provider);

      this.connected = true;
    } catch (e) {
      throw new Error('Error while connecting. Is Ceramic endpoint is up?');
    }
  }

  async get(stream: string): Promise<any> {
    return await this.ceramic_client.client.loadStream(stream);
  }
}
