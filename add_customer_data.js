const { MongoClient }  = require("mongodb");
              const { ObjectId } = require('mongodb');  
              const url = "mongodb://127.0.0.1:27017"; 
              const client = new MongoClient(url);
            const xlsx = require('xlsx'); // Add this line   

              const storage = multer.memoryStorage();
            const upload = multer({ storage: storage });
            const saltRounds = 10; // Salt rounds for bcrypt


                
                // Helper function to parse Excel
                async function parseExcel(fileData) {
                    const workbook = xlsx.read(fileData, { type: 'buffer' });
                    const sheetName = workbook.SheetNames[0];
                    return xlsx.utils.sheet_to_json(workbook.Sheets[sheetName])
                    .map(({ name, Gender }) => ({ name, Gender }));
                }
              

              const formdata_add = async (req, res) => {
                // console.log('my_data'+ JSON.stringify(req.files[]));
                try {
                    await client.connect(); // Connect to MongoDB
                    const db = client.db('CRM'); // Create or access the new database
                    const bodyData = req.body.all_form;
                    const collectionName = req.body.myforms;
                    const fileData = req.files ? req.files[0].buffer : null;

                        if (!fileData) {
                          throw new Error('File not uploaded');
                        }
                        let records;

                        if (req.files[0].mimetype === 'text/csv') {
                          records = await parseCSV(fileData);
                        } else if (req.files[0].mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                          records = await parseExcel(fileData);
                        } else if (req.files[0].mimetype === 'text/plain') {
                          records = await parseText(fileData);
                        } else {
                          throw new Error('Unsupported file format');
                        }

                        
                        for (let i = 0; i < bodyData.length; i++) {
                          //console.log("ssss"+JSON.stringify(bodyData));
                          try {
                            await db.createCollection(collectionName[i]);
                            //for Hashed password
                            if (bodyData[i].bulkpassword) {
                              const hashedPassword = await bcrypt.hash(bodyData[i].bulkpassword, saltRounds);
                              bodyData[i].bulkpassword = hashedPassword;
                            }

                            await db.collection(collectionName[i]).insertMany(records.map(record => ({
                              ...bodyData[i],
                              ...record,
                            })));
                          } catch (error) {
                            
                            throw error; 
                          }
                        }

                        console.log("Data inserted successfully");
                        res.send('Data inserted successfully');
                    } catch (err) {
                        console.error("Error: ", err.message);
                        res.status(500).send('Internal Server Error');
                    } finally {
                      await client.close();
                    }
                    };

              const get_undefined = async (req, res) => {
                  await client.connect();
                  const db = client.db("CRM");
                  const collection = db.collection("undefined");
                  const query = {};
                  const data = await collection.find(query).toArray();
                  res.send({ message: "Success", data: data });
              };const get_second_add_customer_data = async (req, res) => {
                  await client.connect();
                  const db = client.db("CRM");
                  const collection = db.collection("second_add_customer_data");
                  const query = {};
                  const data = await collection.find(query).toArray();
                  res.send({ message: "Success", data: data });
              };


              const get_third__add_customer_data = async (req, res) => {
                  await client.connect();
                  const db = client.db("CRM");
                  const collection = db.collection("third__add_customer_data");
                  const query = {};
                  const data = await collection.find(query).toArray();
                  
                  res.send({ message: "Success", data: data });
              };




              const get_first_form_add_customer_data = async (req, res) => {
                  await client.connect();
                  const db = client.db("CRM");
                  const collection = db.collection("first_form_add_customer_data");
                  const query = {};
                  const data = await collection.find(query).toArray();
                  let allemails = [];
                  for(i=0; i < data.length; i++) {
                    allemails.push(data[i].email);
                  }
                  
                  res.send({ message: "Success", data: data });
              };
              module.exports = {
                formdata_add,
                upload,
                get_undefined,get_second_add_customer_data,get_third__add_customer_data,get_first_form_add_customer_data,
                    

              };
              