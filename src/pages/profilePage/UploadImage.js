
import { storage } from "../../firebase/Firebase"
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { editProfile } from '../../firebase/FireStoreApi';

export const   UploadImage = (image, id) => {
    const imageRef = ref(storage, `profileImages/${image.name}`);
    const uploadTask = uploadBytesResumable(imageRef, image)
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
            console.error(error);
        },
        () => {
            getDownloadURL(imageRef)
                .then((response) => {
                    editProfile(id, { imageLink: response })

                }).catch((error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/object-not-found':
                            // File doesn't exist
                            break;
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;
                        // ...
                        case 'storage/unknown':
                            // Unknown error occurred, inspect the server response
                            break;
                    }
                })
        });
};