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
  SingleService,
  removeServices,
  photo,
  listRelatedPortfolio,
  CreatePortfolio,
  PortfolioList,
} = require("../controllers/servicesController");

router.post("/services", tokenAuth, adminMiddleware, Services);
router.delete("/services/:slug", tokenAuth, adminMiddleware, removeServices);
router.post("/all-services", ServicesList);
router.get("/service/:slug", SingleService);
router.get("/services/photo/:slug", photo);

//Portfolio

router.post("/portfolio", tokenAuth, adminMiddleware, CreatePortfolio);
router.post("/all-portfolios", PortfolioList);
router.post("/portfolios/related", listRelatedPortfolio);

module.exports = router;
