var path = require("path");

var SRC_DIR = path.resolve(__dirname, "src/scripts");

var config = {
    entry: SRC_DIR + "/utilities/index.js",    
    output: {
        path: path.resolve(__dirname, "src"),
        filename: "bundle.js"
    },   
    module: {
        rules: [{        
                test: /\.js?/,
                include: SRC_DIR,
                loader: "babel-loader",
                query: {
                    presets: ["react", "env", "stage-2"]
                },
            }]
    }
};

module.exports = config;