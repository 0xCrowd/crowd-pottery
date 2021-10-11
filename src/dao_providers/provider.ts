import { DidProviderProxy } from '@3id/connect';
import {Client} from "../ceramic/client";

export interface DaoProvider {
  did_provider: DidProviderProxy;
  ceramic_client: Client;
}
