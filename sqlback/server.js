const app = require("./app")

const port = process.env.port || 4001;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})