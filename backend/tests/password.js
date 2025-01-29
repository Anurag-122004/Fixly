const bcrypt = require('bcryptjs');

const enteredPassword = 'Zxcvbnm123@';
const storedHash = "$2a$10$iHxuGNzeXaRaX8jIImROE.T5NuVGR8uok/xCbWKddB0OdggWoWHDa";

async function checkPassword() {
  const isMatch = await bcrypt.compare(enteredPassword, storedHash);
  console.log('Password match result:', isMatch);

  // Optionally, hash entered password to compare
  const hashedEnteredPassword = await bcrypt.hash(enteredPassword, 10);
  console.log('Hashed entered password:', hashedEnteredPassword);
}

checkPassword();
