import Scopes from '../domain/services/scopes'
import MongooseScopes from './services/mongoose-scopes'

const scopeProviders = [
  {
    provide: Scopes,
    useClass: MongooseScopes,
  },
]

export default scopeProviders
