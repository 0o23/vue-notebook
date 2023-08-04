import React from 'react'
import { Advisor } from '@antv/ava'
import { ChartView } from 'antv-site-demo-rc'
// import 'antd/dist/antd.css'
import 'antd/dist/reset.css'

const defaultData = [
	{ price: 100, type: 'A' },
	{ price: 120, type: 'B' },
	{ price: 150, type: 'C' },
]
const myChartAdvisor = new Advisor()

class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			counter: 0,

			results: myChartAdvisor.advise({ data: defaultData }),
		}

		this.myRef = React.createRef()
	}

	render() {
		return <ChartView chartRef={this.myRef} />
	}
}

export default App
