const { GraphQLServer } = require('graphql-yoga');

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}];
let idCount = links.length;
const resolvers = {
  Query: {
    info: () => `this is the api of hackaernews clone`,
    feed: () => links,
    link: (root, args) => links.find(link => link.id === args.id)
    
  },
  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      }
      links.push(link);
      return link;
    },
    updateLink: (root, args) => {
      const link = links.find(link => link.id === args.id);
      if (!link) return;
      link.description = args.description;
      link.url = args.url;
      return link;
    },
    deleteLink: (root, args) => {
      const index = links.findIndex(link => link.id === args.id);
      if ( index === -1) return;
      const link = links[index];
      links.splice(index, 1);
      return link;
    }
  },
  // Link: {
  //   id: (root) => root.id,
  //   description: (root) => root.description,
  //   url: (root) => root.url
  // }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});
server.start(() => console.log(`server is running on http://localhost:4000`))
