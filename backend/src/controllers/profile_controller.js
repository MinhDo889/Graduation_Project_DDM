import Profile from "../models/profile_models.js";
import User from "../models/user_models.js";

export const createProfile = async (req, res) => {
  try {
    const { user_id, phone_number, address, city, country } = req.body;
    const avatar_url = req.file ? `/uploads/avatars/${req.file.filename}` : null;

    // Kiểm tra user tồn tại
    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ message: "User không tồn tại" });

    const profile = await Profile.create({
      user_id,
      phone_number,
      address,
      city,
      country,
      avatar_url,
    });

    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { user_id } = req.params;
    const profile = await Profile.findOne({ where: { user_id }, include: { model: User, as: "user" } });
    if (!profile) return res.status(404).json({ message: "Không tìm thấy profile" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { phone, address, city, country } = req.body;
    const avatar_url = req.file ? `/uploads/avatars/${req.file.filename}` : undefined;

    const profile = await Profile.findOne({ where: { user_id } });
    if (!profile) return res.status(404).json({ message: "Không tìm thấy profile" });

    await profile.update({
      phone_number,
      address,
      city,
      country,
      avatar_url: avatar_url ?? profile.avatar_url,
    });

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



