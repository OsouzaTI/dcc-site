export default async function error500(req, res) {
    res.status(500).send({error: true});
}