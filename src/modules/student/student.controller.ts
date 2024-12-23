import { Request, Response } from 'express';
import studentValidationSchema from './student.Joi.validation';
import { StudentServices } from './student.service';

// import studentValidationSchema from './student.Joi.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    //student validation data
    const validateUserInfo = studentValidationSchema.validate(req.body);

    //will call service func to send data
    const result = await StudentServices.createStudentIntoDB(
      validateUserInfo.value,
    );

    // const validateInfo = StudentZodSchema.parse(req.body);
    // const result = await StudentServices.createStudentIntoDB(validateInfo);
    //send response
    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
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
    console.log(err);
  }
};
export const StudentControllers = { createStudent, getAllStudentFromDB };
