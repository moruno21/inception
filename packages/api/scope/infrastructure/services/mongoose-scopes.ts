import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import Scope from '~/scope/domain/models/scope'
import Scopes from '~/scope/domain/services/scopes'

import ScopeSchema from '../models/mongoose/schema'

class MongooseScopes implements Scopes {
  constructor(
    @InjectModel(ScopeSchema.name)
    private readonly scopes: Model<ScopeSchema>,
  ) {}

  async create(scope: Scope): Promise<Scope> {
    await this.scopes.create(ScopeSchema.fromScope(scope))

    return scope
  }
}

export default MongooseScopes
