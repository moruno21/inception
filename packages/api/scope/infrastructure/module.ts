import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose'

import CreateScopeHandler from '../application/commands/handlers/create-scope'
import GetScopesHandler from '../application/queries/handlers/get-scopes'
import ScopesController from './controllers/scopes'
import ScopeSchema from './models/mongoose/schema'
import scopeProviders from './providers'

const controllers = [ScopesController]

const commandHandlers = [CreateScopeHandler]

const queryHandlers = [GetScopesHandler]

@Module({
  controllers,
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: ScopeSchema.name,
        schema: SchemaFactory.createForClass(ScopeSchema),
      },
    ]),
  ],
  providers: [...commandHandlers, ...queryHandlers, ...scopeProviders],
})
class ScopeModule {
  constructor() {}
}

export default ScopeModule
