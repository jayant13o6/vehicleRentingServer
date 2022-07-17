import mongoose from "mongoose";

const vehicleType = mongoose.Schema(
  {
    vehicleTypeName: { type: String, required: true },
    numberOfWheels: { type: Number, required: true },
  },
  { timestamps: true }
);

const VehicleTypes = mongoose.model("VehicleTypes", vehicleType);
export default VehicleTypes;
