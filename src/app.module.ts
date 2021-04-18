import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TopicModule } from './topic/topic.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }),
    MailerModule,
    TopicModule,
    MailerModule
  ],
})
export class AppModule {}
