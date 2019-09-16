import React from "react";
import dateFns from "date-fns";
import Modal from "./Modal";
import isEqual from "date-fns/is_equal";

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    reservations: [],
    reservationModal: false,
    deleteModal: false
  };

  renderHeader() {
    const dateFormat = "MMMM YYYY";
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;

        let dayReserved = false;
        this.state.reservations.forEach(day => {
          if (isEqual(day, cloneDay)) {
            dayReserved = true;
          }
        });

        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() =>
              this.onDateClick(dateFns.parse(cloneDay), dayReserved)
            }
          >
            <span className="number">{formattedDate}</span>
            <span className={dayReserved ? "dot" : null}></span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  onDateClick = (day, reserved) => {
    var reservationState = reserved ? false : true;
    var deleteState = reserved ? true : false;
    this.setState({
      selectedDate: day,
      reservationModal: reservationState,
      deleteModal: deleteState
    });
  };

  closeModal = () => {
    this.setState({ reservationModal: false, deleteModal: false });
  };

  addReservation = () => {
    var reserved = this.state.reservations.concat(this.state.selectedDate);
    this.setState({ reservations: reserved, reservationModal: false });
  };

  deleteReservation = () => {
    this.state.reservations.forEach(day => {
      if (isEqual(day, this.state.selectedDate)) {
        var index = this.state.reservations.indexOf(day);
      }
      if (index > -1) {
        this.state.reservations.splice(index, 1).splice(index, 1);
      }
      this.setState({
        reservations: this.state.reservations,
        deleteModal: false
      });
    });
  };

  render() {
    return (
      <div className="calendar">
        <Modal
          date={this.state.selectedDate}
          showModalReservation={this.state.reservationModal}
          showModalDelete={this.state.deleteModal}
          closeModal={this.closeModal}
          addReservation={this.addReservation}
          deleteReservation={this.deleteReservation}
        />
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

export default Calendar;
