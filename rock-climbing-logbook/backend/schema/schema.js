const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList } = require('graphql');
const ClimbLog = require('../models/ClimbLog');  // ClimbLog model

// Define the ClimbLog GraphQL type
const ClimbLogType = new GraphQLObjectType({
  name: 'ClimbLog',
  fields: () => ({
    id: { type: GraphQLString },
    date: { type: GraphQLString },
    location: { type: GraphQLString },
    difficulty: { type: GraphQLString },
    notes: { type: GraphQLString },
  }),
});

// Root query to fetch all climb logs
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    climbLogs: {
      type: new GraphQLList(ClimbLogType),
      resolve(parent, args) {
        return ClimbLog.find();  // Fetch all climb logs
      },
    },
    climbLog: {
      type: ClimbLogType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return ClimbLog.findById(args.id);  // Find a climb log by ID
      },
    },
  },
});

// Mutation to add a new climb log
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addClimbLog: {
      type: ClimbLogType,
      args: {
        date: { type: GraphQLString },
        location: { type: GraphQLString },
        difficulty: { type: GraphQLString },
        notes: { type: GraphQLString },
      },
      resolve(parent, args) {
        const newClimbLog = new ClimbLog({
          date: args.date,
          location: args.location,
          difficulty: args.difficulty,
          notes: args.notes,
        });

        return newClimbLog.save();  // Save the new climb log to the database
      },
    },
  },
});

// Export the schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
