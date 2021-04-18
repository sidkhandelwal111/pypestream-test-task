import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TopicModule } from './topic/topic.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }),
    TopicModule
  ],
})
export class AppModule {}
