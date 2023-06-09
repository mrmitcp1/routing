let http = require('http')
let url = require('url')
let StringDecoder = require('string_decoder').StringDecoder;
let handlers = {}
let server = http.createServer(function (req, res) {

    let parseUrl = url.parse(req.url, true);
    let path = parseUrl.pathname;

    let trimPath = path.replace(/^\/+|\/+$/g, '');
    console.log( router[trimPath])
    req.on('data', function (data) {

    })
    req.on('end', function (end) {
        let chosenHandler = (typeof (router[trimPath]) !== 'undefined' ? router[trimPath] : handlers.notFound)
        let data =
            {
                'trimPath': trimPath
            }
        ;
        chosenHandler(data, function (statusCode, payload) {
            statusCode = typeof (statusCode) === 'number' ? statusCode : 200;
            payload = typeof (payload) === 'object' ? payload : {};
            let payLoadString = JSON.stringify(payload);
            res.writeHead(statusCode)
            res.end(payLoadString)
            console.log('status ' + statusCode + 'payload' + payload)
        })

    })
    // console.log(trimPath)
    // res.end()

})

server.listen(3000, () => {
    console.log('server running')
})
handlers.sample = function (data, callback) {
    callback(406, {'name': 'sample handle'})
};
handlers.notFound = function (data, callback) {
    callback(404);
};
handlers.home = function (data, callback) {
    callback(200, 'home page')
}


let router = {
    'sample': handlers.sample,
    'home': handlers.home,
}