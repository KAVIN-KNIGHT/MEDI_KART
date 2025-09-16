import User from '../models/User.js';

// Signup User Controller
export const signupUser = async (req, res) => {
  try {
    const { fullname, email, password, phone } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({ fullname, email, password, phone });
    await newUser.save();

    return res.status(201).json({
      message: 'User registered successfully',
      user: { fullname, email, phone },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Login User Controller
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check password (plaintext check for now; add bcrypt later!)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

   return res.status(200).json({
  message: 'Login successful',
  user: {
    _id: user._id, // ✅ This is the key line!
    fullname: user.fullname,
    email: user.email,
    phone: user.phone,
     role: user.role || 'user',
  },
});

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
