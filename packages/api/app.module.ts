import { Module } from '@nestjs/common'

import { AppController } from '~/src/app.controller'
import { AppService } from '~/src/app.service'

@Module({
  controllers: [AppController],
  imports: [],
  providers: [AppService],
})
export class AppModule {}
