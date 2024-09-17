import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: process.env.ELASTIC_URL,
    }),
  ],
  exports: [ElasticsearchModule],
})
export class ElasticSearchModule {}
