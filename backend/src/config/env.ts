import dotenv from 'dotenv'
dotenv.config()

export const config = {
    // 服务配置
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '8000', 10),

    // 数据库
    databaseUrl: process.env.DATABASE_URL || '',

    // Redis
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',

    // JWT
    jwt: {
        secret: process.env.JWT_SECRET || 'dev-secret',
        expiresIn: process.env.JWT_EXPIRES_IN || '15m',
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    },

    // CORS
    cors: {
        origins: [
            process.env.FRONTEND_URL || 'http://localhost:3000',
            process.env.MANAGEMENT_URL || 'http://localhost:3001',
            process.env.PORTAL_URL || 'http://localhost:3002',
        ],
    },

    // 文件上传
    upload: {
        dir: process.env.UPLOAD_DIR || './uploads',
        maxSize: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10),
    },
}

export default config
