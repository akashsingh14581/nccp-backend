const express = require('express');
const router = express.Router();

const { createOrdinaryMember, updateOrdinaryMemberById, uploadOrdinaryExcel, getAllOrdinaryMembers, deleteOrdinaryMemberById } = require('../controllers/ordinaryMembers');

router.post("/createOrdinaryMember", createOrdinaryMember);
router.put("/updateOrdinaryMember/:id", updateOrdinaryMemberById);
router.post("/uploadOrdinaryExcel", uploadOrdinaryExcel);
router.get("/getAllOrdinaryMembers", getAllOrdinaryMembers);
router.delete("/deleteOrdinaryMember/:id", deleteOrdinaryMemberById)

module.exports = router;
