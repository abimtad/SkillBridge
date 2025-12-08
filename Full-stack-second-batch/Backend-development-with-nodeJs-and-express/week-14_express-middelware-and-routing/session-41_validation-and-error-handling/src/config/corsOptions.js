const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["POST", "PUT", "PATCH", "DELETE"],
  credentials: true
};

export default corsOptions;
