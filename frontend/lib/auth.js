import { getAuth } from "firebase/auth";
import app from "./firebase";

/**
 * Firebase Authentication Instance
 */

export const auth = getAuth(app);