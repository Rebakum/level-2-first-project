import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './studentValidation ';

// import studentValidationSchema from './student.Joi.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    //student validation for joi data
    // const validateUserInfo = studentValidationSchema.validate(req.body);

    //will call service func to send data
    // const result = await StudentServices.createStudentIntoDB(
    //   validateUserInfo.value,
    // );
    const validationInfo = studentValidationSchema.parse(req.body); //for zod validation
    const result = await StudentServices.createStudentIntoDB(validationInfo);

    // send response
    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      data: err,
    });
  }
};
const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'Student are retrieved succesfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      data: err,
    });
    // console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student are retrieved succesfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      data: err,
    });
    // console.log(err);
  }
};

//for delete
const deletedStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'student deleted is successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      data: err,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudent,
  getSingleStudent,
  deletedStudent,
};
