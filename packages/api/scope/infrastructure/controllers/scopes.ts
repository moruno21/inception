import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

import CreateScope from '~/scope/application/commands/create-scope'
import CreateScopeHandler from '~/scope/application/commands/handlers/create-scope'
import GetScope from '~/scope/application/queries/get-scope'
import GetScopes from '~/scope/application/queries/get-scopes'
import GetScopeHandler from '~/scope/application/queries/handlers/get-scope'
import CreateScopeDto from '~/scope/dto/request/create-scope'
import ScopeDto from '~/scope/dto/response/scope'
import HttpError from '~/shared/http/error'

@ApiTags('Scopes')
@Controller('scopes')
class ScopesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Gets all Scopes' })
  @ApiOkResponse({
    description: 'Scopes',
    type: [ScopeDto],
  })
  @Get()
  async getScopes(): Promise<ScopeDto[]> {
    return await this.queryBus.execute(GetScopes.all())
  }

  @ApiOperation({ summary: 'Get a Scope' })
  @ApiOkResponse({
    description: 'Scopes',
    type: ScopeDto,
  })
  @Get(':id')
  async getScope(@Param('id') id: string): Promise<ScopeDto> {
    const response: Awaited<ReturnType<GetScopeHandler['execute']>> =
      await this.queryBus.execute(
        GetScope.with({
          id,
        }),
      )

    if (response.isErr())
      throw new BadRequestException(HttpError.fromException(response.error))

    return response.value
  }

  @ApiOperation({ summary: 'Creates a Scope' })
  @ApiCreatedResponse({
    description: 'Scope created',
  })
  @ApiBadRequestResponse({ description: 'Invalid input', type: HttpError })
  @Post()
  async createScope(@Body() dto: CreateScopeDto) {
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
  }
}

export default ScopesController
