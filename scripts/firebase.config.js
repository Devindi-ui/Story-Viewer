//config firebase
const firebaseConfig = {
  apiKey: "AIzaSyBcMUvb8ejXfpeFfjDOQMJLum8O9Ny5ysM",
  authDomain: "storyviewer-8a7ae.firebaseapp.com",
  projectId: "storyviewer-8a7ae",
  storageBucket: "storyviewer-8a7ae.firebasestorage.app",
  messagingSenderId: "155494470567",
  appId: "1:155494470567:web:e46f8ad3a466deaa6d1c82",
  measurementId: "G-TLWVN083GR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = firebase.firestore();

// collection references
const storiesCollection = db.collection('stories');
const chaptersCollection = db.collection('chapters');


function handleFirebaseError (error) {
    const errorMessages = {
        'permission-denied': 'You do not have permission to perform this action.',
        'unavailable': 'Service is currently unavailable. Please try again later.',
        'deadline-exceeded': 'Request timed out. Please check your connection.',
        'resource-exhausted': 'Too many requests. Please try again later.',
        'invalid-argument': 'Invalid data provided.',
        'not-found': 'Requested data not found.',
        'already-exists': 'This item already exists.',
        'failed-precondition': 'Operation failed due to current state.',
        'aborted': 'Operation was aborted.',
        'out-of-range': 'Value is out of valid range.',
        'unimplemented': 'This feature is not yet implemented.',
        'internal': 'Internal server error occurred.',
        'data-loss': 'Data loss occurred.',
        'unauthenticated': 'Authentication required.'
    };
    return errorMessages[error.code] || 'An unexpected error occured. Please try again...'
}

async function testFirebaseConnection(){
    try {
        //try to read from firestore to test connection
        await db.collection('test').limit(1).get();
        console.log('Firebase connection successful');
        return true;
    } catch (error) {
        console.error('Firebase connection failed: ', error);
        return false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    testFirebaseConnection();
});

//export for use in other modules
window.firebaseUtiles = {
    db,
    storiesCollection,
    chaptersCollection,
    handleFirebaseError,
    testFirebaseConnection
}