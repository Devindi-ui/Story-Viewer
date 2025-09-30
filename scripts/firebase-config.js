//config firebase
const firebaseConfig = {
  apiKey: "AIzaSyCrOyqxe87AqtuphIsKjvyfl6EtXAmTg2g",
  authDomain: "storyviewer-93192.firebaseapp.com",
  projectId: "storyviewer-93192",
  storageBucket: "storyviewer-93192.firebasestorage.app",
  messagingSenderId: "965607283205",
  appId: "1:965607283205:web:bc63f88278371ca27e9a6c",
  measurementId: "G-KPGQ3J9EC0"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
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