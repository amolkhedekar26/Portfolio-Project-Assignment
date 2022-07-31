module.exports = {
  handleSuccessResponse: (res, data, message,status=200) => {
    res.status(status).json({
      success: true,
      status: status,
      message: message,
      data: data,
    });
  },
  handleErrorResponse: (res, error) => {
    res.status(error.status || 500).json({
      success: false,
      status: error.status || 500,
      message: error.message,
    });
  },
};
