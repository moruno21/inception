import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { AppController } from '~/src/app.controller'
import { AppService } from '~/src/app.service'

@Module({
  controllers: [AppController],
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({ uri: process.env.MONGODB_URI }),
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
