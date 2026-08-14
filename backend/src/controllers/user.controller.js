const getCurrentUser = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "User fetched successfully",
    user: req.user,
  });
};

module.exports = {
  getCurrentUser,
};