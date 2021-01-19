import firebase from 'firebase/app';
import 'firebase/firestore';

export const ConnectFireStore = () => {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_PROJECT_ID + '.firebaseapp.com',
    projectId: process.env.FIREBASE_PROJECT_ID
  });
  return firebase.firestore();
};

export const GetData = () => {
  return new Promise((resolve, reject) => {
    const updatedAt = localStorage.getItem('status_cache_updated_at');

    if (updatedAt && updatedAt > parseInt(Date.now() / 1000) - 60) {
      resolve(JSON.parse(localStorage.getItem('status_cache')));
      return;
    }

    ConnectFireStore()
      .collection('statuses')
      .doc('now')
      .get()
      .then(query => {
        if (!query.exists) {
          alert('Error: Monitoring data is not found.');
          reject();
        }

        const data = query.data();

        const newData = Object.keys(data).map(statusName => {
          const { status, updated_at, last_changed } = data[statusName];

          return {
            name: statusName,
            status: status,
            updated_at: updated_at,
            last_changed: last_changed
          };
        });

        localStorage.setItem('status_cache', JSON.stringify(newData));
        localStorage.setItem(
          'status_cache_updated_at',
          parseInt(Date.now() / 1000)
        );

        resolve(newData);
      })
      .catch(() => alert('Connection failed.'));
  });
};

export const FireStoreActions = {
  update: statuses => state => {
    return {
      statuses
    };
  }
};
