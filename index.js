import express from 'express'
import ultimosCupons from "./meliuz.js";

const api = express()

api.get('/ultimosCupons/:loja', async (req, res) => {
    const retorno = await ultimosCupons(req.params.loja)
    res.send(retorno)
    res.end()
})


api.listen(3000, () => console.log("Servidor foi iniciado"))