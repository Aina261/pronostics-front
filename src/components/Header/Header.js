import React, {Component} from 'react';
import './Header.css';

export class Header extends Component {
    render() {
        return (
            <div className={"Header"}>
                <div className={"logo"}>
                    <div className={"is"}>C'est</div>
                    <div className="pipe"/>
                    <div className={"whoWhenWhat"}>
                        <span>qui</span>
                        <span>quand</span>
                        <span>quoi</span>
                    </div>
                    <div className={"question"}>?</div>
                </div>
            </div>
        )
    }
}
