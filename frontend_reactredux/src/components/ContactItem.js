import React, { Fragment } from "react";
export default function ContactItem(props) {
    return (
        <Fragment>
            <div className={props.selected === props.contact ? 'p-3 mb-2 bg-primary text-white' : undefined}>
                <div className={props.selected === props.contact ? "px-2 text-white" : undefined} onClick={props.set}>
                    <div class="row">
                        <div class="col">
                            <span>{props.contact}</span>
                        </div>
                        <div class="col">
                            {props.notification > 0 && props.readStatus === false ?
                                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '5px', height: '5px', color: 'white', padding: '12px', backgroundColor: 'red', borderRadius: '20px', marginLeft: '60%' }}>{props.notification}</span>
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}