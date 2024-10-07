import firestore from '@react-native-firebase/firestore';

// Android : 966849267872-fp2ilgsrmelophht6051spj7lg8cpj6o.apps.googleusercontent.com
// IOS : 966849267872-pjrjlrnhmiq0j2trupb2d74ldvdlqocq.apps.googleusercontent.com

export const useUser = () => {
    const getUsers = async () => {
    try {
        const usersSnapshot = await firestore().collection('Users').get();
        const usersList = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        }));
        return usersList;
    } catch (error) {
        console.error("Error fetching users: ", error);
        throw error;
    }
    };

    const getUserById = async (userId) => {
    try {
        const userSnapshot = await firestore().collection('Users').doc(userId).get();
        if (userSnapshot.exists) {
        return {
            id: userSnapshot.id,
            ...userSnapshot.data(),
        };
        } else {
        throw new Error("User not found");
        }
    } catch (error) {
        console.error("Error fetching user: ", error);
        throw error;
    }
    };
}   

export const useUserFireStore = () => {
    const getUsers = async () => {
    try {
        const usersSnapshot = await firestore().collection('Users').get();
        const usersList = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        }));
        return usersList;
    } catch (error) {
        console.error("Error fetching users: ", error);
        throw error;
    }
    };

    const getUserById = async (userId) => {
    try {
        const userSnapshot = await firestore().collection('Users').doc(userId).get();
        if (userSnapshot.exists) {
        return {
            id: userSnapshot.id,
            ...userSnapshot.data(),
        };
        } else {
        throw new Error("User not found");
        }
    } catch (error) {
        console.error("Error fetching user: ", error);
        throw error;
    }
    };
}   