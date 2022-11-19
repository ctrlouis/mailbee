import express from 'express';
import type { Request, Response } from 'express';
import prometheus from 'prom-client';

const router = express.Router();

const register = new prometheus.Registry();
prometheus.collectDefaultMetrics({ register });

export const prometheusRouter = router.get('/metrics', async (req: Request, res: Response) => {
    res.setHeader('Content-Type', register.contentType);
    res.end(await register.metrics());
});

export const totalFormSubmissions = new prometheus.Counter({
    name: 'mailbee_form_submissions_total',
    help: 'Number of forms submissions',
    labelNames: ['formName'],
});

register.registerMetric(totalFormSubmissions);
