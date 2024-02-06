import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import ScopesFinder from '~/scope/application/services/finder'
import ScopeDto from '~/scope/dto/response/scope'

import ScopeSchema from '../models/mongoose/schema'

@Injectable()
class MongooseScopesFinder implements ScopesFinder {
  constructor(
    @InjectModel(ScopeSchema.name)
    private readonly scopes: Model<ScopeSchema>,
  ) {}

  async getAll(): Promise<ScopeDto[]> {
    return await this.scopes.find().exec()
  }
}

export default MongooseScopesFinder
