import crypto from 'crypto'

const generatePasswordResetToken = (): string => {
    const token = crypto.randomBytes(32).toString('hex')
    return token
}

export { generatePasswordResetToken }