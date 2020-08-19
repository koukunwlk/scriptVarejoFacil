const express = require('express')
const cors = require('cors')
const axios = require('axios')
const server = express()
const cookiePaser = require('cookie-parser')
const fs = require('fs')

server.use(cors())
server.use(cookiePaser())
let baseUrl = 'https://supermercadoosarina.varejofacil.com/api'

async function getAcessToken(){
    axios.defaults.withCredentials = true
    let user = {
        username: "11",
        password: "12091997"
    }

    let {data} = await axios.post(`${baseUrl}/auth`,user)
    let token = data.accessToken
    return token
}

let token = getAcessToken()

async function getProducts(){
    let item = []
    let count = 50000
    token = await token
    for(let i = 1; i< 3; i++){
    let {data} = await axios.get(`${baseUrl}/v1/produto/produtos?sort=id&start=${i}`, {headers:{
        'Authorization': token
    }})
    item.push(data.items[0])
}
    fs.writeFile('data.json', JSON.stringify(item), err => {if(err) throw err})
}

getProducts()
server. listen(5000)