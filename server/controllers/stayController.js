const {
  getAllStays,
  createStay,
  getStayById,
  getHostStays,
  updateStay,
  deleteStay,
} = require("../services/stayService");



// ======================
// GET ALL STAYS
// ======================

const getStays = async (req, res) => {
  console.log("1. Controller entered");

  try {
    console.log("2. Before getAllStays");

    const stays = await getAllStays(req.query);

    console.log("3. After getAllStays", stays.length);

    return res.status(200).json(stays);
  } catch (err) {
    console.error("Controller Error:", err);

    return res.status(500).json({
      message: err.message,
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






module.exports = {

  getStays,

  addStay,

  getStay,

  getMyStays,

  editStay,

  removeStay,

};