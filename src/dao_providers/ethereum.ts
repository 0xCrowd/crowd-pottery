import { ThreeIdConnect, EthereumAuthProvider, DidProviderProxy } from '@3id/connect';
import { DaoProvider } from './provider';
import { Proposal } from '../proposals/proposal';


export class EthDaoProvider implements DaoProvider {
  provider: DidProviderProxy;

  async connect(provider: any, addresses: string) {
    const threeIdConnect = new ThreeIdConnect();
    const authProvider = new EthereumAuthProvider(provider, addresses);
    await threeIdConnect.connect(authProvider);
    this.provider = await threeIdConnect.getDidProvider();
  }

  async new_proposal(proposal: Proposal) {
    // ToDo implement proposal creation
  }
}
