import React, { Component } from 'react';
import Column from '../Column/Column';
import './Content.css';
import RestProvider from '../../Services/RestProvider/RestProvider'

class Content extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: false,
      isLoaded: false,
      stages: []
    }
  }

  componentDidMount() {
    RestProvider.getColumns()
      .then((stages) => {
        this.setState({
          isLoaded: true,
          stages: stages
        });
      });
  }

  render() {
    const { error, isLoaded, stages } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="content">
          <div className="container">
            <div className="row">
              {stages.map(stage => (
                <div className="col-md-3">
                  <Column
                    idColumn={stage.id}
                    title={stage.title}
                    onShowPopup={this.props.onShowPopup}
                    onClosePopup={this.props.onClosePopup}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Content;