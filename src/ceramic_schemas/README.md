# Schemas descriptions

## Additional info
Creating a Ceramic Schema: https://developers.ceramic.network/build/cli/quick-start/#5-create-a-schema

Creating a Tile which uses Schema: https://developers.ceramic.network/build/cli/quick-start/#6-create-a-tiledocument-stream-that-uses-a-schema

## @crowd/pottery schemas

### simple_dao.json
This schema is for all new SimpleDao structures

Corresponding Ceramic Stream:
`kjzl6cwe1jw14bc9anjzzlal6kf9zipboi8ccj9qlw6m6wxs8575gyoxojf3pi6`

Corresponding Ceramic Commit:
`k3y52l7qbv1fryon63ri7x3famp8n0l0329nbt5197ov1t688pwyuwmpbii3edd6o`

### simple_dao_proposal.json
This schema is default for all proposals for SimpleDao

Corresponding Ceramic Stream:
`kjzl6cwe1jw14afjuyjov5r26tpt44wwn73obtukg2h62rfyzvp04hm6jxhgtx8`

Corresponding Ceramic Commit:
`k3y52l7qbv1fryi6l85o0tkwfkjbj1ey04yi5049de9m37n5kv5dsvx9qlq47os8w`

- `title`* _string_ - title of the proposal
- `description`* _string_ - description of the proposal
- `options`* - _array of 2 elements_ - options to vote. The first one is expected to be an alias for "for" option and the second one is for "against" option.
- `onsuccess` _sting optional_ - meta-tx to be executed by @crowd/pottery-inspector in case the proposal passes