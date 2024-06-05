import * as http from 'http';
import { Router } from '../core/router';
import { ErrorHandler } from '../core/errorHandler';
import { Logger } from '../core/logger';

export interface Server {
    listen(port: number, callback: () => void): void;
}
