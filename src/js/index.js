import { app, h } from 'hyperapp';
import dotenv from 'dotenv';
import '../scss/index.scss';
import { Statuses } from './components/statuses';
import { Notestock } from './components/notestock';
import { Header } from './components/header';
import { Footer } from './components/footer';
import {
  ConnectFireStore,
  GetData,
  FireStoreActions
} from './components/firestore';

dotenv.config();

window.onload = () => {
  if (process.env.SITE_TITLE) {
    const title = document.createElement('title');
    title.textContent = process.env.SITE_TITLE;
    document.head.appendChild(title);
  }
  const state = {
    name: process.env.SITE_TITLE,
    notestockAccount: process.env.NOTESTOCK_ID,
    firestore: {
      statuses: []
    }
  };

  const actions = {
    firestore: FireStoreActions
  };

  const view = (state, actions) => (
    <div className="container pt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <Header state={state} />
          <Statuses state={state.firestore} />
        </div>

        <Notestock state={state} />
      </div>

      <Footer />
    </div>
  );

  const App = app(state, actions, view, document.body);

  GetData().then(data => {
    App.firestore.update(data)
  });
  const watch = setInterval(() => {
    const elm = document.querySelectorAll('ins[data-acct],ins[data-keyword]')
    if(elm && notestock) {
      notestock.widget.write(elm[0], 0)
      clearInterval(watch)
    }
  }, 500);
};
