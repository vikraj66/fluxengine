import * as http from 'http';
import { Controller, Route } from '@/core/controller';

@Controller('/products')
export class ProductController {
    @Route('get', '/')
    getAllProducts(req: http.IncomingMessage, res: http.ServerResponse) {
        console.log("got hit at", req.url)
        res.statusCode = 200;
        res.end(JSON.stringify([{ id: 1, name: 'Laptop' }]));
    }

    @Route('get', '/:id')
    getProductById(req: http.IncomingMessage, res: http.ServerResponse) {
        const productId = req.url?.split('/')[2];
        res.statusCode = 200;
        res.end(JSON.stringify({ id: productId, name: 'Laptop' }));
    }
}
