import { EthDaoProvider } from "../dao_providers/ethereum";
import {SimpleDao} from "../dao/simple_dao";

const provider = new EthDaoProvider(null, "http://0.0.0.0:7007", undefined, new Uint8Array(32))
const dao_config = {"type": "TestDAO"}

beforeAll(async () => {
    await provider.connect();
});

test('Serverside provider is connected', async () => {
    expect(provider.connected).toBe(true);
});

test('Creates a new DAO', async () => {
    let dao = new SimpleDao(provider)

    let dao_stream = (await dao.create(dao_config)).id.toString()
    console.log("DAO:", dao_stream)

    expect(dao_stream).toBeDefined()
    expect(await dao.get()).toStrictEqual(dao_config)
});

test('Connects to an existing DAO', async () => {
    let dao = new SimpleDao(provider, "kjzl6cwe1jw148aaefj2meamu2feb1tkvor9c7i97uwxlw8luxqf4qnfjovlkmc")
    expect(await dao.get()).toStrictEqual(dao_config)
});
