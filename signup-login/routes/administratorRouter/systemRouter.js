const router = require('express').Router();
const os = require('os');

router.route('/')
.get(function(req, res){
  res.status(200).json({
    hostname: os.hostname(),
    platform: os.platform(),
    type: os.type(),
    uptime: os.uptime(),
    totalMem: os.totalmem(),
    freeMem: os.freemem(),
    loadAvg: os.loadavg(),
    cpus: os.cpus()
  });
})
.post(function(req, res){
  res.json({success: true});
});

module.exports = router;
