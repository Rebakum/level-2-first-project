import { Schema, model } from 'mongoose';
import validator from 'validator';

// Sub-schemas for Guardian, UserName, and LocalGuardian
const userNameSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, 'First name cannot exceed 20 characters'],
    validate: {
      validator: function (value: string) {
        const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
        return capitalized === value;
      },
      message: '{VALUE} must start with a capital letter',
    },
  },
  middleName: {
    type: String,
    trim: true,
    maxlength: [20, 'Middle name cannot exceed 20 characters'],
    validate: {
      validator: function (value: string) {
        if (!value) return true; // Optional field
        const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
        return capitalized === value;
      },
      message: '{VALUE} must start with a capital letter',
    },
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} must contain only letters',
    },
  },
});

const guardianSchema = new Schema({
  fatherName: {
    type: String,
    required: [true, 'Father name is required'],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required'],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, 'Mother name is required'],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required'],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother contact number is required'],
    validate: {
      validator: (value: string) => validator.isMobilePhone(value),
      message: '{VALUE} is not a valid phone number',
    },
  },
});

const localGuardianSchema = new Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true },
  occupation: {
    type: String,
    required: [true, 'Occupation is required'],
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required'],
    validate: {
      validator: (value: string) => validator.isMobilePhone(value),
      message: '{VALUE} is not a valid phone number',
    },
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
  },
});

// Main Student Schema
const studentSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: userNameSchema, required: true },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: String },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not a valid email',
      },
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    guardian: { type: guardianSchema, required: true },
    localGuardian: { type: localGuardianSchema, required: true },
    profileImg: {
      type: String,
      validate: {
        validator: (value: string) => validator.isURL(value),
        message: '{VALUE} is not a valid URL',
      },
    },
    isActive: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    versionKey: false,
  },
);

export const StudentModel = model('Student', studentSchema);
