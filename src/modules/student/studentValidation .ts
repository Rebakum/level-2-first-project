import { z } from 'zod';

// Gender and Blood Group Enums
const genderEnum = z.enum(['male', 'female', 'other']);
const bloodGroupEnum = z.enum([
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
]);

// Sub-schemas for Guardian, UserName, and LocalGuardian
const userNameSchema = z.object({
  firstName: z.string().nonempty('First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().nonempty('Last name is required'),
});

const guardianSchema = z.object({
  fatherName: z.string().nonempty('Father name is required'),
  fatherOccupation: z.string().nonempty('Father occupation is required'),
  motherName: z.string().nonempty('Mother name is required'),
  motherOccupation: z.string().nonempty('Mother occupation is required'),
  motherContactNo: z
    .string()
    .nonempty('Mother contact number is required')
    .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number format'),
});

const localGuardianSchema = z.object({
  name: z.string().nonempty('Name is required'),
  occupation: z.string().nonempty('Occupation is required'),
  contactNo: z
    .string()
    .nonempty('Contact number is required')
    .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number format'),
  address: z.string().nonempty('Address is required'),
});

// Main Student Schema
const studentSchema = z.object({
  id: z.string().nonempty('ID is required'),
  name: userNameSchema,
  gender: genderEnum,
  dateOfBirth: z.string().nonempty('Date of birth is required'),
  email: z.string().email('Invalid email format'),
  contactNo: z
    .string()
    .nonempty('Contact number is required')
    .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number format'),
  emergencyContactNo: z
    .string()
    .nonempty('Emergency contact number is required')
    .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number format'),
  bloodGroup: bloodGroupEnum,
  presentAddress: z.string().nonempty('Present address is required'),
  permanentAddress: z.string().nonempty('Permanent address is required'),
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: z.string().url('Invalid URL format').optional(),
  isActive: z.enum(['active', 'blocked']).optional(),
});

// Export the schema
export const StudentZodSchema = studentSchema;