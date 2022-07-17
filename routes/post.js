import exp from "express";
import dotenv from "dotenv";
import User from "../models/user.js";
import VehicleModels from "../models/vehicleModel.js";
import VehicleTypes from "../models/vehicleType.js";

var router = exp();
var router = exp.Router();
dotenv.config({ path: "../config.env" });

router.get("/", (req, res) => {
  res.send("machine working....");
});

router.post("/register", async (req, res) => {
  console.log("data::", req.body);

  try {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    await user
      .save()
      .then((result) => {
        console.log("result of register:", result);
        res.send("sign up success");
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
});

router.post("/vehicleTypeEntered", async (req, res) => {
  console.log("data entered for vehicle type:", req.body);
  try {
    const newVehicleType = new VehicleTypes({
      vehicleTypeName: req.body.vehicleTypeName,
      numberOfWheels: req.body.numberOfWheels,
    });
    await newVehicleType
      .save()
      .then((result) => {
        res.send("new vehicle type");
        console.log("new vehicle type", result);
      })
      .catch((err) => {
        console.log("error while entering new vehilce type", err);
      });
  } catch (error) {
    console.error("error while entering data for vehicle type", error);
  }
});

router.post("/vehicleModelEntered", async (req, res) => {
  console.log("data entered for vehicle model:", req.body);
  try {
    const newVehicleModel = new VehicleModels({
      modelName: req.body.modelName,
      vehicleType: req.body.vehicleType,
      bookingDate: req.body.bookingDate,
    });
    await newVehicleModel
      .save()
      .then((result) => {
        res.send("new vehicle Model entered");
        console.log("new vehicle type", result);
      })
      .catch((err) => {
        console.log("error while entering new vehilce model", err);
      });
  } catch (error) {
    console.error("error while entering data for vehicle model", error);
  }
});

router.get("/vehicleType", async (req, res) => {
  VehicleTypes.find()
    .then((result) => {
      console.log("vehicle type extracted:", result);
      res.send(result);
    })
    .catch((err) => {
      console.error("error for extracting vehicle types", err);
    });
});

router.get("/vehicleModel", async (req, res) => {
  VehicleModels.find()
    .then((result) => {
      console.log("vehicle model extracted:", result);
      res.send(result);
    })
    .catch((err) => {
      console.error("error for extracting vehicle models", err);
    });
});

router.post("/bookSelectedVehicle", async (req, res) => {
  console.log("selected vehicle", req.body.dateRange[0].startDate);
  try {
    let doc = await VehicleModels.findOne({ modelName: req.body.value });
    // update values
    doc.isBooked = true;
    doc.startBookingDate = req.body.dateRange[0]?.startDate;
    doc.endBookingDate = req.body.dateRange[0]?.endDate;
    await doc
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => res.status(400).send(err));
  } catch (error) {
    console.log(error);
  }
});
export default router;
