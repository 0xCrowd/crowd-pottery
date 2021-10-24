import { EthDaoProvider } from '../dao_providers/ethereum';
import { SimpleDao } from '../dao/simple_dao';
import { SimpleProposal, SimpleProposalInterface } from '../proposals/simple_proposal';

const provider = new EthDaoProvider(null, 'http://0.0.0.0:7007', undefined, new Uint8Array(32));
const proposal_config: SimpleProposalInterface = {
  title: 'Test proposal',
  description: "Let's test it!",
  dao_stream: 'kjzl6cwe1jw14avmpve8sxjqo7r908clcdl0hysvsdo9amyswj0n6zcdnq3gwz9',
};

beforeAll(async () => {
  await provider.connect();
});

test('Serverside provider is connected', async () => {
  expect(provider.connected).toBe(true);
});

test('Creates a new Simple Proposal', async () => {
  let proposal = new SimpleProposal(provider);
  let proposal_stream = (await proposal.create(proposal_config)).id.toString();
  console.log('Proposal:', proposal_stream);
  expect(proposal_stream).toBeDefined();
  expect(await proposal.get()).toStrictEqual(proposal_config);
});

test('Creates a new Simple Proposal through DAO', async () => {
  let dao = new SimpleDao(provider, 'kjzl6cwe1jw14bhok7227dua3d1rlf9vw3rskebfpwus8tac0dhmw45umjizeu2');
  await dao.new_proposal(proposal_config);
  console.log('DAO proposals:', await dao.get_proposals());
});
