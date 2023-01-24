import { Injectable } from '@nestjs/common';
import { Client, mapping, auth } from 'cassandra-driver';

@Injectable()
export class CassandraService {

  client: Client;
  mapper: mapping.Mapper;

  private createClient() {
    // Local Connection
    // this.client = new Client({
    //   contactPoints: ['0.0.0.0'],
    //   keyspace: 'conduit',
    //   localDataCenter: 'datacenter1',
    //   authProvider: new auth.PlainTextAuthProvider('cassandra', 'cassandra')
    // });

    // Astra connection
    this.client = new Client({
      cloud: {
        secureConnectBundle: "./secure-connect-my-database.zip",
      },
      credentials: {
        username: "AkiBmOqyoSFKPmgtHidMfPgB",
        password: ",Zerz,3jAZ563XT92TpSl3wOZr,I5nlp_H6Fh,oGf4xhchLjgy0g+YqfFwQ,5PZMtbWEL1E9zThZy+oq9RFo8HlH-SACBGgp9y5F0_R55ONAZHYZh.UNcKYmMjk4ha0g",
      },
      keyspace: "conduit"
    });
  }

  createMapper(mappingOptions: mapping.MappingOptions) {
    if (this.client == undefined) {
      this.createClient();
    }
    return new mapping.Mapper(this.client, mappingOptions);
  }
}
