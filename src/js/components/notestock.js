import { h } from 'hyperapp';

export const Notestock = ({ state }) => {
  console.log(state)
  if (!state.notestockAccount) {
    return null;
  }

  return (
    <div className="col-lg-4">
      <div className="shadow mb-5 bg-white rounded">
        <link href="https://notestock.osa-p.net/_css/widget_mastodon.css" rel="stylesheet" />
          <div className="mastodon_design">
            <div className="ns-container">
              <ins data-title={`${state.notestockAccount}の投稿`} data-acct={state.notestockAccount} data-limit="30" data-nocss="1"></ins>
            </div>
          </div>
          <script src="https://notestock.osa-p.net/_js/notestock_widget.js" defer></script>
      </div>
      </div>
  );
};
