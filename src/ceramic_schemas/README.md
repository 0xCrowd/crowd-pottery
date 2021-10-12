# Schemas descriptions

## Additional info
Creating a Ceramic Schema: https://developers.ceramic.network/build/cli/quick-start/#5-create-a-schema

Creating a Tile which uses Schema: https://developers.ceramic.network/build/cli/quick-start/#6-create-a-tiledocument-stream-that-uses-a-schema

## @crowd/pottery schemas

### simple_dao_proposal.json
This schema is default for all proposals for SimpleDao

Corresponding Ceramic Stream:
`kjzl6cwe1jw149k7y68ide2oqpjxuv724bbbbuj2f8lfjmasdm58towbgpjcpwv`

Corresponding Ceramic Commit:
`k3y52l7qbv1frybzsj0cin833xxpsrhu72oggk93l8d4ejikpsthar51titlmg9og`

- `title`* _string_ - title of the proposal
- `description`* _string_ - description of the proposal
- `options`* - _array of 2 elements_ - options to vote. The first one is expected to be an alias for "for" option and the second one is for "against" option.
- `onsuccess` _sting optional_ - meta-tx to be executed by @crowd/pottery-inspector in case the proposal passes 