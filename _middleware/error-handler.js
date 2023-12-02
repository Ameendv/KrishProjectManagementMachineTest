module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    console.log('[errorHandler]', err)
    switch (true) {
        case typeof err === 'string':
            // custom application error
            const is404 = err.toLowerCase().endsWith('not found');
            const statusCode = is404 ? 404 : 400;

            // ringcaptcha errors
            if (err === 'ERROR_INVALID_SESSION') err = 'session expired'
            if (err === 'ERROR_WAIT_TO_RETRY') err = 'retry after few time'

            return res.status(statusCode).json({ status_code: 400, message: err, body: {} });
        case err.name === 'UnauthorizedError':
            // jwt authentication error
            const errorMessage = err.message === 'jwt expired' ? err.message : 'Unauthorized'
            return res.status(401).json({ status_code: 400, message: errorMessage, body: {} });
        case err.name === "SequelizeForeignKeyConstraintError":
            return res.status(409).json({ status_code: 400, message: err.parent.sqlMessage, body: {} })
        default:
            console.log(err.name)

            return res.status(500).json({ status_code: 400, message: err, body: {} })

    }
}