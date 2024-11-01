import { Routes } from '@/infra/http/server/Routes'
import { Bootstrap } from './Bootstrap'
import { ThirdPartyMiddlewares } from '@/infra/http/server/ThirdPartyMiddlewares'
import { Server } from '@/infra/http/server/Server'
import { EventsSubscription } from '@/application/EventsSubscription'

const routes = new Routes()
const thirdPartyMiddlewares = new ThirdPartyMiddlewares()
const server = new Server(routes, thirdPartyMiddlewares)
const eventsSubscription = new EventsSubscription()

const bootstrap = new Bootstrap(server, eventsSubscription)
export { bootstrap }
