const winston = require('winston');
//require('winston-mongodb');

module.exports = function() {
    // Handle uncaught exceptions
    winston.handleExceptions(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' })
    );

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (ex) => {
        throw ex; // Winston will catch it as an uncaught exception
    });

    // Normal logging: console
    winston.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));

    // Normal logging: file
    winston.add(new winston.transports.File({ filename: 'logfile.log' }));

    // Optional: log to MongoDB
    // winston.add(new winston.transports.MongoDB({
    //     db: 'mongodb://localhost/movie',
    //     options: { useUnifiedTopology: true },
    //     collection: 'log',
    //     level: 'info'
    // }));
};

// const winston = require('winston')
// module.exports = function (){
//     winston.handleExceptions(
//         new winston.transports.Console({colorize:true , prettyPrint:true}),
//         new winston.transports.File({filename :'uncaughtExceptions.log'})
//     )
// }

// process.on('unhandledRejection',(ex)=>{
//    throw ex;
// })


// winston.add(new winston.transports.File({ filename: 'logfile.log' }));


