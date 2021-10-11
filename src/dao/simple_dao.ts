import { TileDocument } from "@ceramicnetwork/stream-tile";
import { Stream } from '@ceramicnetwork/common';
import { Dao } from "./dao";

class SimpleDao extends Dao {

    async create(schema: string | null, params: Object): Promise<TileDocument | null> {
        if (this.ceramic_client) {
            // ceramic, content, metadata, opts
            let dao_stream = await TileDocument.create(
                this.ceramic_client,
                params)  // Currently only one controller is supported per document
            this.dao_stream = dao_stream.id.toString()
            return dao_stream;
            // ToDo add opts and metadata.schema
        } else {
            return Promise.resolve(null);
        }
    }

    async edit(params: Object): Promise<[commit: string]> {
        return Promise.resolve([""]);
    }

    async lock(): Promise<[commit: string]> {
        return Promise.resolve([""]);
    }

    async get(): Promise<Stream | null> {
        if ( this.dao_stream ) {
            return this.ceramic_client.loadStream(this.dao_stream)
        } else {
            return Promise.resolve(null);
        }
    }

}
