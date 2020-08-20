const data = require('./data.json')
const products = require('./productsWithId.json')
const providers = require('./providers.json')
const prod = require('./items.json')
const fs = require('fs')

let { items } = data

let parsedItens = items.map((produto) => {
    for (product of products) {
        if (produto.id === product.produtoId) {
            return { id: produto.id, EAN: product.id, descricao: produto.descricao, descRed: produto.descricaoReduzida }
        }
    }
})

let prod1 = prod.map((item) => {
    let providersId = []
    for (provider of providers) {
        if (item.id == provider.produtoId) providersId.push(provider.id)
    }
    return { ...item, providersId: providersId }
})

fs.writeFile('formattedItens.json', JSON.stringify(prod1), (err) => { if (err) throw err })


