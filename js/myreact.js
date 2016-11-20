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


var logMixin = {
    _log : function(methodName, args) {
	console.log(this.name + '::' + methodName, args);
    },
    componentWillUpdate:  function() {this._log('componentWillUpdate',  arguments);},
    componentDidUpdate:   function() {this._log('componentDidUpdate',   arguments);},
    componentWillMount:   function() {this._log('componentWillMount',   arguments);},
    componentDidMount:    function() {this._log('componentDidMount',    arguments);},
    componentWillUnmount: function() {this._log('componentWillUnmount', arguments);},
};

var Counter = React.createClass({
    name: 'Counter',
    // mixins: [logMixin],
    mixins: [React.addons.PureRenderMixin],
    propTypes: {
	count: React.PropTypes.number.isRequired,
    },
    render: function() {
	console.log(this.name + '::render()');
	return React.DOM.span(null, this.props.count);
    },
    // shouldComponentUpdate: function(nextProps, nextState_ignore) {
    //	return nextProps.count !== this.props.count;
    // },
});


var TextAreaCounter = React.createClass({
    name: 'TextAreaCounter',
    // mixins: [logMixin],
    propTypes: {
	defaultValue: React.PropTypes.string,
    },

    getDefaultProps: function() {
	return {
	    text: '',
	};
    },

    render: function() {
	console.log(this.name + '::render()');
	var counter = null;
	if (this.state.text.length > 0) {
	    counter = React.DOM.h3(null,
		React.createElement(Counter, {
		    count: this.state.text.length,
		})
	    );
	}
	return React.DOM.div(
	    null,
	    React.DOM.textarea({
		value: this.state.text,
		onChange: this._textChange,
		
	    }),
	    counter
	);
    },

    getInitialState: function() {
	return {
	    text: this.props.defaultValue,
	};
    },

    _textChange: function(ev) {
	this.setState({
	    text: ev.target.value,
	});
    },

    componentWillReceiveProps: function(newProps) {
	this.setState({
	    text: newProps.defaultValue,
	});
    },
});


var ComponentFactory = React.createFactory(Component);

var myTextAreaCounter = ReactDOM.render(
    React.createElement(TextAreaCounter, {
	defaultValue: "Bob",
    }),
    document.getElementById("app")
);
