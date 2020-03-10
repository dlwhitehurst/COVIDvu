import React, { useEffect, useState } from 'react'

import Plot from 'react-plotly.js'

import numeral from 'numeral'
import moment from 'moment'

export const Graph = ({title, data, y_type='numeric', y_title, x_title, selected, config}) => {

    const [plotsAsValues, setPlotsAsValues] = useState([])

    useEffect(() => {
        let plots = {}

        const selectedData = Object.keys(data).filter(entry => selected.indexOf(entry) !== -1)

        for(const region of selectedData) {
            plots[region] = {
                x: [],
                y: [],
                type: 'scatter',
                mode: 'lines+markers',
                name: region,
                marker: {
                    size: 5
                }
            }            
        }

        for(const region of selectedData) {
            
            const regionData = data[region]
            
            for(const key of Object.keys(regionData)) {
                const formattedDate = moment(key, 'MM/DD/YYYY').format('YYYY-MM-DD')
                plots[region].x.push(formattedDate)

                let value = regionData[key]

                if(y_type === 'percent') {
                    value = numeral(value).format('0%')
                }

                plots[region].y.push(value)
            }
        }
    
        setPlotsAsValues(Object.values(plots))
    }, [selected, data, y_type])

    const layout = {
        title: title
    }
    
    if(y_title) {
        layout['yaxis'] = {
            title: y_title
        }
    }
    if(x_title) {
        layout['xaxis'] = {
            title: x_title
        }
    }

    return (
        <Plot
            data={plotsAsValues}
            layout={layout}
            config={config}
        />

    )
}

export default Graph