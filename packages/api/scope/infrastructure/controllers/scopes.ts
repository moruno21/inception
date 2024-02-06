import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

import CreateScope from '~/scope/application/commands/create-scope'
import CreateScopeHandler from '~/scope/application/commands/handlers/create-scope'
import HttpError from '~/shared/http/error'

import ScopeDto from '../models/http/dto'

@ApiTags('Scopes')
@Controller('scopes')
class ScopesController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Creates a Scope' })
  @ApiCreatedResponse({
    description: 'Scope created',
    type: ScopeDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @Post()
  async createScope(@Body() dto: ScopeDto) {
    const response: Awaited<ReturnType<CreateScopeHandler['execute']>> =
      await this.commandBus.execute(
        CreateScope.with({
          description: dto.description,
          id: dto.id,
          name: dto.name,
        }),
      )

    if (response.isErr())
      throw new BadRequestException(HttpError.fromException(response.error))

    return ScopeDto.fromScope(response.value)
  }
}

export default ScopesController
