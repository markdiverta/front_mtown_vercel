export default function (req, res, next) {
  const auth = require('basic-auth');
  const credentials = auth(req);

  if (!credentials || !check(credentials.name, credentials.pass)) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="example"');
    res.end('Access denied');
  } else {
    next();
  }
}

function check(name, pass) {
  const envAuth = process.env.BASIC_AUTH;
  if (!envAuth) return false;

  const [expectedUser, expectedPass] = envAuth.split(':');
  return name === expectedUser && pass === expectedPass;
}