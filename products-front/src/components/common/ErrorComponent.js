import { SentimentVeryDissatisfied} from '@material-ui/icons';
import * as React from 'react';

export default function ErrorComponent(props) {

    return (
        <div className='errorContainer'>
            <div id='iconSad'>
                <SentimentVeryDissatisfied></SentimentVeryDissatisfied>
            </div>
            <div className='textError'>
                <b>{props.text}</b>
            </div>
        </div>
    );
}