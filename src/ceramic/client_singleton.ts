// Do we need Singleton at all?

import { Client } from './client';

type CeramicClients = { [ceramic_api_url: string]: Client };

class CeramicMapper {
  clients: CeramicClients = {};
}

const CeramicSingleton = new CeramicMapper();

export default CeramicSingleton;
