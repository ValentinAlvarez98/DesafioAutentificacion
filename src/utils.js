import {
      fileURLToPath
} from "url";

import {
      dirname
} from "path";

import bcrypt, {
      genSaltSync
} from 'bcrypt';

export const createHash = async (password) => {

      const salt = bcrypt.genSaltSync(10);

      const hash = bcrypt.hashSync(password, salt);

      return hash;

}

export const validatePassword = async (user, password) => {

      const compare = bcrypt.compareSync(password, user.password);

      return compare;

}

const __filename = fileURLToPath(
      import.meta.url);

const __dirname = dirname(__filename);

export default __dirname;