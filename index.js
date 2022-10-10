const https = require('https');

const getToken = () => {
  
  return new Promise(function(resolve, reject) {
    const req = https.request({
      host: 'dev-nosql.premisehq.co',
      pathname: '/v3/accounts/api-token',
      protocol: 'https:',
      method: 'POST',
    }, (res) => {
      let data = '';
  
      console.log('token', res.statusCode);
  
      res.on('data', chunk => data += chunk);
  
      res.on('end', () => {
        resolve(data);
      })
    }).on('error', err => console.log(err))
  
    req.end();
  })
}

const insertData = async() =>{
  let token = await getToken()

  const req = https.request({
    host: 'dev-nosql.premisehq.co',
    pathname: '/v1/mow/agencies/insert-user',
    protocol: 'https:',
    method: 'POST',
    headers: {
      // Authorization: 'Basic c3VwZXJ1c2VyOmNqZGpkamdodTc1NjRAZmpmayEhOTg3NjY1',
      Authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      UserID: "122",
      AgencyID: "bdf03e28768b4824aa0371412add6997"
    })
  }, (res) => {
    let data = '';
    console.log('response', res.statusCode);
  
    res.on('data', chunk => data += chunk);
  
    res.on('end', () => {
      // console.log('user', data)
  
    })
  }).on('error', err => console.log(err))
  
  req.end();
}

insertData()
