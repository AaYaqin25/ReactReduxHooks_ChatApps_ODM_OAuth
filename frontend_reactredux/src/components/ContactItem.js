import React, { Fragment } from "react";
export default function ContactItem(props) {
    return (
        <Fragment>
            <div className={props.selected === props.contact ? 'p-3 mb-2 bg-primary text-white' : undefined}>
                <div className={props.selected === props.contact ? "px-2 text-white" : undefined} onClick={props.set}>
                    <span>{props.contact}</span>
                    {props.notification > 0 && props.readStatus === false ?
                        <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '5px', height: '5px', color: 'white', padding: '12px', backgroundColor: 'red', borderRadius: '20px' }}>{props.notification}</span>
                        :
                       null
                    }
                </div>
            </div>
        </Fragment>
    )
}