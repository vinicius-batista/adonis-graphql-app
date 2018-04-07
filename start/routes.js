'use strict'

const Route = use('Route')
const GraphQLServer = use('Adonis/Addons/GraphQLServer')

const options = {
  chacheControl: true,
  debug: false
}

const handle = (context) => GraphQLServer.handle(context, options)

Route.route('/graphql', handle, ['GET', 'POST'])
