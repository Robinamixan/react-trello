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

  setStage = (stage) => {
    let stages = this.state.children;
    stages.push(stage);

    this.setState({
      children: stages
    });
  }

  getStage(stageId) {
    return this.state.children.filter(obj => {
      return obj.state.id === stageId
    })[0];
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
    let ticketId, action, stage, newStageId;
    if (currentSelect) {
      stage = currentSelect.state.column;
      ticketId = currentSelect.state.id;
      switch(event.key) {
        case 'ArrowUp':
          action = RestProvider.WEIGHT_MOVE_UP;
          this.updatePosition(ticketId, action, stage)
          break;
        case 'ArrowDown':
          action = RestProvider.WEIGHT_MOVE_DOWN;
          this.updatePosition(ticketId, action, stage)
          break;
        case 'ArrowRight':
          newStageId = stage.state.id + 1;
          this.setMoveDuplicate(ticketId, newStageId);
          this.updateTicketColumn(ticketId, newStageId, stage.state.id)
          break;
        case 'ArrowLeft':
          newStageId = stage.state.id - 1;
          this.setMoveDuplicate(ticketId, newStageId);
          this.updateTicketColumn(ticketId, newStageId, stage.state.id)
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

  updateTicketColumn = (idTicket, newColumnId, oldColumnId) =>{
    let actionType = RestProvider.STAGE_CHANGE;

    let newColumn = this.getStage(newColumnId);
    let oldColumn = this.getStage(oldColumnId);

    if (newColumn) {
      RestProvider.updateTicketPosition(idTicket, actionType, newColumnId, oldColumnId)
        .then((condition) => {
          if (condition) {
            if (this.state.selectedElement) {
              this.state.selectedElement.state.column = newColumn;
            }

            oldColumn.getTickets();

            RestProvider.getColumnTickets(newColumnId)
              .then((tickets) => {
                newColumn.setState({
                  isLoaded: true,
                  items: tickets
                });

                this.removeElementsByClass("drop-clone");
              });
          }
        });
    }
  }

  setMoveDuplicate = (ticketId, stageId) => {
    let stageDomId = "column-box-" + stageId;
    let ticketDomId = "ticket-" + ticketId;

    let stage = document.getElementById(stageDomId);
    let ticket = document.getElementById(ticketDomId);

    if (stage && ticket) {
      let ticketClone = ticket.cloneNode(true);
      ticketClone.id += "-clone";
      ticketClone.classList.add("drop-clone");

      stage.insertAdjacentElement('afterbegin', ticketClone);

      ticket.style.display = 'none';
    }
  }

  removeElementsByClass(className) {
    let elements = document.getElementsByClassName(className);
    while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
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
                    updateTicketColumn={this.updateTicketColumn}
                    setSelected={this.setSelected}
                    setStage={this.setStage}
                    neighbours={this.state.children}
                    setMoveDuplicate={this.setMoveDuplicate}
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