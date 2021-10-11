import {DaoProvider} from "../dao_providers/provider";

export abstract class Dao {
    dao_stream: string | null;
    schema: string | null;
    provider: DaoProvider;

    protected constructor(provider: DaoProvider,
                          dao_stream: string | null,
                          schema: string | null) {  // Connect to existing DAO or init the empty one
        this.provider = provider;
        this.dao_stream = dao_stream;
        this.schema = schema;
    };
    abstract create(schema: string | null, params: Object): Promise<[new_dao_stream: string]>;  // Initialize new DAO
    abstract edit(params: Object): Promise<[commit: string]>;  // Edit not locked DAO
    abstract lock(): Promise<[commit: string]>;  // After the lock the DAO creator can't change DAO no more
    abstract get(): Promise<Object>;
}