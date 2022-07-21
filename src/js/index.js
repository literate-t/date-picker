class DatePicker {
  monthData = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  #calendarDate = {
    data: '',
    date: 0,
    month: 0,
    year: 0,
  };
  selectedDate = {
    data: '',
    date: 0,
    month: 0,
    year: 0,
  };

  constructor() {
    this.#initCalendarDate();
    this.#initElement();
    this.#addEvent();
  }

  #initCalendarDate() {
    const data = new Date();
    const date = data.getDate();
    const month = data.getMonth();
    const year = data.getFullYear();
    this.#calendarDate = {
      data,
      date,
      month,
      year,
    };
  }
  #datePicker;
  #dateInput;
  #calendar;
  #month;
  #content;
  #prevButton;
  #nextButton;
  #dates;

  #initElement() {
    this.#datePicker = document.getElementById('date-picker');
    this.#dateInput = this.#datePicker.querySelector('#date-input');
    this.#calendar = this.#datePicker.querySelector('#calendar');
    this.#month = this.#datePicker.querySelector('#month');
    this.#content = this.#datePicker.querySelector('#content');
    this.#prevButton = this.#datePicker.querySelector('#prev');
    this.#nextButton = this.#datePicker.querySelector('#next');
    this.#dates = this.#datePicker.querySelector('#dates');
  }

  #addEvent() {
    this.#dateInput.addEventListener('click', this.#toggleCalendar.bind(this));
    this.#nextButton.addEventListener(
      'click',
      this.#moveToNextMonth.bind(this)
    );
    this.#prevButton.addEventListener(
      'click',
      this.#moveToPrevMonth.bind(this)
    );
  }

  #moveToNextMonth() {
    this.#calendarDate.month += 1;
    if (this.#calendarDate.month > 11) {
      this.#calendarDate.year += 1;
      this.#calendarDate.month = 0;
    }
    this.#updateMonthDate();
  }

  #moveToPrevMonth() {
    this.#calendarDate.month -= 1;
    if (this.#calendarDate.month < 0) {
      this.#calendarDate.year -= 1;
      this.#calendarDate.month = 11;
    }
    this.#updateMonthDate();
  }

  #toggleCalendar() {
    this.#calendar.classList.toggle('active');
    this.#updateMonthDate();
  }

  #updateMonthDate() {
    this.#updateMonth();
    this.#updateDates();
  }

  #updateMonth() {
    this.#content.textContent = `${this.#calendarDate.year} ${
      this.monthData[this.#calendarDate.month]
    }`;
  }

  #updateDates() {
    this.#dates.innerHTML = '';
    // day에 0을 넣으면 마지막 날짜로 세팅된 객체를 얻을 수 있는데
    // 월에 인덱스가 아니라 실제 월을 넣어야 한다
    const numOfDates = new Date(
      this.#calendarDate.year,
      this.#calendarDate.month + 1,
      0
    ).getDate();
    const docFrag = document.createDocumentFragment();
    for (let i = 0; i < numOfDates; ++i) {
      const dateDiv = document.createElement('div');
      dateDiv.classList.add('date');
      dateDiv.textContent = i + 1;
      dateDiv.dataset.date = i + 1;
      docFrag.append(dateDiv);
    }
    // grid column start는 1부터 시작
    // 요일 인덱스인 getDay는 0부터 시작
    const startDay =
      new Date(this.#calendarDate.year, this.#calendarDate.month).getDay() + 1;
    docFrag.firstChild.style.gridColumnStart = startDay;
    this.#dates.append(docFrag);
    this.#colorSaturday();
    this.#colorSunday();
    this.#markToday();
  }

  #markToday() {
    const current = new Date();
    const thisYear = current.getFullYear();
    const thisMonth = current.getMonth();
    const today = current.getDate();

    if (
      thisYear === this.#calendarDate.year &&
      thisMonth === this.#calendarDate.month
    ) {
      this.#dates
        .querySelector(`[data-date='${today}']`)
        .classList.add('today');
    }
  }

  #colorSaturday() {
    const satudays = this.#dates.querySelectorAll(
      `.date:nth-child(7n+${
        7 - new Date(this.#calendarDate.year, this.#calendarDate.month).getDay()
      })`
    );

    for (let i = 0; i < satudays.length; ++i) {
      satudays[i].style.color = 'blue';
    }
  }

  #colorSunday() {
    const sundays = this.#dates.querySelectorAll(
      `.date:nth-child(7n + ${
        (8 -
          new Date(
            this.#calendarDate.year,
            this.#calendarDate.month
          ).getDay()) %
        7
      })`
    );

    for (let i = 0; i < sundays.length; ++i) {
      sundays[i].style.color = 'red';
    }
  }
}

new DatePicker();
