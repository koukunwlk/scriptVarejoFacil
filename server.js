const express = require('express')
const cors = require('cors')
const axios = require('axios')
const server = express()
const fs = require('fs')
const items = require('./items.json')

server.use(cors())
let baseUrl = 'https://supermercadoosarina.varejofacil.com/api'

async function getAccessToken(){
    axios.defaults.withCredentials = true
    let user = {
        username: "11",
        password: "*******"
    }

    let {data} = await axios.post(`${baseUrl}/auth`,user)
    let token = data.accessToken
    return token
};

let token = getAccessToken()

async function getProducts(){
    let item = []
    token = await token
    
    let {data} = await axios.get(`${baseUrl}/v1/produto/produtos?sort=id&count=5`, {headers:{
        'Authorization': token
    }})
   

    fs.writeFile('data.json', JSON.stringify(data), err => {if(err) throw err})
}



async function getAuxCode(){
    token = await token
    let parsedData = []
    for(item of items){
    let {data} = await axios.get(`${baseUrl}/v1/produto/produtos/${item.id}/codigos-auxiliares`, {headers:{
        'Authorization': token
    }})
    parsedData.push(data.items[0])    

    
}
    fs.appendFile('productsWithId.json', JSON.stringify(parsedData), err => {if(err) throw err})
    console.log('acabou')
}

async function getProviders(){
    token = await token
    let parsedData = []
    for(item of items){
    let {data} = await axios.get(`${baseUrl}/v1/produto/produtos/${item.id}/fornecedores`, {headers:{
        'Authorization': token
    }})
    data.items.map( item => parsedData.push(item) )   

    
}
    fs.appendFile('providers.json', JSON.stringify(parsedData), err => {if(err) throw err})
    console.log('acabou')
}
getProviders()

server. listen(5000)
