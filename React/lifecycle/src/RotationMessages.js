import React from 'react';
import 'global.css'

export default class RotationMessages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [
                "The crow crows after midnight",
                "Bring a watch and dark clothes to the spot",
                "Jericho Jericho Go"
            ],
            showing: -1
        }
    }

    componentWillMount() {
        this.interval = setInterval(() => {
            let { showing, messages } = this.state
            showing = (++showing >= messages.length) ? -1 : showing;
            this.setState({showing});
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        const { messages, showing } = this.state;
        return (
            <div className="hidden-messages">
                {
                    messages.map((message, i) =>
                        <Message key={i} hide={(i!==showing)}>
                            {message}
                        </Message>)
                }
            </div>
        )
    }
}

class Message extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hidden: (props.hide) ? props.hide : true
        }
    }

    /*
        Иногда наши компоненты сохраняют состояние, которое изначально устанавли-
вается на основе свойств. Исходное состояние наших классов компонентов можно
установить в конструкторе или в методе жизненного цикла componentWillMount.
Когда эти свойства изменяются, приходится обновлять состояние с помощью ме-
тода componentWillReceiveProps.    
    */
    componentWillReceiveProps(nextProps) {
        this.setState({hidden: nextProps.hide})
    }

    hide = () => {
        const showByUser = false
        this.setState({showByUser})
    }

    show = () => {
        const showByUser = true
        this.setState({showByUser})
    }

    render() {
        const { children } = this.props
        const { hidden, showByUser } = this.state
        return (
            <p  onMouseEnter={this.show} 
                onMouseLeave={this.hide}
                className='rotation-message'>
                { 
                    hidden && !showByUser ? children.replace(/[a-zA-Z0-9]/g, "x") : children 
                }
            </p>
        )
    }
}