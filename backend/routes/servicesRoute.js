const express = require("express");
const router = express.Router();

const {
  authMiddleware,
  adminMiddleware,
} = require("../controllers/authController");

const tokenAuth = require("../middlewares/tokenAuth");
const {
  Services,
  ServicesList,
  removeServices,
  updateServices,
} = require("../controllers/servicesController");

router.post("/services", tokenAuth, adminMiddleware, Services);
router.get("/services", ServicesList);
router.delete("/services/:slug", tokenAuth, adminMiddleware, removeServices);
router.put("/services/:slug", tokenAuth, adminMiddleware, updateServices);

module.exports = router;