const db = require("../_helpers/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");
module.exports = {
  createUser,
  login,
  refreshToken,
};

async function createUser(userData) {
  try {
    const existingUser = await db.User.findOne({
      where: { username: userData.username },
    });
    if (existingUser) throw new Error(`User with username exists already`);

    const hashedPassword = await bcrypt.hash(userData.password, 12);

    userData.password = hashedPassword;
    const addUser = await db.User.create(userData);

    return {message: `User added successfully`};
  } catch (error) {
    console.log(error);
    throw error.message;
  }
}

async function login(loginDetails) {
  try {
    const user = await db.User.findOne({where:{ username: loginDetails.username }});

    if (!user) {
      throw new Error(`User doesnot exist`);
    }

    const isEqual = await bcrypt.compare(loginDetails.password, user.password);

    if (!isEqual) {
      throw new Error(`Incorrect username or password`);
    }

    const token = jwt.sign({ sub: user.id }, secret, { expiresIn: "20m" });
    const refreshToken = await jwt.sign({ sub: user.id }, secret, {
      expiresIn: "7d",
    });
    await db.User.update(
      { refresh_token: refreshToken },
      { where: { id: user.id } }
    );

    const updatedUser = await db.User.findOne({
      where:{username: loginDetails.username,}
    });

    updatedUser.password = null;
    updatedUser.refreshToken = refreshToken;
    return { token, user:updatedUser };
  } catch (error) {
    console.log(error);
    throw error.message;
  }
}

async function refreshToken(refresh_token, userId) {
  return new Promise((resolve, reject) => {
    jwt.verify(refresh_token, secret, async (err, decoded) => {
      if (err) {
        console.log(err);
        reject("Invalid refresh token");
      } else {
        const storedRefreshToken = await db.User.findOne({
          where: { id: userId },
          attributes: ["refresh_token"],
        });
        if (refresh_token !== storedRefreshToken.refresh_token) {
          reject("Invalid refresh token");
        }

        const newAccessToken = jwt.sign({ sub: decoded.sub }, secret, {
          expiresIn: "20m",
        });

        resolve(newAccessToken);
      }
    });
  });
}
