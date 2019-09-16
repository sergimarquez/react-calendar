import React from "react";
import { format } from "date-fns";

class Modal extends React.Component {
  render() {
    var currentDate = format(this.props.date, "DD/MM/YYYY");

    if (this.props.showModalReservation) {
      return (
        <div id="myModal" className="modal" onClick={this.props.closeModal}>
          <div className="modal-content">
            <span className="close">&times;</span>
            <h3 className="modal-text">
              Do you want to make a reservation for {currentDate}?
            </h3>

            <button
              className="button success"
              onClick={this.props.addReservation}
            >
              Yes
            </button>
            <button onClick={this.props.closeModal} className="button danger">
              No
            </button>
          </div>
        </div>
      );
    } else if (this.props.showModalDelete) {
      return (
        <div id="myModal" className="modal" onClick={this.props.closeModal}>
          <div className="modal-content">
            <span className="close">&times;</span>
            <h3 className="modal-text">
              Do you want to{" "}
              <span className="danger-text">
                cancel the reservation for {currentDate}{" "}
              </span>{" "}
              ?
            </h3>
            <button
              className="button success"
              onClick={this.props.deleteReservation}
            >
              Yes
            </button>
            <button className="button danger" onClick={this.props.closeModal}>
              No
            </button>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Modal;
