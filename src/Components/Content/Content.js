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
      selectedElement: null,
      children: []
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

  getStage = (stage) => {
    let stages = this.state.children;
    stages.push(stage);

    this.setState({
      children: stages
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
    let idTicket, action, stage, newStageId;
    if (currentSelect) {
      stage = currentSelect.state.column;
      idTicket = currentSelect.state.id;
      switch(event.key) {
        case 'ArrowUp':
          action = RestProvider.WEIGHT_MOVE_UP;
          this.updatePosition(idTicket, action, stage)
          break;
        case 'ArrowDown':
          action = RestProvider.WEIGHT_MOVE_DOWN;
          this.updatePosition(idTicket, action, stage)
          break;
        case 'ArrowRight':
          newStageId = stage.state.id + 1;
          this.updateTicketColumn(idTicket, newStageId, stage)
          break;
        case 'ArrowLeft':
          newStageId = stage.state.id - 1;
          this.updateTicketColumn(idTicket, newStageId, stage)
          break;
        default:
          break;
      }
    }
  }

  updatePosition(idTicket, action, column) {
    let actionType = RestProvider.WEIGHT_CHANGE;
    let idColumn = column.state.id;

    RestProvider.updateTicketPosition(idTicket, actionType, action, idColumn)
      .then((condition) => {
        RestProvider.getColumnTickets(idColumn)
          .then((tickets) => {
            column.setState({
              isLoaded: true,
              items: tickets
            });
          });
      });
  }

  updateTicketColumn(idTicket, newColumnId, column) {
    let actionType = RestProvider.STAGE_CHANGE;
    let idColumn = column.props.idColumn;

    let newColumn = this.state.children.filter(obj => {
      return obj.state.id === newColumnId
    })[0];

    if (newColumn) {
      RestProvider.updateTicketPosition(idTicket, actionType, newColumnId, idColumn)
        .then((condition) => {
          if (condition) {
            this.state.selectedElement.state.column = newColumn;
            RestProvider.getColumnTickets(idColumn)
              .then((tickets) => {
                column.setState({
                  isLoaded: true,
                  items: tickets
                });
              });
            RestProvider.getColumnTickets(newColumnId)
              .then((tickets) => {
                newColumn.setState({
                  isLoaded: true,
                  items: tickets
                });
              });
          }
        });
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
                <div className="col-md-3" key={stage.id}>
                  <Column
                    idColumn={stage.id}
                    title={stage.title}
                    key={stage.id}
                    selected={this.state.selectedElement}
                    onShowPopup={this.props.onShowPopup}
                    onClosePopup={this.props.onClosePopup}
                    setSelected={this.setSelected}
                    getStage={this.getStage}
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