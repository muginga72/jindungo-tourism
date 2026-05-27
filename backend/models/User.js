// // models/User.js
// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     phone: String,
//     passwordHash: { type: String, required: true },
//     role: {
//       type: String,
//       enum: ["admin", "customer", "guide", "driver", "community_leader"],
//       default: "customer",
//     },
//     isActive: { type: Boolean, default: true },

//     // New fields for photo and ID
//     profilePhoto: {
//       type: String,
//       default: null,
//     },
//     idDocument: {
//       type: String,
//       default: null,
//     },

//     idDocumentType: {
//       type: String,
//       enum: ["passport", "driver_license", "national_id", "other"],
//       default: "other",
//     },
//     idVerified: {
//       type: Boolean,
//       default: false,
//     },
//     idUploadedAt: {
//       type: Date,
//       default: null,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("User", UserSchema);


// models/User.js
import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  customers: [{ type: String }],       // list of customer names
  date: { type: String },              // YYYY-MM-DD
  time: { type: String },              // HH:mm
  community: { type: String },         // community name
  tour: { type: String },              // tour name/title
}, { _id: false });

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    passwordHash: { type: String, required: true },

    role: {
      type: String,
      enum: ["admin", "customer", "guide", "driver", "community_leader"],
      default: "customer",
    },

    isActive: { type: Boolean, default: true },

    // Photos + ID
    profilePhoto: { type: String, default: null },
    idDocument: { type: String, default: null },
    idDocumentType: {
      type: String,
      enum: ["passport", "driver_license", "national_id", "other"],
      default: "other",
    },
    idVerified: { type: Boolean, default: false },
    idUploadedAt: { type: Date, default: null },

    // NEW: Assignments
    assignments: {
      driverAssignment: { type: assignmentSchema, default: null },
      guideAssignment: { type: assignmentSchema, default: null },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);