const Invoice = require( "../models/invoiceModel")
const User = require("../models/userModel")

const createInvoice = async (userId, invoiceData) => {
  if (!userId || !invoiceData) {
    throw new Error('userId or invoiceData is missing');
  }

  const session = await Invoice.startSession();
  session.startTransaction();
  try {
    console.log('Creating invoice with data:', invoiceData);

    const newInvoice = await Invoice.create([{ ...invoiceData, user: userId }], { session });
    
    if (!newInvoice[0]) {
      throw new Error('Invoice creation failed');
    }

    await User.findByIdAndUpdate(
      userId,
      { $push: { invoices: newInvoice[0]._id } },
      { session }
    );

    await session.commitTransaction();
    return newInvoice[0];
  } catch (error) {
    console.error('Error in createInvoice:', error.message);
    await session.abortTransaction();
    throw error;
  } finally {
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

module.exports  = {deleteInvoice,createInvoice,getInvoiceById,getInvoices};