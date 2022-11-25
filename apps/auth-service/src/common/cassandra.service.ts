import { Injectable } from '@nestjs/common';
import { Client, mapping, auth } from 'cassandra-driver';

@Injectable()
export class CassandraService {
    client: Client;
    mapper: mapping.Mapper;
    private createClient() {
        this.client = new Client({
            contactPoints: ['0.0.0.0'],
            keyspace: 'conduit',
            localDataCenter: 'datacenter1',
            authProvider: new auth.PlainTextAuthProvider('cassandra', 'cassandra')
        });
    }
    
    createMapper(mappingOptions: mapping.MappingOptions) {
     if(this.client == undefined) {
         this.createClient();
     }   
     return new mapping.Mapper(this.client, mappingOptions);
    }
}