
class graphqlController {
    static Graphql(req, res) {
        res.json(req.user);
    }
}

module.exports = graphqlController;