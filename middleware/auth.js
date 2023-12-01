// middleware/auth.js
export default function ({ req, res, next }) {
    const authHeader = req.headers.authorization;
    const [scheme, credentials] = authHeader.split(' ');
  
    if (scheme.toLowerCase() === 'basic') {
      const decodedCredentials = Buffer.from(credentials, 'base64').toString('utf-8');
      const [username, password] = decodedCredentials.split(':');
  
      // Check your username and password here
      if (username === 'mtown' && password === 'diverta123') {
        return next();
      }
    }
  
    // If authentication fails, return 401 Unauthorized
    res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="Secure Area"' });
    res.end('Unauthorized');
  }