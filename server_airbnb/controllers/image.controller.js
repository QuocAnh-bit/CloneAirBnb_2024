var path = require("path");
module.exports = {
  index: (req, res) => {
    console.log(req.query);
    const imgName = req.params.name;
    const imgsRouter = req.params.imgsRouter;
    const options = {
      root: path.join(__dirname, `../public/images/${imgsRouter}`),
    };
    res.sendFile(imgName, options);
  },
};
