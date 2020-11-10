import * as React from 'react';
import {PureComponent} from 'react';
import './app.css';

export default class Table extends PureComponent {
  render() {
    return (
        <div className="table-flex">
          <table class="table">
            <thead>
              <tr>
                <th><abbr title="Building">Bldg</abbr></th>
                <th><abbr title="Device">Rm</abbr></th>
                <th><abbr title="Unique Clients">Uniq</abbr></th>
                <th><abbr title="Max Clients">Max</abbr></th>
                <th><abbr title="Date">Date</abbr></th>
              </tr>
            </thead>
            <tbody>
              {this.props.deviceList && this.props.deviceList.length
                ? this.props.deviceList.map((item, i) => {
                    return (
                          <tr key={i}>
                            <td>{`${item.building}`}</td>
                            <td>{`${item.device}`}</td>
                            <td>{`${item['Unique Clients']}`}</td>
                            <td>{`${item['Max Clients']}`}</td>
                            <td>{`${item.date_start}`}</td>
                          </tr>
                    );
                  })
                : 'No data to display.'}
            </tbody> 
          </table>
        </div>
      );
  }
}
