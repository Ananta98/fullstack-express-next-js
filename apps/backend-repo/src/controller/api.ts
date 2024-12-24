import { Request, Response } from "express";

import firebase from "../config/firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import jwt from "jsonwebtoken";
import { User, RegisterSchema, LoginSchema } from "shared-utils";

const db = getFirestore(firebase);
const auth = getAuth(firebase);

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const uid = req["currentuser"].uid;
    const userQuery = query(collection(db, "users"), where("uid", "!=", uid));
    const userSnapshot = await getDocs(userQuery);
    const result = userSnapshot.docs.map((doc) => {
      const user: User = {
        uid: doc.id,
        name: doc.data().name,
        email: doc.data().email,
        username: doc.data().username,
        phone_number: doc.data().phone_number,
      };
      return user;
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export const signUpNewUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name, username, phone_number } = req.body;
    await RegisterSchema.parseAsync(req.body);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const newUser = {
      uid: userCredential.user.uid,
      name: name,
      email: email,
      username: username,
      phone_number: phone_number,
    };
    await addDoc(collection(db, "users"), newUser);
    const token = jwt.sign(
      { uid: userCredential.user.uid, email: email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).send({
      message: "User added successfully",
      token: token,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    await LoginSchema.parseAsync(req.body);
    if (!email || !password) {
      res.status(400).json({ message: "email and password required" });
      return;
    }
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = jwt.sign(
      { uid: userCredential.user.uid },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).send({
      message: "User sign in successfull",
      token,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// update user data in here is update current user profile
export const updateUserData = async (req: Request, res: Response) => {
  try {
    const uid = req["currentuser"].uid;
    updateUserInternal(uid, req, res);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// update user by id user
export const updateUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    updateUserInternal(userId, req, res);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// make code reusable
const updateUserInternal = async (uid: string, req: Request, res: Response) => {
  const userQuery = query(collection(db, "users"), where("uid", "==", uid));
  const userSnapshot = await getDocs(userQuery);
  if (userSnapshot.empty) {
    res.status(404).send("user not found");
  } else {
    const updatedUser = {
      name: req.body.name,
      username: req.body.username,
      phone_number: req.body.phone_number,
    };
    const userDocRef = userSnapshot.docs[0].ref;
    await setDoc(userDocRef, updatedUser, { merge: true });
    res
      .status(200)
      .send({ message: "User data updated successfully", updatedUser });
  }
};

export const getProfileData = async (req: Request, res: Response) => {
  try {
    const uid = req["currentuser"].uid;
    const userQuery = query(collection(db, "users"), where("uid", "==", uid));
    const userSnapshot = await getDocs(userQuery);
    if (userSnapshot.empty) {
      res.status(404).send("user profile not found");
    } else {
      const userDocRef = userSnapshot.docs[0];
      const user: User = {
        uid: uid,
        name: userDocRef.data().name,
        email: userDocRef.data().email,
        username: userDocRef.data().username,
        phone_number: userDocRef.data().phone_number,
      };
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const userQuery = query(
      collection(db, "users"),
      where("uid", "==", userId)
    );
    const userSnapshot = await getDocs(userQuery);
    if (userSnapshot.empty) {
      res.status(404).send("user not found");
    } else {
      const userDocRef = userSnapshot.docs[0].ref;
      await deleteDoc(userDocRef);
      res.status(200).send({ message: "User deleted successfully" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
