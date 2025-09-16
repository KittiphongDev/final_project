export const checkPassword = (req, res) => {
	const {
		password
	} = req.body;
	if (password === "1234") {
		res.json({
			valid: true
		});
	} else {
		res.json({
			valid: false
		});
	}
};

// middleware สำหรับเช็ครหัสผ่านในส่วนที่มาจากทางฝั่งแอดมิน
export const authMiddleware = (req, res, next) => {
	const pwd = req.headers["x-password"];
	if (pwd !== "1234") return res.status(401).json({
		error: "รหัสผ่านไม่ถูกต้อง"
	});
	next();
};
