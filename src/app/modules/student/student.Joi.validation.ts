import Joi from 'joi';

// Guardian validation schema
const GuardianSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/, 'phone number')
    .required(),
});

// UserName validation schema
const UserNameSchema = Joi.object({
  firstName: Joi.string().required(),
  middleName: Joi.string().optional(),
  lastName: Joi.string().required(),
});

// Local Guardian validation schema
const LocalGuardianSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/, 'phone number')
    .required(),
  address: Joi.string().required(),
});

// Main Student validation schema
const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: UserNameSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  dateOfBirth: Joi.date().iso().required(), // Ensures valid ISO date format
  email: Joi.string().email().required(),
  contactNo: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/, 'phone number')
    .required(),
  emergencyContactNo: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/, 'phone number')
    .required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .required(),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: GuardianSchema.required(),
  localGuardian: LocalGuardianSchema.required(),
  profileImg: Joi.string().uri().optional(), // Ensures it's a valid URL
  isActive: Joi.string().valid('active', 'blocked').optional(),
  default: 'active',
});
export default studentValidationSchema;
