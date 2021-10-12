import { TileDocument } from "@ceramicnetwork/stream-tile";
import { Dao } from "./dao";
import {SimpleProposal} from "../proposals/simple_proposal";


// Yay, "out of the box" simplified experience!
export class SimpleDao extends Dao {

    async create(params: Object, schema: string | null): Promise<TileDocument> {
        if (this.ceramic_client) {
            // ceramic, content, metadata, opts
            let dao_stream = await TileDocument.create(
                this.ceramic_client,
                params)  // Currently only one controller is supported per document
            this.dao_stream = dao_stream.id.toString()
            await this.lock();
            return dao_stream;
            // ToDo add opts and metadata.schema
        } else {
            throw new Error("Ceramic client wasn't provided. Do it initializing SimpleDao with a client");
        }
    }

    async edit(params: Object): Promise<[commit: string]> {
        return Promise.resolve([""]);
    }

    async lock(): Promise<[commit: string]> {
        return Promise.resolve([""]);
    }

    async get(): Promise<any> {
        if ( this.dao_stream ) {
            let stream = await this.ceramic_client.loadStream(this.dao_stream)
            return stream.content
        } else {
            throw new Error("DAO wasn't registered. Do it initializing SimpleDao with providing dao_stream or create a new dao using create().");
        }
    }

    async new_proposal(params:SimpleProposal): Promise<string> {
        if (this.ceramic_client && this.dao_stream) {
            let new_proposal = await TileDocument.create(
                this.ceramic_client,
                params,
                {schema: 'k3y52l7qbv1frybzsj0cin833xxpsrhu72oggk93l8d4ejikpsthar51titlmg9og'})
            return new_proposal.id.toString()
        } else {
            throw new Error("Ceramic client wasn't provided or DAO wasn't registered. Do it initializing SimpleDao with a client providing dao_stream or create a new dao using create().");
        }
    }

    async get_proposals(): Promise<any> {
        return Promise.resolve(null);
    }

}
