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
const getAllStudentFromDB = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'Student are retrieved succesfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: err,
    });
    // console.log(err);
  }
};
export const StudentControllers = { createStudent, getAllStudentFromDB };
