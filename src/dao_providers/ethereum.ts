import { ThreeIdConnect, EthereumAuthProvider, DidProviderProxy } from '@3id/connect';
import { DaoProvider } from './provider';
import { Client } from '../ceramic/client';

export class PotteryDaoProvider implements DaoProvider {
  external_provider: any;
  external_address: string;
  ceramic_node_url: string;

  connected: boolean = false;
  did_provider: DidProviderProxy;
  ceramic_client: Client;

  constructor(provider: any, addresses: string, ceramic_node_url: string) {
    this.external_provider = provider;
    this.external_address = addresses;
    this.ceramic_node_url = ceramic_node_url;
  }

  async connect() {
    try {
      // Setting up 3id provider for auth
      const threeIdConnect = new ThreeIdConnect();
      const authProvider = new EthereumAuthProvider(this.external_provider, this.external_address);
      await threeIdConnect.connect(authProvider);
      this.did_provider = await threeIdConnect.getDidProvider();

      // Connecting to Ceramic
      this.ceramic_client = new Client(this.ceramic_node_url);
      await this.ceramic_client.auth(this.did_provider);

      this.connected = true;
    } catch (e) {
      console.log(e);
      this.connected = false;
    }
  }
}
