const indexController = {
    getIndex: (req, res) => {
        res.status(200).json({
            statusCode: 200,
            message: "Back end is up and running",
        });
    }
}

export default indexController;