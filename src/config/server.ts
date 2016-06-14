import bodyParser = require("body-parser");
import morgan = require("morgan");
const PORT = process.env.port || 3000;

export function Server(app) {
    app.set('port', (process.env.PORT || 5000));
    app.use(morgan("dev"));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.json({
        type: "application/vnd.api+json"
    }));
    app.listen(app.get('port'), () => {
        console.log('Node app is running on port', app.get('port'));
    });
    app.get("/", (req, res) => res.send("Welcome to GDS System API"));
}