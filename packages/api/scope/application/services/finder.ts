import ScopeDto from '~/scope/dto/response/scope'

type ScopesFinder = {
  getAll(): Promise<ScopeDto[]>
}

const ScopesFinder = 'SCOPES_FINDER'

export default ScopesFinder
