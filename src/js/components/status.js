import { h } from 'hyperapp';
import moment from 'moment';

import { StatusColor } from './statusColor';

function statusName(status) {
  return status ? 'Operational' : 'Outage';
}

export const Status = ({ state }) => {
  if (!state.statuses) {
    return null;
  }
  return (
    <ul className="list-group">
      {state.statuses.map(status => (
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column">
            <b>{status.name}</b>

            <small className="text-muted">
              Last updated: {moment(status.updated_at).fromNow()}<br />
              It has been {statusName(status.status)} for {moment(status.last_changed).fromNow().replace(' ago', '')}
            </small>
          </div>

          <span
            className={`badge badge-${StatusColor(
              statusName(status.status)
            )} badge-pill`}
          >
            {statusName(status.status)}
          </span>
        </li>
      ))}
    </ul>
  );
};
