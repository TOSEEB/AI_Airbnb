const {
  getAllStays,
  createStay,
  getStayById,
  getHostStays,
  updateStay,
  deleteStay,
  getStayLocations,
} = require("../services/stayService");



// ======================
// GET ALL STAYS
// ======================

const getStays = async (req, res) => {
  try {
    const stays = await getAllStays(req.query);
    return res.status(200).json(stays);
  } catch (err) {
    console.error("Controller Error:", err);

    const dbDown =
      err.name === "MongoServerSelectionError" ||
      err.name === "MongoNetworkError" ||
      err.message?.includes("ENOTFOUND");

    return res.status(dbDown ? 503 : 500).json({
      message: dbDown
        ? "Database is unavailable. Check MongoDB Atlas DNS and Network Access."
        : err.message,
    });
  }
};





// ======================
// CREATE STAY (HOST)
// ======================

const addStay = async (req, res) => {

  try {

    const stay = await createStay(
      req.body,
      req.user.id
    );


    res.status(201).json(stay);


  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};






// ======================
// GET SINGLE STAY
// ======================

const getStay = async (req, res) => {

  try {

    const stay = await getStayById(
      req.params.id
    );


    if (!stay) {

      return res.status(404).json({
        message: "Stay not found",
      });

    }


    res.json(stay);


  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};







// ======================
// GET HOST OWN STAYS
// ======================

const getMyStays = async (req, res) => {

  try {

    const stays = await getHostStays(
      req.user.id
    );


    res.json(stays);


  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};








// ======================
// UPDATE STAY (HOST)
// ======================

const editStay = async (req, res) => {

  try {


    const stay = await updateStay(

      req.params.id,

      req.body,

      req.user.id

    );



    if (!stay) {

      return res.status(404).json({

        message: "Stay not found",

      });

    }



    res.json({

      message: "Stay updated successfully",

      stay,

    });



  } catch (err) {


    res.status(500).json({

      message: err.message,

    });


  }

};








// ======================
// DELETE STAY (HOST)
// ======================

const removeStay = async (req, res) => {

  try {


    const stay = await deleteStay(

      req.params.id,

      req.user.id

    );



    if (!stay) {

      return res.status(404).json({

        message: "Stay not found",

      });

    }




    res.json({

      message: "Stay deleted successfully",

    });



  } catch (err) {


    res.status(500).json({

      message: err.message,

    });


  }

};


const listLocations = async (req, res) => {
  try {
    const locations = await getStayLocations();
    return res.status(200).json({ locations });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Failed to load locations",
    });
  }
};

module.exports = {
  getStays,
  addStay,
  getStay,
  getMyStays,
  editStay,
  removeStay,
  listLocations,
};
