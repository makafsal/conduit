import { Test, TestingModule } from '@nestjs/testing';
import { CassandraService } from './cassandra.service';

describe('CassandraService', () => {
  let service: CassandraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CassandraService],
    }).compile();

    service = module.get<CassandraService>(CassandraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
