// const jwt = require("jsonwebtoken")

// const jwtSocketHandshake = async (socket, next) => {
//     const { accessToken } = req.body;

//       const token = socket.handshake.auth.token;

//       if (!token) {
//         return next(new Error("Authentication error"));
//       }

//       jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//           return next(new Error("Authentication error"));
//         }

//         // Attach the user information to the socket for future use
//         socket.user = decoded.user;
//         next();
//     }
//       )

// }
