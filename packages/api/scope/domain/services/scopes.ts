import Scope from '../models/scope'

type Scopes = {
  create(scope: Scope): Promise<void>
}

const Scopes = 'Scopes'

export default Scopes
