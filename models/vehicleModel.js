import mongoose from "mongoose";

const vehicleModel = mongoose.Schema(
  {
    modelName: { type: String, required: true },
    vehicleType: { type: String, required: true },
    isBooked: { type: Boolean, default: false },
    startBookingDate: { type: Date },
    endBookingDate: { type: Date },
  },
  { timestamps: true }
);

const VehicleModels = mongoose.model("VehicleModels", vehicleModel);
export default VehicleModels;
