import jwt from 'jsonwebtoken'

const SECRET_KEY = 'my_secret_key'

export function generateToken(payload: any) {
  return jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'})
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET_KEY)
  } catch (error) {
    throw new Error('Invalid token')
  }
}
