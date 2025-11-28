require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db.js'); // ✅ Centralized DB connection

// 🔹 Import all routes
const auth = require('./authentication/routes/authRoutes');
const formRoutes = require('./ConferanceModel/routes/confrenceRoutes');
const executiveMembers = require('./executiveMember/routes/ExecutiveRoutes.js');
const HonoraryMembers = require('./Honorary_Members_Form/routes/HonorarymembersRoutes.js');
const lifememdata = require('./LifeMembers/routes/lifememberRoutes.js');
const LifeFellowmembers = require('./lifeFellowMembers/routes/uploadRoutes.js');
const subscriberRoutes = require('./Newsletter_Model/routes/newsletterRoutes');
const allquery = require('./contact_query/routes/contactRoutes.js');
const ordinaryMemberRoutes = require('./OrdinaryMembers/routes/ordinaryMembers');
const emailTemplateRoutes = require('./email_template_module/routes/emailTemplateRoutes.js');
const presidentAndSecretaryRoutes = require('./presidentAndSecratory/routes/presidentAndSecretaryRoutes.js')
const awardRoutes = require("./Awards/routes/awardRoutes");
const winnerRoutes = require("./Awards/routes/winnerRoutes");


const eventRoutes = require("./NAPCON/routes/eventRoutes.js");
const photoRoutes = require("./NAPCON/routes/photoRoutes.js");


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// ✅ Connect Database
connectDB();

// ✅ Socket.io setup
io.on('connection', (socket) => {
  console.log('🟢 A user connected');
  socket.on('disconnect', () => {
    console.log('🔴 A user disconnected');
  });
});

// ✅ Middlewares
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// ✅ Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// ✅ Sample file upload endpoint
app.post('/Lifemembers/PostLifemembers', upload.single('file'), (req, res) => {
  const { name, id, email, number, state, address } = req.body;
  console.log('File uploaded:', req.file);
  res.send('Form submitted successfully!');
});

// ✅ Serve static files (images, etc.)
// ✅ Serve static files (images, etc.)
app.use("/gallery_images", express.static(path.join(__dirname, "NAPCON/Upload_Photo/gallery_images")));

// ✅ Routes registration
app.use('/api', formRoutes);
app.use('/executiveMembers', executiveMembers);
app.use('/api/auth', auth);
app.use('/honorarymembers', HonoraryMembers);
app.use('/Lifemembers', lifememdata);
app.use('/fellowmember', LifeFellowmembers);
app.use('/news', subscriberRoutes);
app.use('/Contact_querys', allquery);
app.use('/templateData', emailTemplateRoutes);
app.use('/ordinaryMember', ordinaryMemberRoutes);
app.use('/api/president-secretary', presidentAndSecretaryRoutes);

app.use("/api/awards", awardRoutes);
app.use("/api/winners", winnerRoutes);


app.use("/api/events", eventRoutes);
app.use("/api/photos", photoRoutes);


// ✅ Start Server
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
