const express = require('express');
const router = express.Router();
const path = __dirname + '/views/build/';
router.use(express.static(path));


router.get('*', function (req,res) {
    res.sendFile(path + "index.html");
  });


module.exports = router;