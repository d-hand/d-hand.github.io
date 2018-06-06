import React from 'react';

export default class AddColorForm extends React.Component {

 submit = (e) => {
    const { _title, _color } = this.refs;
    e.preventDefault();
    alert(`New Color: ${_title.value} ${_color.value}`);
    _title.value = '';
    _color.value = '#000000';
    _title.focus();
 }

 render() {
    return (
        <form onSubmit={this.submit}>
            <input ref="_title" type="text" placeholder="color title..." required/>
            <input ref="_color" type="color" required/>
            <button>ADD</button>
        </form>
    )
 }
}