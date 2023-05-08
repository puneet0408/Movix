import { Firestore } from "./Firebase";
import {
    addDoc,
    collection,
    onSnapshot,
    doc,
    updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";



let userRef = collection(Firestore, 'user');

export const postUserData = (object) => {
    addDoc(userRef, object)
        .then(() => { })
        .catch((err) => {
            console.log(err);
        });
};
export const getCurrentUser = (setCurrentUser) => {
    onSnapshot(userRef, (response) => {
        setCurrentUser(
            response.docs
                .map((docs) => {
                    return { ...docs.data(), id: docs.id };
                })
                .filter((item) => {
                    return item.email === localStorage.getItem("email");
                })[0]
        );
    });
};

export const editProfile = (userID, payload) => {
    let userToEdit = doc(userRef, userID);
    updateDoc(userToEdit, payload)
        .then(() => {
            toast.success("Profile has been updated successfully");
        })
        .catch((err) => {
            console.log(err);
        });
};




