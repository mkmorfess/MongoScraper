const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');

// Set port
const PORT = process.env.PORT || 3000

//Init App
const app = express();

// View engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Static folder
app.use(express.static(path.join(__dirname, './public')));

// require('./routes/htmlRoutes.js')(app)
const routes = require('./routes/route.js')

app.use("/", routes);

app.listen(PORT, function () {
    console.log("Server started on " + PORT);
});
