import crypto from 'crypto'

function createEnvHash(env: {[x: string]: string}): string {
    const hash = crypto.createHash('md5').update(JSON.stringify(env)).digest('hex')
    return hash
}

export { createEnvHash }