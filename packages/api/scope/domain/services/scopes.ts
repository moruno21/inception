import Scope from '../models/scope'

type Scopes = {
  create(scope: Scope): Promise<Scope>
}

const Scopes = 'Scopes'

export default Scopes
