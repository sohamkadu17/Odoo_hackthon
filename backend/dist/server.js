import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { QueryTypes } from 'sequelize';
import sequelize from './config/database';
import authRoutes from './routes/authRoutes';
import tripRoutes from './routes/tripRoutes';
import searchRoutes from './routes/searchRoutes';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/search', searchRoutes);
// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});
// Initialize database and start server
const startServer = async () => {
    try {
        // Rebuild the schema in local development so stale table shapes do not block startup.
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        const tables = await sequelize.query('SELECT table_name AS tableName FROM information_schema.tables WHERE table_schema = DATABASE();', { type: QueryTypes.SELECT });
        for (const table of tables) {
            await sequelize.query(`DROP TABLE IF EXISTS \`${table.tableName}\``);
        }
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        await sequelize.sync();
        console.log('✓ Database synchronized successfully');
        // Start Express server
        app.listen(PORT, () => {
            console.log(`✓ Server running on http://localhost:${PORT}`);
            console.log(`✓ Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
        });
    }
    catch (error) {
        console.error('✗ Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
export default app;
//# sourceMappingURL=server.js.map