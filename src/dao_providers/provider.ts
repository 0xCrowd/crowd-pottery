import { Client } from '../ceramic/client';

export interface DaoProviderInterface {
  ceramic_client: Client;
}
