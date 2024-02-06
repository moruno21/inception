import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

import Scope from '~/scope/domain/models/scope'

class ScopeDto {
  @ApiProperty()
  @IsString()
  readonly id: string

  @ApiProperty()
  @IsString()
  readonly description: string

  @ApiProperty()
  @IsString()
  readonly name: string

  private constructor(
    id: ScopeDto['id'],
    description: ScopeDto['description'],
    name: ScopeDto['name'],
  ) {
    this.id = id
    this.name = name
    this.description = description
  }

  static fromScope({ description, id, name }: Scope): ScopeDto {
    return new this(id.value, description.value, name.value)
  }
}

export default ScopeDto
