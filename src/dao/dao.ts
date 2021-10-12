import { DaoProvider } from "../dao_providers/provider";
import CeramicClient from "@ceramicnetwork/http-client";
import { Stream } from "@ceramicnetwork/common";
import {TileDocument} from "@ceramicnetwork/stream-tile";

export abstract class Dao {
    dao_stream: string;
    schema: string;
    ceramic_client: CeramicClient;

    protected constructor(provider: DaoProvider,
                          dao_stream: string,
                          schema: string) {  // Connect to existing DAO or init the empty one
        this.ceramic_client = provider.ceramic_client.client;
        this.dao_stream = dao_stream;
        this.schema = schema;
    };
    abstract create(params: Object, schema: string | null): Promise<TileDocument>;  // Initialize new DAO
    abstract edit(params: Object): Promise<[commit: string]>;  // Edit not locked DAO
    abstract lock(): Promise<[commit: string]>;  // After the lock the DAO creator can't change DAO no more
    abstract get(): Promise<any>;  // Get DAO data from Ceramic

    // Create new proposal linked to the DAO
    // Please verify, that the user is allowed to create new proposals in your app!
    abstract new_proposal(params:Object): Promise<string>;

    abstract get_proposals(): Promise<any>;  // Get list of proposals linked with the DAO
}