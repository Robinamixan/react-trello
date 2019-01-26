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
      stages: [],
      selected: null
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown.bind(this));

    RestProvider.getColumns()
      .then((stages) => {
        this.setState({
          isLoaded: true,
          stages: stages
        });
      });
  }

  setSelected = (newElement) => {
    let currentElement = this.state.selectedElement;

    if (currentElement && currentElement.state.selected) {
      currentElement.unselectTicket();
    }

    if (currentElement === newElement) {
      this.setState({
        selectedElement: false
      });
    } else {
      this.setState({
        selectedElement: newElement
      });
    }
  }

  handleKeyDown = (event) => {
    let currentSelect = this.state.selectedElement;
    if (currentSelect) {
      switch(event.key) {
        case 'ArrowUp':
          console.log(event.key);

          break;
        default:
          break;
      }
    }

  }

  render() {
    const { error, isLoaded, stages } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="content" onKeyDown={this.handleKeyPress}>
          <div className="container">
            <div className="row">
              {stages.map(stage => (
                <div className="col-md-3">
                  <Column
                    idColumn={stage.id}
                    title={stage.title}
                    onShowPopup={this.props.onShowPopup}
                    onClosePopup={this.props.onClosePopup}
                    setSelected={this.setSelected}
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