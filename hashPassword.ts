import bcrypt from "bcryptjs";

const hashPassword = async () => {
  const plainPassword = "kamal123";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  console.log("Hashed Password:", hashedPassword);
};

hashPassword();
