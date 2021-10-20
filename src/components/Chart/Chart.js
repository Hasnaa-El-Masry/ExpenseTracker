import Card from "../UI/Card";
import classes from "./Chart.module.css";
import ChartBar from "./ChartBar";

const Chart = (props)=>{

    const dataPointValues = props.dataPoints.map(dataPoint => dataPoint.value);
    const totalMaximum = Math.max(...dataPointValues);

    return <Card className={classes.chart}>
        {props.dataPoints.map((dataPoint,index)=> <ChartBar key={index} maxValue={totalMaximum} label={dataPoint.label} value={dataPoint.value}/>)}
    </Card>
}

export default Chart;