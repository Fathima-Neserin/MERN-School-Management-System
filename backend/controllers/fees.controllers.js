const FeesHistory = require("../models/fees.model");
const asyncHandler = require("express-async-handler");


exports.fetchFeesHistories = asyncHandler(async(req, res) => {
    try {        
        const histories = await FeesHistory.find();

        if(histories){
            res.status(200).json({ success:true, message: "Fees histories fetched successfully", histories})
        }
    } catch (error) {
        console.error("Error while fetching fees histories : " , error.message );
        res.status(500).json({error: "Internal server error"})
    }
})


exports.addNewFeeHistory = asyncHandler(async(req, res) => {
    
    try {
        const { studentID,  
            feeName,
            amount, 
            paidDate, 
            studentName, 
            section} = req.body;
        if(!studentID || !bookId || !section || !feeName || !studentName || !paidDate || !amount){
            return res.status(400).json({success:false, message:"All fields are required"})
        }
        const newHistory = await FeesHistory.create({
            studentID,  
            feeName,
            amount, 
            paidDate, 
            studentName, 
            section
        });
        await newHistory.save();
        res.status(200).json({success:true, message:`New fee history added`, newHistory})
    } catch (error) {
        console.error("Error while adding new fee history : " , error.message );
        res.status(500).json({error: "Internal server error"})
    }
})


exports.editFeeHistory= asyncHandler(async(req, res) => {
    try {
        const { studentID,  
            feeName,
            amount, 
            paidDate, 
            studentName, 
            section } = req.body;

        const history = await FeesHistory.findById(req.params.id);
        
        if (history) {
            history.studentID = studentID || history.studentID;
            history.bookId = bookId || history.bookId;
            history.feeName = feeName || history.feeName;
            history.amount = amount || history.amount;
            history.paidDate = paidDate || history.paidDate;
            history.studentName = studentName || history.studentName;
            history.section = section || history.section;
           
            const updatedHistory = await history.save();
            res.status(200).json({
                success: true,
                message: ` Fee history of ${history.studentName} updated successfully`,
                updatedHistory
            });
        } else {
            res.status(404).json({ message: "History not found" });
        }
    } catch (error) {
        console.error("Error while editing fee history : " , error.message );
        res.status(500).json({error: "Internal server error"})
    }
})


exports.deleteFeeHistory = asyncHandler(async (req, res) => {
    try {
    
        const history = await FeesHistory.findById(req.params.id);

        if (history) {
            const deleteHistory = await history.deleteOne();
            res.status(200).json({
                success: true,
                message: `${history.feeName} by ${history.studentName} deleted successfully`,
                deleteHistory,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "History not found",
            });
        }
    } catch (error) {
    
        console.error("Error while deleting fee history:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

