var Component = React.createClass({
    propTypes: {
        firstName: React.PropTypes.string.isRequired,
        middleName: React.PropTypes.string,
        familyName: React.PropTypes.string.isRequired,
        address: React.PropTypes.string,
    },
    
    getDefaultProps: function() {
        return {
            middleName: '',
            address: 'n/a',
        };
    },
    
    render: function() {
        return React.DOM.span(null, "My name is " + this.props.firstName + ' ' +
			      this.props.middleName + ' ' + this.props.familyName);
    }
});

var TextAreaCounter = React.createClass({
    propTypes: {
	text: React.PropTypes.string,
    },

    getDefaultProps: function() {
	return {
	    text: '',
	};
    },

    render: function() {
	return React.DOM.div(
	    null,
	    React.DOM.textarea({
		value: this.state.text,
		onChange: this._textChange,
		
	    }),
	    React.DOM.h3(null, this.state.text.length)
	);
    },

    getInitialState: function() {
	return {
	    text: this.props.text,
	};
    },

    _textChange: function(ev) {
	this.setState({
	    text: ev.target.value,
	});
    }
});

var ComponentFactory = React.createFactory(Component);

ReactDOM.render(
    React.createElement(TextAreaCounter, {
	text: "Bob",
    }),
    document.getElementById("app")
);
