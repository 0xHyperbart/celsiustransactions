module.exports.handle = async function handle(req, res, perform) {
  try {
    const result = await perform(req);
    res.status(200).json({
      success: true,
      version: "v1",
      ...result,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      error: error.message,
      version: "v1",
    });
  }
};
