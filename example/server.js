import {App} from '../dist/index.js'

const app = new App();

app.listen(3000, () => {
    console.log('Server started on port 3000');
})