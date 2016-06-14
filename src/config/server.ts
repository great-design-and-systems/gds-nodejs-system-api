import bodyParser = require("body-parser");
import morgan = require("morgan");
const PORT = process.env.port || 3000;

export function Server(app) {
    app.use(morgan("dev"));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.json({
        type: "application/vnd.api+json"
    }));
    app.listen(PORT, () => {
        console.log("listening on PORT" + PORT);
    });
}