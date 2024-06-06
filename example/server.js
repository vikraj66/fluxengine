import * as way from '../dist/index.js'

const app = new way.App();
app.listen(3000, () => {
    console.log('server started at port 3000')
})