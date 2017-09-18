var add = false;
var open = false;
var daysKey = 0;

let notation = [];


class DateFind extends React.Component {
	dateCheck () {
		const Data = new Date();
		let year = Data.getFullYear();
		let month = Data.getMonth();
		let day = Data.getDate();
		month++;
		if(month<10){
			month = "0"+month;
		} 
		return `${day}.${month}.${year}`;
	}
	render () {
		return (
			<div className="cal-head">
				<span className="current-data">{this.dateCheck()}</span>
			</div>
			)
	}
}

class Day extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {message: ''};

	    this.handle = this.handle.bind(this);
	  }
	handle () {
		//console.log(this);
		daysKey = this.props.number;
		let status = "Выбран "+daysKey+"-й день";

		if(notation[daysKey]){
			document.getElementsByClassName('note-header')[0].value = notation[daysKey].header;
			document.getElementsByClassName('note-text')[0].value = notation[daysKey].text;
			status = "Вы редактируете "+daysKey+"-й день";
		}

		document.getElementById('left').innerHTML = status;
	}
	render () {
		return (
			<div className="cal-day" onClick={this.handle}>
				{this.props.number}
			</div>
			);
	}
}

class CalBody extends React.Component {
	getDaysCount () {
		let reg = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		let int = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		let daysCount = 0;
		let arr = [];
		const Data = new Date();
		let year = Data.getFullYear();
		let month = Data.getMonth();
		if ( ( (year % 4 == 0) && ( year % 100 != 0) ) || ( year % 400 == 0 ) ){
			daysCount = int[month];
		}else{
			daysCount = reg[month];
		}
		
		for(let i = 1; i<=daysCount; i++){
			arr.push(i);
		}
		return arr;
	}
	constructor(props) {
	    super(props);
	    this.state = {days: this.getDaysCount ()};

	}

	render () {
		return (
			<div className="cal-body">
				{
					this.state.days.map(function (day, i) {
						return (<Day number={day} />)
					})
				}
			</div>
			) 
	}
}

class Calendar extends React.Component {
	render () {
		return (

			<div className="calendar" >
				<div className="cal">
					<DateFind />
					<CalBody />
				</div>
			</div>
			);
	}
}

class Note extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {add: false};
	}
	
	clearForm () {
		document.getElementsByClassName('note-header')[0].value = "";
			document.getElementsByClassName('note-text')[0].value = "";
		document.getElementById('left').innerHTML = 'Выберите день';
	}
	addNew () {
		notation[daysKey] = {
			number: daysKey,
			header: document.getElementsByClassName('note-header')[0].value,
			text: document.getElementsByClassName('note-text')[0].value
		};
		document.getElementsByClassName('note-header')[0].value = "";
			document.getElementsByClassName('note-text')[0].value = "";
		document.getElementById('left').innerHTML = 'Выберите день';
		//console.log(notation);
	}
	render () {
		if(!add){
			return (
				<div className="note" >
					<div className="newNote">
						<div>
							<span className="hh">Заголовок:</span> <br/>
							<input type="text" className="note-header"/>
						</div>
						<div>
							<span className="hh">Содержание:</span> <br/>
							<textarea wrap="soft" id="" cols="30" rows="16" maxLength='300' className="note-text"></textarea>
							<button className="addNote" onClick={this.addNew}>+</button>
							<button className="clearForm" onClick={this.clearForm}>Очистить форму</button>
							<span className="left" id="left">Выберите день</span>
						</div>
					</div>
				</div>
				)
		}else{
			return (
				<div className="note" >
					<div className="newNote">
						<div>
							<span className="hh">Выберите день</span>
						</div>
					</div>
				</div>
				)
		}
	}
}

class Main extends React.Component {
  render() {
    return (
    	<div className="main">
    		<Calendar />
    		<Note />
    	</div>			
		);
  }
}

ReactDOM.render(<Main />, document.getElementById('main'));