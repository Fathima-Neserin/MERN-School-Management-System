const LibraryHistory = require("../models/library.models");
const asyncHandler = require("express-async-handler");


exports.fetchLibraryHistories = asyncHandler(async(req, res) => {
    try {        
        const histories = await LibraryHistory.find();

        if(histories){
            res.status(200).json({ success:true, message: "Library histories fetched successfully", histories})
        }
    } catch (error) {
        console.error("Error while fetching library histories : " , error.message );
        res.status(500).json({error: "Internal server error"})
    }
})


exports.addNewLibraryHistory = asyncHandler(async(req, res) => {
    
    try {
        const { studentID, 
            bookId, 
            bookName,
            borrowedStudent, 
            borrowedDate, 
            returnDate, 
            totalCount, 
            standard ,
            availableCount,
            status} = req.body;
        if(!studentID || !bookId || !standard || !bookName || !borrowedStudent || !borrowedDate || !returnDate || !totalCount || !availableCount || !status){
            return res.status(400).json({success:false, message:"All fields are required"})
        }
        const newHistory = await LibraryHistory.create({
            studentID,
            bookId,
            standard,
            bookName,
            borrowedStudent,
            borrowedDate,
            returnDate,
            totalCount,
            availableCount,
            status
        });
        await newHistory.save();
        res.status(200).json({success:true, message:`${bookName} borrowed ${borrowedStudent} recently `, newHistory})
    } catch (error) {
        console.error("Error while borrowing book : " , error.message );
        res.status(500).json({error: "Internal server error"})
    }
})


exports.editLibraryHistory = asyncHandler(async(req, res) => {
    try {
        const { studentID, 
            bookId, 
            bookName,
            borrowedStudent, 
            borrowedDate, 
            returnDate, 
            totalCount, 
            standard,
            availableCount,
            status } = req.body;

        const history = await LibraryHistory.findById(req.params.id);
        
        if (history) {
            history.studentID = studentID || history.studentID;
            history.bookId = bookId || history.bookId;
            history.bookName = bookName || history.bookName;
            history.borrowedStudent = borrowedStudent || history.borrowedStudent;
            history.borrowedDate = borrowedDate || history.borrowedDate;
            history.returnDate = returnDate || history.returnDate;
            history.totalCount = totalCount || history.totalCount;
            history.availableCount = availableCount || history.availableCount;
            history.standard = standard || history.standard;
            history.status = status || history.status;

            const updatedHistory = await history.save();
            res.status(200).json({
                success: true,
                message: ` History of ${history.bookName} updated successfully`,
                updatedHistory
            });
        } else {
            res.status(404).json({ message: "History not found" });
        }
    } catch (error) {
        console.error("Error while editing library history : " , error.message );
        res.status(500).json({error: "Internal server error"})
    }
})


exports.deleteLibraryHistory = asyncHandler(async (req, res) => {
    try {
    
        const history = await LibraryHistory.findById(req.params.id);

        if (history) {
            const deleteHistory = await history.deleteOne();
            res.status(200).json({
                success: true,
                message: `${history.bookName}borrowed by ${history.borrowedStudent} deleted successfully`,
                deleteHistory,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "History not found",
            });
        }
    } catch (error) {
    
        console.error("Error while deleting library history:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

