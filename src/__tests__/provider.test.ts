import { EthDaoProvider } from '../dao_providers/ethereum';
import { SimpleDao } from '../dao/simple_dao';
import { SimpleDaoInterface } from '../dao/simple_dao';

const provider = new EthDaoProvider(null, 'http://0.0.0.0:7007', undefined, new Uint8Array(32));
const dao_config: SimpleDaoInterface = {
  name: 'Hello',
  l1_type: 'ethereum',
  l1_vault: '0x0',
  l1_token: '0xA9F6E20DDdBD5c17a804D6EA6Efa61c202B9b555',
  proposal_total_threshold: 0.5,
  proposal_for_threshold: 0.5,
  proposal_timeout: 3600
};

beforeAll(async () => {
  await provider.connect();
});

test('Serverside provider is connected', async () => {
  expect(provider.connected).toBe(true);
});

test('Creates a new DAO', async () => {
  let dao = new SimpleDao(provider);
  let dao_stream = (await dao.create(dao_config)).id.toString();
  console.log('DAO:', dao_stream);
  expect(dao_stream).toBeDefined();
  expect(await dao.get()).toStrictEqual(dao_config);
});

test('Connects to an existing DAO', async () => {
  let dao = new SimpleDao(provider, 'kjzl6cwe1jw14avmpve8sxjqo7r908clcdl0hysvsdo9amyswj0n6zcdnq3gwz9');
  expect(await dao.get()).toStrictEqual(dao_config);
});
