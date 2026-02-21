



exports.getAllBooks = async function(req,res) => {
    try {
        return res.status(200).json({
            books 
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false 
        });
    }
}

exports.getBookById = async function (req,res) {
    try {
        const id = req.params;
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false 
        });
    }
}