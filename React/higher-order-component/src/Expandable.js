import React from 'react'

const Expandable = ComposedComponent =>
    class Expandable extends React.Component {
        constructor(props) {
            super(props)
            this.state = {collapsed: !!props.hidden}
        }

        expandCollapse = () => {
            let collapsed = !this.state.collapsed
            this.setState({collapsed})
        }

        render() {
            return <ComposedComponent
                        expandCollapse={this.expandCollapse}
                        {...this.state}
                        {...this.props} />
        }
    }

const HiddenMessageInternal = ({children, collapsed, expandCollapse}) =>
    <p onClick={expandCollapse}>
        {(collapsed) ? children.replace(/[a-zA-Z0-9]/g, "x") : children}
    </p>

const MenuButtonInternal = ({children, collapsed, txt, expandCollapse}) => 
    <div>
        <button onClick={expandCollapse}>{txt}</button>
        {(!collapsed) ? children : undefined}
    </div>


const HiddenMessage = Expandable(HiddenMessageInternal)
const MenuButton = Expandable(MenuButtonInternal)

export {HiddenMessage, MenuButton}