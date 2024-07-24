import User from "../models/userModel";
import Invoice from require("../models/invoiceModel");

const createInvoice = async(userId, invoiceData) =>{
    const session = await Invoice.startSession();
    session.startTransaction();
    try {
        const newInvoice = await Invoice.create([{ ...invoiceData, user: userId }], { session });
        await User.findByIdAndUpdate(
        userId,
        { $push: { invoices: newInvoice[0]._id } },
        { session }
        );

        await session.commitTransaction();
        return newInvoice[0];
    }
    catch(error){
        await session.abortTransaction();
        throw error;
    }
    finally{
        session.endSession();
    }
};

const getInvoices = async(userId)=>{
    return await Invoice.find({user: userId})
};

const getInvoiceById = async (invoiceId,userId) =>{
    return await Invoice.findByIdAndUpdate(
        {_id: invoiceId, user: userId},
        updateData,
        {new: true, runValidators: true}
    );
};

const deleteInvoice = async(invoiceId,userId)=>{
    const session = await Invoice.startSession();
    session.startTransaction();

    try {
        const deletedInvoice = await Invoice.findOneAndDelete({ _id: invoiceId, user: userId }, { session });
        if (deletedInvoice) {
          await User.findByIdAndUpdate(
            userId,
            { $pull: { invoices: invoiceId } },
            { session }
          );
        }
    
        await session.commitTransaction();
        return deletedInvoice;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    }
    finally{
        session.endSession();
    }
};

export default {deleteInvoice,createInvoice,getInvoiceById,getInvoices};