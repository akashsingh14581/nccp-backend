const validator = require('validator');
const Subscriber = require('../model/newsletterModels.js')
// const axios = require("axios");

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' });
    }




    // Check if the email already exists
    let subscriber = await Subscriber.findOne({ email });
    if (subscriber) {
      return res.status(400).json({ message: 'You are already subscribed!' });
    }

    // Create a new subscriber
    subscriber = new Subscriber({ email});
    await subscriber.save();

    return res.status(201).json({ message: 'Subscribed successfully!' });
  } catch (error) {
    console.error('Error during subscription:', error); // Log the error
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};


exports.getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ subscribedAt: -1 }); // Sort by latest first
    return res.status(200).json(subscribers);
  } catch (error) {
    console.error('Error fetching subscribers:', error); // Log the error
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

