export const authenticate = (req, res, next) => {
const token = req.headers["x-token"]; // fake token check for teaching


if (token === "12345") {
return next();
}
res.status(401).json({ message: "Unauthorized" });
};