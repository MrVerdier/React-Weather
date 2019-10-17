import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed';

export default class Twitter extends React.Component {
    render(){
        return(
            <div>
                 <TwitterTimelineEmbed
                sourceType="dmidk"
                screenName="dmidk"
                options={{height: 450}}
                />
            </div>
        )
    }
}